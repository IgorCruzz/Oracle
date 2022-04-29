import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateUserValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_user: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_email_login: Yup.string()
        .email('Insira um e-mail válido')
        .max(100, 'O tamanho máximo permitido para o campo e-mail é 100')
        .required('O campo e-mail é obrigatório')
        .typeError('O preenchimento do e-mail é obrigatório'),
      password: Yup.string()
        .required('O campo senha é obrigatório')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'A senha deve conter pelo menos 8 Caracteres, 1 letra em máisculo, 1 letra em minúsculo,1 número e 1 destes caracteres especias @ $ ! % * ? &'
        )
        .typeError('O preenchimento da senha é obrigatório'),
      nm_user: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .nullable(),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
