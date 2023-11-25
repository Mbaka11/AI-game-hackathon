import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: rgba(21, 25, 28, 0.8);
  transition: all 1s ease;
  &.startup-exit-active {
    animation: ${slideUp} 0.5s forwards;
  }
`;
export const Logo = styled.img`
  height: 70%;
  aspect-ratio: auto;
  filter: drop-shadow(1px 0 10px #15191c); /* x-offset, y-offset, blur-radius, color */
  
`;
export const Tooltip = styled.p`
  font-size: 1.5em;
  font-family: 'Normal', sans-serif;
  text-align: center;
  color: #ccc4b8;
`;