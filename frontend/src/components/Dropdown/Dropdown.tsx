import { Fragment, useCallback, useState } from "react";
import Button from "../Button/Button";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdownState = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Fragment>
      <Button
        onClick={toggleDropdownState}
        $variant={{ variantName: "Outline" }}
        // $minwidth={{ desktop: "132px", mobile: "auto" }}
        // $fillContainer={false}
        $icon={{
          hasIcon: true,
          iconStyle: {
            iconName: isOpen ? "CaretUp" : "CaretDown",
          },
        }}
      >
        000
      </Button>
    </Fragment>
  );
};

export default Dropdown;
