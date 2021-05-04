import { createGlobalStyle } from "styled-components";
import { ITheme } from "./theme";

const GlobalStyle = createGlobalStyle<{theme: ITheme}>`
  * {
    box-sizing: border-box;
  }
  html, body {
      margin: 0;
      padding: 0;
  }
  body {
    color: ${({theme}) => theme.colors.textColor};
    background-color: ${({theme}) => theme.colors.background};
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
  }
  a {
    color: ${({theme}) => theme.colors.secondary};
  }
`;

export default GlobalStyle;
