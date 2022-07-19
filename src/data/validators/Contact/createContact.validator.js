import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createContactValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_sector: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome do setor é 255')
        .required('O campo nome do setor é obrigatório')
        .typeError('O preenchimento do nome do setor é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
