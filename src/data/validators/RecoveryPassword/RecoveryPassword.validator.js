import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const recoveryPasswordValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      email: Yup.string()
        .required('O campo e-mail é obrigatório')
        .typeError('O preenchimento do e-mail é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
