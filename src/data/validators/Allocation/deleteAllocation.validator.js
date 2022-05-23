import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const deleteAllocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      allocations: Yup.array()
        .of(Yup.number())
        .required('Campo Alocação é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
