import authActions from './action';
const initState = {
	userId: '',
	activeChatId: '',
	activeChatName: ''
};

const reducer = (state = initState, { type, data }) => {
	switch (type) {
		case authActions.SET_USER_ID:
			return {
				...state,
				userId: data
			};

		case authActions.LOGOUT:
			return {
				...state,
				userId: ''
			};

		case authActions.SET_ACTIVE_CHAT_USER:
			return {
				...state,
				activeChatId: data.id,
				activeChatName: data.username
			};

		default:
			return state;
	}
};

export default reducer;
