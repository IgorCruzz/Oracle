import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createContactValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_contact: Yup.string()
        .max(
          100,
          'O tamanho máximo permitido para o campo nome do contato é 100'
        )
        .required('O campo nome do contato é obrigatório')
        .typeError('O preenchimento do nome do contato é obrigatório'),
      nu_phone: Yup.string()
        .max(
          100,
          'O tamanho máximo permitido para o campo número do telefone é 100'
        )
        .nullable(),
      ds_email: Yup.string()
        .max(100, 'O tamanho máximo permitido para o campo email é 100')
        .nullable(),
      tx_remark: Yup.string()
        .max(1000, 'O tamanho máximo permitido para o campo observação é 1000')
        .nullable(),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
