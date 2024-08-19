import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 64px 128px 32px 128px;

  width: 100vw;
  height: 100vh;

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 32px 16px 16px 16px;
  }
`;

export default PageWrapper;
