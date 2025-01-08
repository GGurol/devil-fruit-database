import { useTheme } from "styled-components";

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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Export = () => {
  const theme = useTheme();
  const { filteredFruitData } = useDataContext();
  const { closeModal } = useModalContext();

  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    return JSON.stringify(filteredFruitData, null, 2);
  }, [filteredFruitData]);

  const codeBlockRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2500);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);

        setCopied(false);
      });
  }, [code]);

  const handleDownloadClick = useCallback(() => {
    const file = new Blob([code], { type: "application/json" });

    // using the blob URL to create a download link
    const url = URL.createObjectURL(file);

    // create a link element
    const element = document.createElement("a");

    // set the link element's properties
    element.href = url;
    element.download = "devil-fruit-database.json";

    // append the link element to the body
    document.body.appendChild(element);

    // simulate a click event on the link element
    element.click();

    // remove the link element from the body
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
