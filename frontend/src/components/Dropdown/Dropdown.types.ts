export interface IDropdownProps {
  options: number[];
  selectedValue: number;
  onChange: (value: number) => void;
}
