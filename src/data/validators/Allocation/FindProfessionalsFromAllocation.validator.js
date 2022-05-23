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
      allocation_period: Yup.string().required(
        'O campo período da alocação é obrigatório'
      ),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
