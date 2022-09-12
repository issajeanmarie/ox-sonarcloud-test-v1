/* eslint-disable no-useless-escape */

export const emailValidation = [
  {
    required: true,
    message: "Enter a valid email",
    pattern:
      /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  }
];

export const emailValidationNotRequired = [
  {
    required: false,
    message: "Enter a valid email",
    pattern:
      /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  }
];

export const phoneValidation = [
  {
    required: true,
    message: "Enter a valid phone",
    pattern:
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
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

export const requiredField = (message: string) => [
  { required: true, message: `${message} required` }
];
