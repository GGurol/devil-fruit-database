import { ChangeEvent, forwardRef } from "react";
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
      $variant = "AccentPrimary",
      $label,
      $handleState,
      name,
      width = "20px",
      height = "20px",
      checked = false,
      onChange,
      ...rest
    } = props;

    const theme = useTheme();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if ($handleState) {
        $handleState();
      }
    };

    return (
      <CheckboxWrapper
        $variant={$variant}
        $handleState={$handleState}
        ref={ref}
      >
        {$label?.hasLabel && $label.ascendingLabel && (
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
            checked={checked}
            onChange={handleChange}
          />
          {checked && (
            <CheckIconOverlay>
              <Icon
                iconName="Check"
                fontSize={width ? width : "20px"}
                fill={theme.grayscale["50"]}
              />
            </CheckIconOverlay>
          )}
        </CheckboxInputWrapper>

        {$label?.hasLabel && !$label.ascendingLabel && (
          <CheckboxLabel htmlFor={`checkbox-${name}-label`}>
            {$label.labelText}
          </CheckboxLabel>
        )}
      </CheckboxWrapper>
    );
  }
);

export default Checkbox;
