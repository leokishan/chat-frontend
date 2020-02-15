import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'multipart/form-data';

export const registerToken = (obj) => {
	return axios
		.post('http://localhost:8085/trythings/registerToken', obj)
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};

export const sendFile = (obj) => {
	let data = new FormData();
	data.append('toSave', obj);
	return axios
		.post('http://localhost:8085/trythings/getFile', data)
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};

export const fileOps = () => {
	return axios
		.get('http://localhost:8085/trythings/fileOps')
		.then((data) => {
			return data.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};
