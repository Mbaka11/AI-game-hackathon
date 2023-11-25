import styled from 'styled-components';


export const InstrumenTest = styled.img`
  height: 10vh; /* Assure que la hauteur du logo ne dépasse pas celle du ParentGroup */
  aspect-ratio: auto; /* Optionnel, dépend de la façon dont vous voulez gérer le ratio d'aspect */
  filter: drop-shadow(1px 0 10px #15191c);
  position: relative;
  z-index: 1;
`;
