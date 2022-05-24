import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createAllocationPeriodValidator = async (req, res, next) => {
  try {
    const { qt_business_hours } = req.body;

    const Schema = Yup.object().shape({
      dt_start_allocation: Yup.string()
        .required('A Data inicial do período de Alocação é obrigatória')
        .typeError(
          'O preenchimento da Data inicial do período de Alocação é obrigatório'
        ),
      dt_end_allocation: Yup.string()
        .required('A Data final do período de Alocação é obrigatória')
        .typeError(
          'O preenchimento da Data final do período de Alocação é obrigatório'
        ),
      qt_business_hours: Yup.number()
        .positive(
          'A quantidade de horas úteis do período de alocação precisa ser positiva'
        )
        .required(
          'O campo quantidade de horas úteis do período de alocação é obrigatória'
        )
        .typeError(
          typeof qt_business_hours === 'string'
            ? 'A quantidade de horas úteis do período de alocação é inválida!'
            : 'O preenchimento da quantidade de horas úteis do período de alocação é obrigatório'
        ),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
