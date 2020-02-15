import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaLocationArrow } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import '../../stylus/chat.css';
import { GET_MESSAGES, GET_CHAT_LIST } from '../../api/graphql/queries';
import {
	SEND_MESSAGE,
	APPEND_MESSAGE,
	UPDATE_LAST_READ
} from '../../api/graphql/mutations';
import { getSocket } from '../../api/socket/socket-config';
import MsgArea from './MsgArea';
import callActions from '../../redux/calls/actions';

const { setCallTo } = callActions;

const Room = (props) => {
	const [ ownId, setOwnId ] = useState(props.userId);
	const [ msgs, setMsgs ] = useState([]);
	const [ socketObj, setSocketObj ] = useState({});
	const [ joinedRoomName, setJoinedRoomName ] = useState(props.userId);
	const msgBox = useRef(null);

	const messagesOption = useQuery(GET_MESSAGES, {
		variables: { userId: props.userId, otherUserId: props.activeChatId }
	});

	const [ callSendMessage ] = useMutation(SEND_MESSAGE);
	const [ callAppendMessage ] = useMutation(APPEND_MESSAGE);
	const [ callUpdateLastRead ] = useMutation(UPDATE_LAST_READ);

	useEffect(
		() => {
			setMsgs(messagesOption.data.userChat);
		},
		[ messagesOption.data ]
	);

	useEffect(() => {
		const { userId, activeChatId } = props;
		msgBox.current.focus();
		let newSocket = getSocket();
		setSocketObj(newSocket);
		let roomName =
			userId > activeChatId
				? `${activeChatId}_${userId}`
				: `${userId}_${activeChatId}`;
		setJoinedRoomName(roomName);
		newSocket.emitter('joinRoom', roomName);
		newSocket.subscriber('recievedChatMessage', messageRecieved);
		return () => {
			newSocket.emitter('leaveRoom', roomName);
			newSocket.unSubscribe('recievedChatMessage');
			callUpdateLastRead({
				variables: { fromId: userId, toId: activeChatId },
				update: (cache, { data }) => {
					try {
						let chatList = cache.readQuery({
							query: GET_CHAT_LIST,
							variables: { userId: props.userId }
						});
						let userIndex = chatList.chatList.findIndex(
							(ele) =>
								(ele.fromId.id == props.userId &&
									ele.toId.id == props.activeChatId) ||
								(ele.toId.id == props.userId &&
									ele.fromId.id == props.activeChatId)
						);
						chatList.chatList.splice(userIndex, 1, {
							...chatList.chatList[userIndex],
							lastRead: data.updateLastRead.lastRead,
							unreadCount: 0,
							__typename: 'ChatHead'
						});
						cache.writeQuery({
							query: GET_CHAT_LIST,
							variables: { userId: props.userId },
							data: chatList
						});
					} catch (e) {}
				}
			});
		};
	}, []);

	const handleMsgKeyStroke = (e) => {
		if (e.keyCode === 13) {
			sendMessage();
		}
	};

	const messageRecieved = (data) => {
		callAppendMessage({
			variables: {
				fromId: data.fromId.id,
				toId: data.toId.id,
				fromName: data.fromId.username,
				toName: data.fromId.username,
				message: data.message,
				createdAt: data.createdAt,
				userId: props.userId,
				otherUserId: props.activeChatId
			}
		});
	};
	const sendMessage = () => {
		let messageToSend = msgBox.current.value;
		callSendMessage({
			variables: {
				fromId: props.userId,
				toId: props.activeChatId,
				message: messageToSend
			},
			optimisticResponse: {
				__typename: 'Mutation',
				sendMessage: {
					fromId: {
						id: props.userId,
						username: '',
						__typename: 'UserResponse'
					},
					toId: {
						id: props.activeChatId,
						username: '',
						__typename: 'UserResponse'
					},
					message: messageToSend,
					createdAt: 123456,
					__typename: 'MessageOutput'
				}
			},
			update: (cache, { data }) => {
				let cachedData = cache.readQuery({
					query: GET_MESSAGES,
					variables: {
						userId: props.userId,
						otherUserId: props.activeChatId
					}
				});
				cachedData.userChat.push(data.sendMessage);
				cache.writeQuery({
					query: GET_MESSAGES,
					variables: {
						userId: props.userId,
						otherUserId: props.activeChatId
					},
					data: cachedData
				});
				try {
					let chatList = cache.readQuery({
						query: GET_CHAT_LIST,
						variables: { userId: props.userId }
					});
					let userIndex = chatList.chatList.findIndex(
						(ele) =>
							(ele.fromId.id == props.userId &&
								ele.toId.id == props.activeChatId) ||
							(ele.toId.id == props.userId &&
								ele.fromId.id == props.activeChatId)
					);
					chatList.chatList.splice(userIndex, 1, {
						...chatList.chatList[userIndex],
						...data.sendMessage,
						lastRead: data.sendMessage.createdAt,
						unreadCount: 0,
						__typename: 'ChatHead'
					});
					cache.writeQuery({
						query: GET_CHAT_LIST,
						variables: { userId: props.userId },
						data: chatList
					});
				} catch (e) {}
			}
		}).then((data) => {
			let toEmit = {
				data: data.data.sendMessage,
				room: joinedRoomName
			};
			socketObj.emitter('sendNewMessage', toEmit);
		});

		msgBox.current.value = '';
	};

	const goToChats = () => props.history.push('/chat');

	const callUser = () =>
		props.setCallTo({
			callToId: props.activeChatId,
			callToName: props.activeChatName
		});

	return (
		<div className="img-bg height-100vh chat-grey--text">
			<div className="back-arrow pa-10px clickable" onClick={goToChats}>
				<FaChevronLeft className="f-size-18px" />
			</div>
			<div className="call-button pa-10px clickable" onClick={callUser}>
				<IoIosCall className="f-size-2px" />
			</div>
			<div className="row ma-0px">
				<div className="col-12 c-center f-size-18px ptb-10px plr-0px">
					<b>{props.activeChatName}</b>
				</div>
			</div>
			<hr className="chat-grey chat-grey--text hr-style ma-0px" />
			<MsgArea msgs={msgs} ownId={ownId} />
			<div className="msg-input-div width-100 ptb-15px plr-10px d-flex">
				<input
					type="text"
					placeholder="Start typing ..."
					className="form-control msg-input chat-grey--text"
					ref={msgBox}
					onKeyDown={handleMsgKeyStroke}
				/>
				<span
					className="ma-start-10px ma-end-5px ma-top-7px clickable"
					onClick={sendMessage}>
					<FaLocationArrow className="f-size-28px" />
				</span>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: state.authReducer.userId,
	activeChatId: state.authReducer.activeChatId,
	activeChatName: state.authReducer.activeChatName
});

export default connect(mapStateToProps, { setCallTo })(Room);
