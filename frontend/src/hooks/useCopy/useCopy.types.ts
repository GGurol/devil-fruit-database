export interface IUseCopy {
  duration?: number;
}

export interface IUseCopyReturn {
  copied: boolean;
  copyToClipboard: (text: string) => void;
}
