import * as Yup from 'yup';
import { MAX_STRING_LENGTH, MIN_PASSWORD_LENGTH } from 'lib/constants';

export const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .required('Name can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `Name must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),

  email: Yup.string()
    .required('Email can\'t be blank.')
    .min(MIN_PASSWORD_LENGTH)
    .nullable(),

  password: Yup.string()
    .required('Description can\'t be blank.')
    .nullable(),

  select: Yup.string()
    .required('You must select user type!')
    .nullable()
});

export const INITIAL_VALUE = {
  name: '',
  email: '',
  password: ''
};
