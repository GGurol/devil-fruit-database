import { forwardRef, useState } from "react";
import { ICheckboxWrapperProps } from "./Checkbox.types";
import CheckboxWrapper, {
  CheckboxInput,
  CheckboxInputWrapper,
  CheckboxLabel,
  CheckIconOverlay,
} from "./Checkbox.styled";
import { Icon } from "../Icon/Icon";
import { useTheme } from "styled-components";

const Checkbox = forwardRef<HTMLInputElement, ICheckboxWrapperProps>(
  (props, ref) => {
    const {
      $variant = "AccentSecondary",
      $label,
      $handleState,
      name,
      width = "20px",
      height = "20px",
      checked,
      ...rest
    } = props;

    const theme = useTheme();

    const [isChecked, setIsChecked] = useState<boolean>(() => {
      if (checked) {
        return checked;
      }

      return false;
    });

    const handleChange = () => {
      setIsChecked(!isChecked);
      $handleState();
    };

    return (
      <CheckboxWrapper
        $variant={$variant}
        $handleState={$handleState}
        ref={ref}
      >
        {$label?.hasLabel && (
          <CheckboxLabel htmlFor={`checkbox-${name}-label`}>
            {$label.labelText}
          </CheckboxLabel>
        )}
        <CheckboxInputWrapper>
          <CheckboxInput
            {...rest}
            $variant={$variant}
            width={width}
            height={height}
            id={`checkbox-${name}-label`}
            checked={isChecked}
            onChange={handleChange}
          />
          {isChecked && (
            <CheckIconOverlay>
              <Icon
                iconName="Check"
                fontSize={width ? width : "20px"}
                fill={theme.grayscale["50"]}
              />
            </CheckIconOverlay>
          )}
        </CheckboxInputWrapper>
      </CheckboxWrapper>
    );
  }
);

export default Checkbox;
