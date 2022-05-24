import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const FindProfessionalPtiValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required('O campo limite é obrigatório'),
      page: Yup.string().required('O campo página é obrigatório'),
      id_allocation_period: Yup.string().required(
        'O campo id do Período de Alocação é obrigatório'
      ),
      id_professional: Yup.string().required(
        'O campo id do Colaborador é obrigatório'
      ),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
