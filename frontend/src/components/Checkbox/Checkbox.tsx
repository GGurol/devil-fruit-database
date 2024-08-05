import { forwardRef, useState } from "react";
import { ICheckboxWrapperProps } from "./Checkbox.types";
import CheckboxWrapper, {
  CheckboxInput,
  CheckboxInputWrapper,
  CheckboxLabel,
  CheckIconOverlay,
} from "./Checkbox.styled";
import { Icon } from "../Icon/Icon";
import { useThemeContext } from "../../providers/Theme/Theme.context";

const Checkbox = forwardRef<HTMLInputElement, ICheckboxWrapperProps>(
  (props, ref) => {
    const {
      $variant = "AccentSecondary",
      $label,
      name,
      width = "20px",
      height = "20px",
      ...rest
    } = props;

    const { palettes } = useThemeContext();

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <CheckboxWrapper $variant={$variant} ref={ref}>
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
            onChange={handleChange}
          />
          {isChecked && (
            <CheckIconOverlay>
              <Icon
                iconName="Check"
                fontSize={width ? width : "20px"}
                fill={palettes.grayscale["50"]}
              />
            </CheckIconOverlay>
          )}
        </CheckboxInputWrapper>
      </CheckboxWrapper>
    );
  }
);

export default Checkbox;
