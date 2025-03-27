import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: 'Arial', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
  }
`;
