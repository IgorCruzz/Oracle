import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createUserValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_email_login: Yup.string()
        .email('Insira um e-mail válido')
        .max(100, 'O tamanho máximo permitido para o campo e-mail é 100')
        .required('O campo e-mail é obrigatório')
        .typeError('O preenchimento do e-mail é obrigatório'),
      in_active: Yup.string()
        .max(1, 'O tamanho máximo permitido para o campo ativo é 1')
        .oneOf(['N', 'S', 's', 'n'], 'Valor para o campo ativo inválido')
        .required('O campo ativo é obrigatório')
        .typeError('O preenchimento do campo ativo é obrigatório'),

      tp_profile: Yup.mixed()
        .oneOf([0, 1, 2, 3, 4], 'Perfil inválido!')
        .required('Informe o perfil do usuário!'),
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
