import { forwardRef, useState } from "react";
import TextfieldInput, {
  TextfieldContainer,
  TextfieldIconContainer,
} from "./Textfield.styled";
import { Icon } from "../Icon/Icon";
import { ITextfieldProps } from "./Textfield.types";
import { useTheme } from "styled-components";

const Textfield = forwardRef<HTMLInputElement, ITextfieldProps>(
  (props, ref) => {
    const { $icon, ...rest } = props;

    const theme = useTheme();

    const [fieldFocus, setFieldFocus] = useState<boolean>(false);

    const handleFieldFocus = () => {
      setFieldFocus(!fieldFocus);
    };

    const handleFieldBlur = () => {
      setFieldFocus(false);
    };

    return (
      <TextfieldContainer>
        {$icon?.hasIcon && (
          <TextfieldIconContainer>
            <Icon
              iconName={$icon.iconStyle.iconName}
              fontSize={$icon.iconStyle.fontSize}
              fill={fieldFocus ? theme.fgRegular : theme.fgSubdued}
            />
          </TextfieldIconContainer>
        )}
        <TextfieldInput
          {...rest}
          ref={ref}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          $icon={$icon}
        />
      </TextfieldContainer>
    );
  }
);

export default Textfield;
