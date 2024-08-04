import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bgRegular};

    ${({ theme }) => theme.Rubik};

    min-width: 100vw;
    min-height: 100vh;

    margin: 0;
    padding: 0;

    overflow-x: hidden;
  }
`;

export default GlobalStyles;
