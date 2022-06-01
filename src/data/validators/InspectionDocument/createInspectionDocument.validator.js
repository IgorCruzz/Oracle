import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createInspectionDocumentValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      id_inspection: Yup.string()
        .required('Valor da vistoria inválido')
        .typeError('Valor da vistoria inválido'),
      nm_document: Yup.string()
        .max(
          255,
          "O tamanho máximo permitido para o campo nome do documento é 255"
        )
        .required('O nome do documento precisa estar preenchido')
        .typeError('Nome do documento inválido'),
      nm_file: Yup.string()
        .max(
          255,
          "O tamanho máximo permitido para o campo nome do arquivo é 255"
        )
        .nullable()
        .typeError('Arquivo inválido'),
    });
    await Schema.validate(req.body.data, { abortEarly: false });
    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
