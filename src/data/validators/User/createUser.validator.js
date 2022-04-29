import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createUserValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_email_login: Yup.string()
        .email('Insira um e-mail válido')
        .max(100, 'O tamanho máximo permitido para o campo senha é 100')
        .required('O campo senha é obrigatório')
        .typeError('O preenchimento da senha é obrigatório'),
      password: Yup.string()
        .max(100, 'O tamanho máximo permitido para o campo senha é 100')
        .required('O campo senha é obrigatório')
        .typeError('O preenchimento da senha é obrigatório'),
      nm_user: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .nullable(),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
