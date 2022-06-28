import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const downloadMediaTimelapseValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      nm_file: Yup.string().required('Nome de arquivo inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
