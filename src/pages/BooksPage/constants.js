import * as Yup from 'yup';
import { MAX_STRING_LENGTH } from 'lib/constants';

export const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .required('Name can\'t be blank.')
    .max(
      MAX_STRING_LENGTH,
      `Name must be at most ${MAX_STRING_LENGTH} characters.`
    )
    .nullable(),
  authorId: Yup.number()
    .required('Author ID can\'t be blank.')
    .positive()
    .integer()
    .nullable(),

  imageUrl: Yup.string()
    .required('URL can\'t be blank.')
    .nullable(),

  description: Yup.string()
    .required('Description can\'t be blank.')
    .nullable(),

  availableCopies: Yup.number()
    .required('Author ID can\'t be blank.')
    .positive()
    .integer()
    .nullable(),
});

export const INITIAL_VALUE = {
  name: '',
  description: '',
  imageUrl: '',
  authorId: '',
  availableCopies: ''
};
