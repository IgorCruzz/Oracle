import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createProjectStatusValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_status: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição do status é 255'
        )
        .required('O campo descrição do status é obrigatório')
        .typeError('O preenchimento do descrição do status é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
