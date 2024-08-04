import { forwardRef, PropsWithChildren } from "react";
import { IButtonProps } from "./Button.types";
import ButtonWrapper from "./Button.styled";
import { Icon } from "../Icon/Icon";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonProps>>(
  (props, ref) => {
    const { children, $variant, $icon, ...rest } = props;

    return (
      <ButtonWrapper {...rest} $variant={$variant} ref={ref}>
        {children}
        {$icon?.hasIcon && (
          <Icon
            iconName={$icon.iconStyle.iconName}
            fontSize={$icon.iconStyle.fontSize}
            fill={
              $variant.staticColors
                ? $variant.staticColors.fgColor
                : $icon.iconStyle.color
            }
          />
        )}
      </ButtonWrapper>
    );
  }
);

export default Button;
