import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createDocumentValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_document: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição do documento é 255'
        )
        .required('O campo descrição do documento é obrigatório')
        .typeError('O preenchimento da descrição do documento é obrigatório'),
      dt_upload: Yup.string().nullable(),
      nu_document_sei: Yup.number()
        .positive('O valor número do documento SEI precisa ser positivo')
        .nullable()
        .typeError('O campo número do documento SEI precisa ser númerico'),
      nm_file: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo nome do arquivo é 1000'
        )
        .nullable(),
      id_product: Yup.number()
        .required('Produto inválido')
        .typeError('Produto inválido'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
