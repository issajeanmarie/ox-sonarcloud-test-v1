/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SearchType {
  value: React.Dispatch<React.SetStateAction<string>>;
}

export type SearchDriverTypes = {
  name?: string | undefined;
  label?: string | undefined;
  rules?: any;
  existingValue?: any;
};
