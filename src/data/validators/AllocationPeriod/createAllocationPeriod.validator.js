import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createAllocationPeriodValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      dt_start_allocation: Yup.string()
        .test('check-date', null, value => {
          const dateDocument = value.trim().split('/');

          if (!dateDocument) return false;

          return true;

          // const parsedDate = `${dateDocument[2]}-${dateDocument[1]}-${dateDocument[0]}`;

          // console.log(parsedDate);

          // const parse = new Date(parsedDate);

          // if (dateDocument[1]) {
          //   if (
          //     parse.toString() === 'Invalid Date' ||
          //     dateDocument[2].length < 4 ||
          //     dateDocument[2].length > 4 ||
          //     dateDocument[1].length < 2 ||
          //     dateDocument[1].length > 2 ||
          //     dateDocument[0].length < 2 ||
          //     dateDocument[0].length > 2
          //   ) {
          //     return false;
          //   }
          // } else {
          //   return false;
          // }
        })
        .required('Campo obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
