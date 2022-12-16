/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type AddClientRecipientTypes = {
  onAddClientRecipientFinish: (values: any) => void;
  isLoading: boolean;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};
