import * as Yup from 'yup';
import { MAX_STRING_LENGTH } from 'lib/constants';

export const VALIDATION_SCHEMA = Yup.object({
  id: Yup.string()
    .required('ID can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `ID must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),
  name: Yup.string()
    .required('Name can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `Name must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),
  author: Yup.string()
    .required('Author can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `Author must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),
});

export const INITIAL_VALUE = {
  id: '',
  name: '',
  author: '',
};
