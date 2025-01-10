import { useTheme } from "styled-components";
import { useCallback, useEffect, useMemo, useRef } from "react";

import Button from "../Button/Button";

import {
  CodeBlock,
  ExportActionsWrapper,
  ExportCodeBlock,
  ExportContainer,
  ExportHeaderWrapper,
} from "./Export.styled";
import { HeaderExtraSmall } from "../Header/Header.styled";
import { useDataContext } from "../../providers/Data/Data.context";
import { useModalContext } from "../../providers/Modal/Modal.context";
import { useCopy } from "../../hooks/useCopy/useCopy";

const Export = () => {
  const theme = useTheme();
  const { filteredFruitData } = useDataContext();
  const { closeModal } = useModalContext();
  const { copied, copyToClipboard } = useCopy();

  const codeBlockRef = useRef<HTMLPreElement>(null);

  const code = useMemo(() => {
    return JSON.stringify(filteredFruitData, null, 2);
  }, [filteredFruitData]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleCopyClick = useCallback(() => {
    copyToClipboard(code);
  }, [code]);

  const handleDownloadClick = useCallback(() => {
    const file = new Blob([code], { type: "application/json" });

    // using the blob URL to create a download link
    const url = URL.createObjectURL(file);

    const element = document.createElement("a");

    element.href = url;
    element.download = "devil-fruit-database.json";

    document.body.appendChild(element);

    // simulate a click event on the link element
    element.click();

    URL.revokeObjectURL(url);
  }, [code]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
        const codeBlock = codeBlockRef.current;

        if (codeBlock) {
          event.preventDefault();

          const selection = window.getSelection();
          const range = document.createRange();

          range.selectNodeContents(codeBlock);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c") {
        handleCopyClick();
      }
    },
    [closeModal, handleCopyClick]
  );

  return (
    <ExportContainer
      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
        event.stopPropagation()
      }
    >
      <ExportHeaderWrapper>
        <HeaderExtraSmall>Export</HeaderExtraSmall>
        <Button
          onClick={closeModal}
          $variant={{ variantName: "IconOutline" }}
          $icon={{
            hasIcon: true,
            iconStyle: {
              iconName: "Cross",
            },
          }}
        />
      </ExportHeaderWrapper>
      <ExportCodeBlock>
        <CodeBlock ref={codeBlockRef}>{code}</CodeBlock>
      </ExportCodeBlock>
      <ExportActionsWrapper>
        <Button
          onClick={handleCopyClick}
          $variant={{
            variantName: "Outline",
            ...(copied && { staticColors: { fgColor: theme.success["600"] } }),
          }}
          $minwidth="auto"
          $icon={{
            hasIcon: true,
            iconStyle: {
              iconName: copied ? "Check" : "Copy",
            },
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          onClick={handleDownloadClick}
          $variant={{
            variantName: "Solid",
            staticColors: {
              fgColor: theme.foreground["fg-primary-on-brand"],
            },
          }}
          $minwidth="auto"
          $icon={{
            hasIcon: true,
            iconStyle: {
              iconName: "Download",
            },
          }}
        >
          Download
        </Button>
      </ExportActionsWrapper>
    </ExportContainer>
  );
};

export default Export;
