/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type AddDriverTypes = {
  onAddDriverFinish: (values: any) => void;
  isLoading: boolean;
  form: any;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};
