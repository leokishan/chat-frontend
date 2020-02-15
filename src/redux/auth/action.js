const authAction = {
	SET_USER_ID: 'SET_USER_ID',
	SET_ACTIVE_CHAT_USER: 'SET_ACTIVE_CHAT_USER',
	LOGOUT: 'LOGOUT',

	setUserId: (id) => ({
		type: authAction.SET_USER_ID,
		data: id
	}),
	setChatDetails: (data) => ({
		type: authAction.SET_ACTIVE_CHAT_USER,
		data
	}),
	logout: () => ({
		type: authAction.LOGOUT
	})
};

export default authAction;
