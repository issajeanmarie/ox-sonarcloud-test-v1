/* eslint-disable no-useless-escape */
export const emailValidation = [
  {
    required: true,
    message: "Enter valid email",
    pattern:
      /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  }
];

export const passwordValidation = [
  {
    required: true,
    message: "Enter password"
  }
];

export const requiredInput = [
  {
    required: true,
    message: "This input is required"
  }
];
