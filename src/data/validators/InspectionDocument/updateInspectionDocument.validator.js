import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateInspectionDocumentValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_inspection_document: Yup.number().required('ID da do documento inválido'),
    });
    await SchemaParam.validate(req.params, { abortEarly: false });

    if (req.file) {
      const SchemaBody = Yup.object().shape({
        originalname: Yup.string().required('O nome do arquivo precisa ser preenchido'),
        size: Yup.number().min(1, 'O arquivo não pode estar vazio').required('Tamanho de arquivo inválido')
      });
      await SchemaBody.validate(req.file, { abortEarly: false });
    }
    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
