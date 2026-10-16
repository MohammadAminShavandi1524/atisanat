export interface CustomSelectOption<
  T extends string = string,
> {
  label: string;
  value: T;
}

export interface CustomSelectProps<
  T extends string = string,
> {
  id?: string;
  name?: string;

  label?: string;
  placeholder?: string;

  options: CustomSelectOption<T>[];

  value?: T;

  onChange: (value: T) => void;

  disabled?: boolean;

  className?: string;

  error?: string;
}