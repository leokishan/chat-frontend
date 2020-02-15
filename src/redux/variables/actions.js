const action = {
	INIT_VAR: 'INIT_VAR',
	SET_WIDTH: 'SET_WIDTH',

	setInitVar: (value) => ({
		type: action.INIT_VAR,
		data: value
	}),
	setWidth: (value) => ({
		type: action.SET_WIDTH,
		data: value
	})
};

export default action;
