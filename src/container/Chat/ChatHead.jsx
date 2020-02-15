import React, { Fragment } from 'react'
import { UncontrolledPopover, PopoverBody } from 'reactstrap'
import { FaChevronDown } from 'react-icons/fa'

const ChatHead = ({ recents, redirectTo, userId }) => {
	const showContextMenu = (event, ele) => {
		event.stopPropagation()
	}
	const deleteChat = e => {
		console.log(e.target.dataset.chatId);
	}

	return (
		<Fragment>
			<div className="row ma-0px">
				<div className="col-12 pa-0px">
					{recents?.sort((prev,next) => prev.createdAt < next.createdAt ? 1 : -1).map((ele) => {
						return (
							<div
								key={ele.createdAt}
								id={ele.createdAt}
								className="chat-grey--text profile-block pa-10px f-size-14px clickable"
								onClick={(e) =>{
									redirectTo(
										ele.fromId.id === userId
											? ele.toId
											: ele.fromId
									)
								}}
							>
								<div className="user-circle chat-grey pure-black--text">
									<b className="circle-h3 darkBlue--text f-size-16px">
									{ele.fromId.id === userId ? (
											ele.toId.username.slice(0,1)
										) : (
											ele.fromId.username.slice(0,1)
										)}
									</b>
								</div>
								<div className="ma-start-15px max-width-84">
									<b>
										{ele.fromId.id === userId ? (
											ele.toId.username
										) : (
											ele.fromId.username
										)}
									</b>
									<br />
									<span>{ele.message.length > 100 ? `${ele.message.slice(0,90)} ...` : `${ele.message}`}</span>
								</div>
								{ele.unreadCount !== 0 && <b className='countBadge grey darkBlue--text'>{ele.unreadCount}</b>}
								<div
									className='options'
									onClick={showContextMenu}
								>
									<FaChevronDown
										className='f-size-20px dropdown-toggle'
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										id={`arrow_${ele.createdAt}`}
									/>
									<UncontrolledPopover
										trigger="legacy"
										placement="bottom"
										innerClassName='mlr-10px'
										target={`arrow_${ele.createdAt}`}
									>
					          <PopoverBody>
											<div
												className='mtb-10px'
												data-chat-id={`${ele.fromId.id}_${ele.toId.id}`}
												onClick={deleteChat}
											>Delete</div>
											{/* <hr className='mtb-10px' />
											<div className='mtb-10px'>Edit</div> */}
										</PopoverBody>
					        </UncontrolledPopover>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Fragment>
	);
};


export default ChatHead