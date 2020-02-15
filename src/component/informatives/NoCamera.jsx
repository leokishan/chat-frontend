import React, { useState, useRef, Fragment } from 'react';
import { ElementContainer, VideoContainer } from './Informatives.style';
import cameraImg from '../../static/images/camera.jpg';
import { MdCallEnd } from 'react-icons/md';

const NoCamera = (props) => {
	const [ msg, setMsg ] = useState('');
	const [ gotAccess, setGotAccess ] = useState(false);

	const videoElement = useRef(null);
	const controller = useRef(null);

	// Simple infinite capture and show
	const askForCameraPermission = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true })
			.then(
				(mediaStream) => {
					setGotAccess(true);
					videoElement.current.srcObject = mediaStream;
				},
				(rejection) => {
					setMsg(rejection);
					setGotAccess(true);
					console.log(rejection);
				}
			)
			.catch((err) => {
				setMsg(err);
				setGotAccess(true);
				console.log(err);
			});
	};

	const stopRec = () => {
		let stream = videoElement.current.srcObject;
		let tracks = stream.getTracks();

		tracks.forEach(function(track) {
			track.stop();
		});
		videoElement.current.srcObject = null;
		setGotAccess(false);
	};

	const toggleView = () => {
		console.log('clicked');

		controller.current.classList.toggle('visibileC');
	};

	return (
		<ElementContainer>
			<div className="c-center">
				<div>
					<button
						className="btn btn-outline-info ma-top-20px"
						onClick={askForCameraPermission}>
						Give access
					</button>
					<button
						className="btn btn-outline-info ma-top-20px"
						onClick={stopRec}>
						Stop Recording
					</button>
					{msg.message}
					<div>
						{true ? (
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
										My name
									</div>
									<div className="call-controls white--text">
										<span className="call-end f-size-22px">
											<MdCallEnd />
										</span>
									</div>
								</div>
							</VideoContainer>
						) : (
							<Fragment>
								<img
									src={cameraImg}
									className="display-image"
								/>
								<h3>Please provide access to camera.</h3>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</ElementContainer>
	);
};

export default NoCamera;
