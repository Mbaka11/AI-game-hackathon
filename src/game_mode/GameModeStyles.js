import styled from 'styled-components';

export const GameModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh; // Prend toute la hauteur de la fenêtre
`;

export const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Crée un espace entre les éléments enfants */
  align-items: stretch; /* Cela va étirer les enfants pour qu'ils aient tous la même hauteur */
  flex: 1;
  /* Media query pour les écrans plus larges */
  @media (min-width: 768px) { /* Ajustez la largeur en fonction de vos besoins */
    flex-direction: row; /* Empilement horizontal pour les écrans plus larges */
    flex: 1;
  }
`;

export const ParentGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 45%; 
  justify-content: top; 
  align-items: center; 
  border: 2px solid #343636;
  background-color: rgba(39, 42, 44, 0.92); 
  padding: 2em;
  border-radius: 5px; 
  position: relative;
  z-index: 1;
  cursor: pointer; /* Ajoute un curseur de pointeur pour indiquer que l'élément est cliquable */
  &:hover {
    color: black;
    background-color: rgba(58, 59, 59, 0.92);
  } 
}
`;

export const GameTitle = styled.div`
  text-align: center;
  width: 100%;
  font-family: 'Gras', sans-serif;
  font-size: 2em;
  text-shadow: #15191c 1px 0 10px;
  color: #ebfe72;
  margin-bottom: 10px;
`;

export const GameDescription = styled.div`
  text-align: center;
  letter-spacing: 2.5px;
  font-family: 'Normal', sans-serif;
  font-size: 1em;
  text-shadow: #15191c 1px 0 10px;
  color: #AAA399;
  margin-bottom: 2vh;
`;

export const GameLogo = styled.img`
  max-width: 100%; /* Assure que la largeur du logo ne dépasse pas celle du ParentGroup */
  max-height: 100%; /* Assure que la hauteur du logo ne dépasse pas celle du ParentGroup */
  height: auto; /* Maintient le ratio d'aspect de l'image */
  aspect-ratio: auto; /* Optionnel, dépend de la façon dont vous voulez gérer le ratio d'aspect */
  filter: drop-shadow(1px 0 10px #15191c);
  position: relative;
  z-index: 1;
  margin-top: 2vh; // Ajustez cette valeur pour décaler le titre vers le haut
  margin-bottom: 20vh; // Ajustez cette valeur pour décaler le titre vers le haut
`;

export const GameModeTitle = styled.h1`
  font-family: 'Gras', sans-serif;
  font-size: 3.5em;
  text-align: center;
  position: relative;
  z-index: 1;
  color: #e24e30;
  text-shadow: #15191c 1px 0 10px;
  margin-top: 10vh; // Ajustez cette valeur pour décaler le titre vers le haut
`;
export const GameModeButton = styled.button`
  width: 30%;
  box-sizing: border-box;
  margin-top: 10px;
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