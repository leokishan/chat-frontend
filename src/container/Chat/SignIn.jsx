import React, { useEffect } from 'react';
import '../../stylus/chat.css';
import { useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/action';
import { SIGN_IN_QUERY } from '../../api/graphql/queries';

const { setUserId } = authAction;
const Signin = (props) => {
	const [ callLogin, loginOption ] = useLazyQuery(SIGN_IN_QUERY);

	useEffect(
		() => {
			if (!loginOption.loading) {
				if (loginOption.data?.signIn?.userId) {
					props.setUserId(loginOption.data.signIn.userId);
					props.history.push('/chat');
				}
				else{ alert(loginOption.error) }
			}
		},
		[ loginOption.loading ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		let username = document.forms[0].elements.username.value;
		let password = document.forms[0].elements.password.value;

		if (username && password) {
			let param = { username, password };
			callLogin({ variables: param });
		}
	};
	return (
		<div className="height-100vh font-size-18px box-container img-bg">
			<div className="signin-box white pa-30px">
				<h2 className="width-100 c-center">LETS TALK</h2>
				<form onSubmit={handleSubmit} name="signin" className="ma-10px">
					<div className="pa-top-15px">
						<label
							htmlFor="exampleInputEmail1"
							className="f-size-16px ma-0px">
							Username
						</label>
						<input
							type="text"
							className="input-box"
							name="username"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter username"
							required
						/>
					</div>
					<div className="pa-top-15px">
						<label
							htmlFor="exampleInputPassword1"
							className="f-size-16px ma-0px">
							Password
						</label>
						<input
							type="password"
							name="password"
							className="input-box"
							id="exampleInputPassword1"
							placeholder="Password"
							required
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary btn-small ma-top-15px">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default connect(null, { setUserId })(Signin);
