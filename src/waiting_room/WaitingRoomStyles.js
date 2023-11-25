import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  align-items: center;
  justify-content: top;
  padding: 2rem;
  height: 100vh;
`;

export const ParentGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center; /* Centrage vertical si nécessaire */
  border: 2px solid #343636;
  background-color: rgba(39, 42, 44, 0.92);
  margin-bottom: 30px;
  padding: 0.5em;
  border-radius: 5px;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-family: "Gras", sans-serif;
  font-size: 3.5em;
  color: #e24e30;
  position: relative;
  padding: 2rem;
  text-shadow: #15191c 1px 0 10px;
  margin-bottom: 1rem;
  text-align: center;
  margin-top: -5vh; // Ajustez cette valeur pour décaler le titre vers le haut
`;

export const UsersList = styled.div`
  margin-bottom: 1rem;
`;

export const GameModeTitle = styled.h2`
  font-family: "Gras Avec Effet", sans-serif;
  font-size: 2rem;
  letter-spacing: 2px;
  color: #ebfe72;
  text-shadow: #15191c 1px 0 10px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: -1rem;
`;

export const UsersTitle = styled.h2`
  font-family: "Gras", sans-serif;
  font-size: 1.25rem;
  color: #ccc4b8;
  text-shadow: #15191c 1px 0 10px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
export const User = styled.li`
  font-family: 'Normal', sans-serif;
  color: #ccc4b8; 
  text-shadow: #15191c 1px 0 10px;
  padding: 0.5rem;
`;
export const StatusMessage = styled.p`
  font-family: "Normal", sans-serif;
  color: #aaa399;
  text-shadow: #15191c 1px 0 10px;
  font-style: italic;
`;
export const ActionButton = styled.button`
  width: 150px;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px;
  background-color: #ccc4b8;
  color: #15191c;
  font-family: "Gras", sans-serif;
  border-radius: 5px;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: #aaa399;
  }
`;
