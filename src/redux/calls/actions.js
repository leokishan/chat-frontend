const actions = {
	SET_CALLER_DETAILS: 'SET_CALLER_DETAILS',
	CLOSE_CALL_SCREEN: 'CLOSE_CALL_SCREEN',
	setCallTo: (data) => ({
		type: actions.SET_CALLER_DETAILS,
		data
	}),
	closeCallScreen: () => ({
		type: actions.CLOSE_CALL_SCREEN
	})
};

export default actions;
