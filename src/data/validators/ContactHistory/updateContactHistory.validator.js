import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateContactHistoryValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_contact_history: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      dt_contatct: Yup.string()
        .required('O campo data de contato é obrigatório')
        .typeError('O preenchimento do data de contato é obrigatório'),
      hr_contact: Yup.string()
        .required('O campo hora de contato é obrigatório')
        .typeError('O preenchimento do hora de contato é obrigatório'),
      ds_contact: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo descrição de contato é 1000'
        )
        .nullable(),
      dt_agreed_feedback: Yup.string().nullable(),
      dt_feedback: Yup.string().nullable(),
      id_contact: Yup.number()
        .required('Contato inválido')
        .typeError('Contato inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
