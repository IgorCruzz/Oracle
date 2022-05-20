import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateAllocationValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_allocation_period: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      dt_start_allocation: Yup.string().required(
        'O campo Data inicial de Alocação é obrigatório'
      ),
      dt_end_allocation: Yup.string().required(
        'O campo Data final de Alocação é obrigatório'
      ),
      qt_business_hours: Yup.number()
        .positive(
          'O campo quantidade de horas de trabalho precisa ser positivo'
        )
        .required('O campo quantidade de horas de trabalho é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
