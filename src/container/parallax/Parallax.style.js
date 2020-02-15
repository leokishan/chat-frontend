import styled from 'styled-components';
import image from '../../static/images/imm.png';

export const ParallaxContainer = styled.div`
	height: 100vh;
	width: 100%;
	overflow-x: hidden;
	perspective: 2px;
	perspective-origin: 0 0;
	position: relative;
	transform-style: preserve-3d;

	.parallax-layer1 {
		transform-style: preserve-3d;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.text-container {
		transform: translateZ(0);
		padding: 10vh 10vw;
		line-height: 2;
		margin-top: -10vh;
		background-color: white;
		border-radius: 20px 20px 0px 0px;
	}

	.img-container {
		transform: translateZ(-1px) scale(1.5);
		transform-origin: 0 0;
		width: 100%;
		height: 50vh;
		background-image: url(${image});
		background-size: cover;
	}
`;

export const FloatingDivContainer = styled.div`
	overflow-x: hidden;
	perspective: 2px;
	perspective-origin: 0 0;
	transform-style: preserve-3d;
	.row {
		margin: 0px !important;
	}
	p {
		line-height: 2;
	}
	.text-container {
		display: flex;
		align-items: center;
	}
	.landscape-container {
	}
	.space-class {
		margin: 3% 20%;
	}
	.landscape-img {
		margin: 3% 20%;
		transform: translateZ(-2px) scale(2);
		transform-style: preserve-3d;
		transform-origin: 0 0;
	}
	.portrait-img {
		height: 70%;
	}
	.shift-up {
		margin-top: -50px !important;
	}
`;
