import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const FindProductHistoryPtiValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required('O campo limite é obrigatório'),
      page: Yup.string().required('O campo página é obrigatório'),
      id_product: Yup.string().required('O campo id do Produto é obrigatório'),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
