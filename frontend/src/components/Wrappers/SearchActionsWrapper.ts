import styled from "styled-components";

const SearchActionsWrapper = styled.div`
  display: flex;

  width: 25%;

  align-self: stretch;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export default SearchActionsWrapper;
