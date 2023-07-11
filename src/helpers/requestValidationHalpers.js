const nameValidationPattern = /^([\\.0-9a-zA-Zа-яёА-ЯЁЇїЄєҐґ]\s?)*$/;
const emailValidationPattern =
  /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/;

const emailValidationMessage =
  "Is not valid email. The email must be for example: email@example.com";

const nameValidationMessage = "The name cannot contain any characters other than a dot";

const ageValidationMessage = "User age is not valid. Please enter age as number between 18 and 120";

module.exports = {
  nameValidationPattern,
  emailValidationPattern,
  emailValidationMessage,
  nameValidationMessage,
  ageValidationMessage
};
