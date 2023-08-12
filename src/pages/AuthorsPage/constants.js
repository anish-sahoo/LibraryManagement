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
  active: Yup.boolean(),
});

export const INITIAL_VALUE = {
  name: '',
  active: true,
};
