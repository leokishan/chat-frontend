import React, { Fragment, useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/action';
import '../../stylus/chat.css';
import { FaPlus } from 'react-icons/fa'
import { GET_CHAT_LIST, GET_USER_LIST } from '../../api/graphql/queries';
import { UPDATE_CHAT_HEAD } from '../../api/graphql/mutations';
import ChatHead from './ChatHead';
import { getSocket } from '../../api/socket/socket-config';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const { setChatDetails } = authAction;

const Chat = (props) => {
	const [ recents, setRecents ] = useState([]);
	const [ newChatModal, setNewChatModal ] = useState(false);
	const [ userList, setUserList ] = useState([]);
	const [ socketObj, setSocketObj ] = useState({});

	const chatListOption = useQuery(GET_CHAT_LIST, {
		variables: { userId: props.userId },
	});
	const [ callUserList, userListOption ] = useLazyQuery(GET_USER_LIST);
	const [ callUpdateChatHead ] = useMutation(UPDATE_CHAT_HEAD)

	useEffect( () => {
		let newSocket = getSocket();
		setSocketObj(newSocket);
		newSocket.emitter('joinRoom', 'allChat')
		newSocket.subscriber('checkGeneralMessage', handleNewMessage)
		return () => {
			newSocket.emitter('leaveRoom', 'allChat')
			newSocket.unSubscribe('checkGeneralMessage')
		}
	}, [] )

	useEffect(
		() => {
			setRecents(chatListOption.data.chatList);
		},
		[ chatListOption.data ]
	);

	useEffect(
		() => {
			setUserList(userListOption.data?.userList?.filter( ele => ele.id !== props.userId ));
		},
		[ userListOption.data ]
	);

	const handleNewMessage = (data) => {
		if(data.toId.id === props.userId)
		{
			callUpdateChatHead({
				variables : {
					fromId : data.fromId.id,
					fromName : data.fromId.username,
					toName : data.toId.username,
					toId : data.toId.id,
					createdAt : data.createdAt,
					message : data.message,
					userId : props.userId
				}
			})
		}
	}

	const redirectTo = (userObject) => {
		props.setChatDetails(userObject);
		props.history.push('/room');
	};

	const toggleNewChatModal = () => {
		callUserList();
		setNewChatModal((showModal) => !showModal);
	};

	return (
		<div className="row height-100vh font-size-18px chat-grey--text img-bg">
			<div className="col-12 pa-0px">
				<div className="row ma-0px">
					<div className="col-12 pa-0px">
						<div className="own-info chat-grey--text profile-block">
							<b className="ma-start-15px f-size-18px">
								LETS TALK
							</b>
						</div>
					</div>
				</div>
				<hr className="chat-grey chat-grey--text hr-style ma-0px" />
				<div className="row title-text">
					<div className="col-12 pa-0px">
						<b className="f-size-16px">Chats</b>
						<FaPlus
							className="f-size-20px float-right"
							onClick={toggleNewChatModal}
						/>
					</div>
				</div>
				<ChatHead
					userId={props.userId}
					recents={recents}
					redirectTo={redirectTo}
				/>
			</div>
			<NewChatModal
				isOpen={newChatModal}
				toggleNewChatModal={toggleNewChatModal}
				userList={userList}
				redirectTo={redirectTo}
			/>
		</div>
	);
};

const NewChatModal = ({ isOpen, toggleNewChatModal, userList, redirectTo }) => {
	return (
		<Modal
			isOpen={isOpen}
			unmountOnClose={true}
			contentClassName="chat-grey--text img-bg">
			<ModalHeader toggle={toggleNewChatModal}>
				<b> New chat </b>
			</ModalHeader>
			<ModalBody>
				{userList?.map((user) => (
					<div className='mtb-10px profile-block' key={user.id} onClick={() => redirectTo(user)}>
						<div className="user-circle chat-grey pure-black--text">
							<b className="circle-h3 darkBlue--text f-size-16px">
								{user.username.slice(0, 1)}
							</b>
						</div>
						<div className='ma-start-15px'>
							<b>{user.username}</b>
						</div>
					</div>
				))}
			</ModalBody>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	userId: state.authReducer.userId
});

export default connect(mapStateToProps, { setChatDetails })(Chat);
