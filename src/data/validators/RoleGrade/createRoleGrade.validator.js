import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createRoleGradeValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      vl_salary: Yup.number()
        .nullable()
        .positive('O valor do salário precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor do salário precisa ser númerico'),
      vl_hour_cost: Yup.number()
        .nullable()
        .positive('O valor da hora de custo precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor da hora de custo precisa ser númerico'),
      id_role: Yup.number()
        .required('Função inválida')
        .typeError('Função inválida'),
      id_grade: Yup.number()
        .required('Esfera inválida')
        .typeError('Esfera inválida'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
