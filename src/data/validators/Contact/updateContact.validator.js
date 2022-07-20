import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateContactValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_sector: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_sector: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome do setor é 255')
        .required('O campo nome do setor é obrigatório')
        .typeError('O preenchimento do nome do setor é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
