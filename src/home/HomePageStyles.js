import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ParentRoomGroup = styled.div`
  display: flex;
  justify-content: center; /* Centrage horizontal des enfants flex */
  align-items: center; /* Centrage vertical si nécessaire */
`;

export const InputButtonWrapper = styled.div`
  width: 50%;
  position: relative;
  display: block;
  margin-top: 20px
`;

export const ErrorMessage = styled.p`
  color: #D8000C; // Example error color: bright red
  background-color: #FFD2D2; // Light red background for visibility
  padding: 10px;
  z-index: 1;
  margin: 10px 0;
  margin-bottom: -10px;
  border: 1px solid #D8000C;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9em;
`;

export const OrSeparator = styled.div`
  text-align: center;
  margin-top: 20px;
  font-family: 'Gras', sans-serif;
  font-size: 2em;
  text-shadow: #15191c 1px 0 10px;
  color: #ccc4b8;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 1;
  &.home-enter-active {
    animation: ${slideDown} 0.5s forwards;
  }
`;
export const Logo = styled.img`
  height: 50%;
  aspect-ratio: auto;
  margin-top: -10vh; // Ajustez cette valeur pour décaler le titre vers le haut
  filter: drop-shadow(1px 0 10px #15191c); /* x-offset, y-offset, blur-radius, color */
  position: relative;
  z-index: 1;
`;
export const InputUsername = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px 0;
  margin-bottom: 200px 0;
  padding: 10px;
  font-family: 'Gras', sans-serif;
  border-radius: 5px; 
  font-size: 1.5rem;
  text-align: center;
  z-index: 1;
  &:focus {
    outline: solid #ccc4b8;
    border-color: #ccc4b8;
    outline-offset: 2px;
  }
  &::placeholder {
    text-align: center;
    font-family: 'Normal', sans-serif;
    opacity: 0.5;
`;
export const InputRoom = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px 0;
  margin-bottom: 20px 0;
  padding: 10px;
  padding-right: 45%;
  font-family: 'Gras', sans-serif;
  border-radius: 5px; 
  border: 1px solid white;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  text-align: center;
  z-index: 1;
  &:focus {
    outline: solid #ccc4b8;
    border-color: #ccc4b8;
    outline-offset: 2px;
  }
  &::placeholder {
    font-family: 'Normal', sans-serif;
    text-align: center;
    opacity: 0.5;
`;
export const JoinButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%; // Set the width of the button
  height: 100%; // Button height equals input height
  background-color: #ccc4b8;
  z-index: 1;
  color: #;
  font-family: 'Gras', sans-serif;
  border-radius: 5px; 
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 0 5px 5px 0; // Optional: to match the input if it has rounded corners
  &:hover {
    color: black;
    background-color: #AAA399;
  }
`;
export const CreateRoomButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 10px;
  background-color: #ccc4b8;
  color: #15191c;
  font-family: 'Gras', sans-serif;
  border-radius: 5px; 
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: #AAA399;
  }
`;