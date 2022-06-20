import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const findTimelapsesValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required('O campo limite é obrigatório'),
      page: Yup.string().required('O campo página é obrigatório'),
      id_project_phase: Yup.number()
        .required('Fase inválida')
        .typeError('Fase inválida'),      
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
