import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const uploadDocumentValidator = async (req, res, next) => {
  try {
    const request = {
      filename: req.file ? req.file.filename : '',
      id_document: req.body.id_document,
    };

    const SchemaBody = Yup.object().shape({
      filename: Yup.string().required(
        'O campo arquivo do documento é obrigatorio'
      ),

      id_document: Yup.string().required(
        'O campo id do documento é obrigatório'
      ),
    });

    await SchemaBody.validate(request, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
