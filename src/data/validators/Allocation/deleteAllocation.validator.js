import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const deleteAllocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      allocations: Yup.array()
        .of(
          Yup.object().shape({
            id_product: Yup.number()
              .required('Produto inválido')
              .typeError('Produto inválido'),
            id_professional: Yup.number()
              .required('Colaborador inválido')
              .typeError('Colaborador inválido'),
            id_allocation_period: Yup.number()
              .required('Período de locação inválido')
              .typeError('Período de locação inválido'),
          })
        )
        .required('Campo Alocação é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
