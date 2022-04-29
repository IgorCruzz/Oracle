import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const loginValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      email: Yup.string()
        .required('O campo e-mail é obrigatório')
        .typeError('O preenchimento do e-mail é obrigatório'),
      password: Yup.string()
        .required('O campo senha é obrigatório')
        .typeError('O preenchimento da senha é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
