import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createAllocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      dt_start_allocation: Yup.string().required(
        'A Data inicial do período de Alocação é obrigatória'
      ),
      dt_end_allocation: Yup.string().required(
        'A Data final do período de Alocação é obrigatória'
      ),
      qt_business_hours: Yup.number()
        .positive(
          'A quantidade de horas úteis do período de alocação precisa ser positiva'
        )
        .required(
          'O campo quantidade de horas úteis do período de alocação é obrigatória'
        ),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
