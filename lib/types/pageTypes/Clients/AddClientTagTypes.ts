/* eslint-disable @typescript-eslint/no-explicit-any */
export type AddClientTagTypes = {
  onAddClientTagFinish: (values: any) => void;
  isLoading: boolean;
  tags: any;
  isTagsLoading: boolean;
  onTagChange: (value: number | undefined) => void;
  form: any;
};
