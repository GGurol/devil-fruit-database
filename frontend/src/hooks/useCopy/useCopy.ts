import { useCallback, useState } from "react";

import { IUseCopyReturn } from "./useCopy.types";

export const useCopy = (duration = 2500): IUseCopyReturn => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (!text) {
        console.error("No content to copy");
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, duration);
          })
          .catch(() => fallbackCopyToClipboard(text));
      } else {
        fallbackCopyToClipboard(text);
      }
    },
    [duration]
  );

  const fallbackCopyToClipboard = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, duration);
      }
    } catch (err) {
      console.error("Fallback: Copy failed", err);
    }
  };

  return { copied, copyToClipboard };
};
