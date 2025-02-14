import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from "./Dropdown.styled";
import { IDropdownProps } from "./Dropdown.types";
import Button from "../Button/Button";

const Dropdown: FC<IDropdownProps> = (props) => {
  const { options, selectedValue, onChange } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const [dropdownValue, setDropdownValue] = useState<number>(options[0]);

  const toggleDropdownState = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSelection = useCallback(
    (value: number) => {
      setDropdownValue(value);
      onChange(value);

      const popover = document.getElementById("dropdown-list");
      if (popover) {
        popover.hidePopover();
      }

      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    if (buttonRef.current) {
      setHeaderWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  useEffect(() => {
    setDropdownValue(selectedValue);
  }, [selectedValue]);

  return (
    <DropdownContainer>
      <Button
        ref={buttonRef}
        onClick={toggleDropdownState}
        popovertarget="dropdown-list"
        $variant={{ variantName: "Outline" }}
        $icon={{
          hasIcon: true,
          iconStyle: {
            iconName: isOpen ? "CaretUp" : "CaretDown",
          },
        }}
        style={{ anchorName: "--dropdown" }}
      >
        {dropdownValue}
      </Button>

      <DropdownList popover="auto" id="dropdown-list" width={headerWidth}>
        {options.map((option) => (
          <DropdownItem
            key={option}
            value={option}
            onClick={() => handleSelection(option)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
