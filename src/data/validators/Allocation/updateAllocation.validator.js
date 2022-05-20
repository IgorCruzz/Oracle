import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateAllocationValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_allocation: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      id_product: Yup.number()
        .required('Produto inválido')
        .typeError('Produto inválido'),
      id_professional: Yup.number()
        .required('Colaborador inválido')
        .typeError('Colaborador inválido'),
      id_allocation_period: Yup.number()
        .required('Período de locação inválido')
        .typeError('Período de locação inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
