import { Fragment } from "react";
import { LoadingContainer, SpinnerDiv } from "./Spinner.styled";

const Spinner = () => {
  return (
    <Fragment>
      <LoadingContainer>
        <SpinnerDiv />
      </LoadingContainer>
    </Fragment>
  );
};

export default Spinner;
