import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    min-height: 100vh;
  }

  body {
    max-width: 43.75rem;
    margin: 0 auto !important;
    padding: 1.875rem;
    ${({ backgroundImage, backgroundColor }) => `
        ${
          backgroundImage &&
          `
            background-image: url(${backgroundImage});
            background-position: center;
            background-size: cover;
            background-attachment: fixed;
          `
        }
        ${backgroundColor && `background-color: ${backgroundColor};`}
    `}
  }
`;
