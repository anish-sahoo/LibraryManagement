import * as Yup from 'yup';
import {
  MAX_STRING_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from 'lib/constants';

export const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email('Email must be valid.')
    .required('Email can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `Email must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),
  password: Yup.string()
    .required('Password can\'t be blank.')
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    )
    .max(
      MAX_PASSWORD_LENGTH,
      `Password must be at most ${MAX_PASSWORD_LENGTH} characters.`
    )
    .nullable(),
});

export const INITIAL_VALUE = {
  email: '',
  password: '',
};
