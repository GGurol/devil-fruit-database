import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TextfieldInput, {
  TextfieldContainer,
  TextfieldLeftIconContainer,
  TextfieldRightIconContainer,
} from "./Textfield.styled";
import { Icon } from "../Icon/Icon";
import { ITextfieldProps } from "./Textfield.types";
import { useTheme } from "styled-components";

const Textfield = forwardRef<HTMLInputElement, ITextfieldProps>(
  (props, ref) => {
    const { value = "", handleInputChange, $icon, ...rest } = props;

    const theme = useTheme();

    const inputRef = useRef<HTMLInputElement>(null);

    const [fieldFocus, setFieldFocus] = useState<boolean>(false);
    const [fieldValue, setFieldValue] = useState<string>(value);

    const handleFieldFocus = useCallback(() => {
      setFieldFocus(!fieldFocus);
    }, [fieldFocus]);

    const handleFieldBlur = useCallback(() => {
      setFieldFocus(false);
    }, []);

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setFieldValue(newValue);

      handleInputChange?.(e);
    };

    const handleClearField = () => {
      const inputElement = inputRef?.current;
      if (inputElement) {
        inputElement.value = "";
        inputElement.dispatchEvent(
          new Event("change", {
            bubbles: true,
          })
        );

        setFieldValue("");
        handleInputChange?.({
          target: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
      }
    };

    useEffect(() => {
      setFieldValue(value);
    }, [value]);

    return (
      <TextfieldContainer ref={ref}>
        {$icon?.hasIcon && (
          <TextfieldLeftIconContainer>
            <Icon
              iconName={$icon.iconStyle.iconName}
              fontSize={$icon.iconStyle.fontSize}
              fill={
                fieldFocus
                  ? theme.foreground["fg-primary"]
                  : theme.foreground["fg-tertiary"]
              }
            />
          </TextfieldLeftIconContainer>
        )}
        <TextfieldInput
          {...rest}
          ref={inputRef}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          value={fieldValue}
          $icon={$icon}
        />

        {fieldValue && (
          <TextfieldRightIconContainer onClick={handleClearField}>
            <Icon
              iconName={"Cross"}
              fontSize={"24px"}
              fill={
                fieldFocus
                  ? theme.foreground["fg-primary"]
                  : theme.foreground["fg-tertiary"]
              }
            />
          </TextfieldRightIconContainer>
        )}
      </TextfieldContainer>
    );
  }
);

export default Textfield;
