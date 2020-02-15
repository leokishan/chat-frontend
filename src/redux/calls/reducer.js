import actions from './actions';
const initState = {
	callToId: '',
	callToName: '',
	showScreen: false
};

const callReducer = (state = initState, { type, data }) => {
	switch (type) {
		case actions.SET_CALLER_DETAILS:
			return {
				...state,
				...data,
				showScreen: true
			};

		case actions.CLOSE_CALL_SCREEN:
			return initState;

		default:
			return state;
	}
};
export default callReducer;
