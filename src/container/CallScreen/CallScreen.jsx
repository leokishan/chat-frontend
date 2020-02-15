import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Container, VideoContainer } from './callscreen.style';
import { connect } from 'react-redux';
import actions from '../../redux/calls/actions';
import { MdCallEnd } from 'react-icons/md';
import cameraImg from '../../static/images/camera.jpg';
import { Button } from 'reactstrap';

const { closeCallScreen } = actions;

const CallScreen = (props) => {
	const [ gotAccess, setGotAccess ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('');

	const callElement = useRef(null);
	const videoElement = useRef(null);
	const controller = useRef(null);

	useEffect(
		() => {
			if (props.showScreen) {
				callElement.current.classList.add('show-call-screen');
				callElement.current.classList.remove('hide-call-screen');
				askForCameraPermission();
			} else {
				callElement.current.classList.add('hide-call-screen');
				callElement.current.classList.remove('show-call-screen');
			}
		},
		[ props.showScreen ]
	);

	const askForCameraPermission = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true })
			.then(
				(mediaStream) => {
					setGotAccess(true);
					videoElement.current.srcObject = mediaStream;
				},
				(rejection) => {
					setGotAccess(false);
					console.log(rejection);
					setErrorMsg(rejection.message);
				}
			)
			.catch((err) => {
				setGotAccess(false);
				console.log(err);
				setErrorMsg(err.msg);
			});
	};

	const stopRec = () => {
		if (videoElement.current) {
			let stream = videoElement.current.srcObject;
			let tracks = stream.getTracks();

			tracks.forEach(function(track) {
				track.stop();
			});
			videoElement.current.srcObject = null;
			setGotAccess(false);
		}
	};

	const toggleView = () => {
		controller.current.classList.toggle('visibileC');
	};

	const closeScreen = (e) => {
		e.stopPropagation();
		stopRec();
		props.closeCallScreen();
	};

	return (
		<Container>
			<div ref={callElement} className="call-element hide-call-screen">
				{gotAccess ? (
					<VideoContainer onClick={toggleView}>
						<video
							ref={videoElement}
							className="show-video"
							autoPlay
							loop
							src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
						/>
						<div className="controls" ref={controller}>
							<div className="caller-info pure-black--text">
								{props.activeChatName}
							</div>
							<div className="call-controls white--text">
								<Button
									outline
									color="danger"
									className="call-end f-size-22px white--text"
									onClick={closeScreen}>
									<MdCallEnd />
								</Button>
							</div>
						</div>
					</VideoContainer>
				) : (
					<div className="c-center">
						<img src={cameraImg} className="display-image" />
						<h3>
							{errorMsg || 'Please provide access to camera.'}
						</h3>
						<Button color="info" outline onClick={closeScreen}>
							Close
						</Button>
					</div>
				)}
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	showScreen: state.calls.showScreen,
	activeChatId: state.authReducer.activeChatId,
	activeChatName: state.authReducer.activeChatName
});

export default connect(mapStateToProps, { closeCallScreen })(CallScreen);
