import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateRoleGradeValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_role_grade: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
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

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
