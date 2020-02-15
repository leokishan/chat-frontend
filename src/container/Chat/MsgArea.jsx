import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import '../../stylus/chat.css';

const MsgArea = (props) => {
	const [ revMsgs, setRevMsgs ] = useState([]);

	useEffect(
		() => {
			let newRevMsgs = [ ...(props.msgs || []) ];
			setRevMsgs(newRevMsgs.reverse());
		},
		[ props.msgs ]
	);
	return (
		<React.Fragment>
			<div className="msg-list-container mtb-20px f-size-18px">
				{revMsgs.map((msg) => (
					<div
						id={msg.createdAt}
						key={msg.createdAt}
						className={classnames(
							'row',
							'mtb-10px',
							{ 'flex-end': msg.fromId.id === props.ownId },
							{ 'flex-start': msg.fromId.id !== props.ownId }
						)}>
						<div
							className={classnames(
								'animate-block',
								'msg-container',
								'col-auto',
								{
									'own-message': msg.fromId.id === props.ownId
								},
								{
									'else-message':
										msg.fromId.id !== props.ownId
								}
							)}>
							{msg.message}
						</div>
					</div>
				))}
			</div>
		</React.Fragment>
	);
};

export default MsgArea;
