import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const FindProfessionalsFromAllocationValidator = async (
  req,
  res,
  next
) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required('O campo limite é obrigatório'),
      page: Yup.string().required('O campo página é obrigatório'),
      dt_start_allocation: Yup.string().required(
        'O campo data inicial do período de Alocação é obrigatório'
      ),
      dt_end_allocation: Yup.string().required(
        'O campo data final do período de Alocação é obrigatório'
      ),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
