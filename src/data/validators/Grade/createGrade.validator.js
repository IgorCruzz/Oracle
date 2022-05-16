import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createGradeValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_grade: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome do cargo é 255')
        .required('O campo nome do cargo é obrigatório')
        .typeError('O preenchimento do nome do cargo é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
