export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;

export const REGEX = {
  NAME: /^[a-zA-Z]{3,}$/,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/,
};

export const MESSAGES = {
  EMAIL_INVALID: 'Invalid email format',
  NAME_INVALID: 'Invalid name format',
  PASSWORD_FORMAT_INVALID:
    'Password must contain one uppercase letter, one lowercase letter and one number and must be between 8 and 20 characters long',
  PASSWORD_LENGTH_INVALID: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters long`,
};
