import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updatePhaseStatusValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_status: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_status: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição do status  é 255'
        )
        .required('O campo descrição do status  é obrigatório')
        .typeError('O preenchimento do descrição do status  é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
