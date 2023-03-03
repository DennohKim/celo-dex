type Platform = {
  [key: string]: string;
};

export interface Token {
  id?: string;
  symbol?: string;
  name?: string;
  platforms?: Platform;
}

export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  choice: string;
  selectToken: (token: Token, choice: string) => void;
}
