import * as yup from 'yup';

export const emailValidation = yup.string().email().required();
export const passwordValidation = yup.string().required().min(6);

export const authSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
