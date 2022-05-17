import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const findProfessionalValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_professional: Yup.string().required('O campo id é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
