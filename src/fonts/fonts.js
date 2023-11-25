import { createGlobalStyle } from 'styled-components';

import gras from './49820.otf';
import grasAvecEffet from './49823.otf';
import normal from './49818.otf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Gras';
        src: local('Gras'), local('Gras'),
        url(${gras}) format('opentype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Gras Avec Effet';
        src: local('Gras Avec Effet'), local('GrasAvecEffet'),
        url(${grasAvecEffet}) format('opentype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Normal';
        src: local('Normal'), local('Normal'),
        url(${normal}) format('opentype');
        font-weight: 300;
        font-style: normal;
    }
    
`;