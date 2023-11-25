import styled from 'styled-components';

export const UsernameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export const UsernameTitle = styled.h1`
    font-family: 'Gras', sans-serif;
    font-size: 3.5em;
    text-align: center;
    position: relative;
    padding: 1rem;
    color: #e24e30;
    text-shadow: #15191c 1px 0 10px;
    z-index: 1;
    margin-top: -20vh; // Ajustez cette valeur pour décaler le titre vers le haut
`;
export const UsernameInput = styled.input`
    padding: 1rem;
    font-family: 'Normal', sans-serif;
    font-size: 1.5rem;
    position: relative;
    z-index: 1;
    width: 200px;
    border-radius: 5px; 
`;
