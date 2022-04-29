import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const findTechnicalManagerValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
