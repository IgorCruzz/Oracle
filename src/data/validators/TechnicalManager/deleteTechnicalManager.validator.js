import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const deleteTechnicalManagerValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    await Schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
