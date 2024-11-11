import { ReactNode } from "react";

export type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  id?: string;
}