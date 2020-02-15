import actions from './actions';
const initState = {
	initVar: '',
	clientWidth: 1200
};

const variableReducer = (state = initState, { type, data }) => {
	switch (type) {
		case actions.INIT_VAR:
			return {
				...state,
				initVar: data
			};

		case actions.SET_WIDTH:
			return {
				...state,
				clientWidth: data
			};

		default:
			return state;
	}
};
export default variableReducer;
