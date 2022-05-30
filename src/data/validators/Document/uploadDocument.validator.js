import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const uploadDocumentValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_document: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      file: Yup.string().required('O campo arquivo do documento é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.file, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
