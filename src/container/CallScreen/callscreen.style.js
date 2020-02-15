import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
	position: absolute;
	.call-element {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 15;
		background-color: white;
	}

	.show-call-screen {
		top: 0vh;
		transition: all 1s cubic-bezier(.41, 1.1, .82, .67);
	}
	.hide-call-screen {
		top: -100vh;
		transition: all 1s cubic-bezier(.82, .67, .41, 1.1);
	}
	.display-image {
		height: 50vh;
		width: auto;
	}
`;

export const VideoContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;

	.show-video {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.controls {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
	}
	.controls.visibileC {
		opacity: 1 !important;
		transition: all 1s ease-in-out;
	}
	.controls div {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 10%;
		width: 100%;
		font-weight: bold;
	}
	.caller-info {
		top: 0;
	}
	.call-controls {
		bottom: 0;
	}
	.call-end {
		padding: 5px 12px;
		border-radius: 50%;
		background-color: red;
		width: auto !important;
	}
`;
