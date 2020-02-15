import styled from 'styled-components';

export const ElementContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.display-image {
		height: 50vh;
		width: auto;
	}
`;

export const VideoContainer = styled.div`
	position: relative;
	height: 50vh;
	max-width: 70vw;
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
		height: 20%;
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
	}
`;
