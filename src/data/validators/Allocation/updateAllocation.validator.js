import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateAllocationValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_allocation_period: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      tp_action_picture: Yup.mixed()
        .oneOf([1, 2], 'Tipo de ação inválido')
        .required('O campo tipo de ação é obrigatório'),
      qt_hours_picture: Yup.number()
        .nullable()
        .positive('O valor quantidade de horas precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor quantidade de horas precisa ser númerico'),
      vl_salary_picture: Yup.number()
        .nullable()
        .positive('O valor do salário precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor do salário precisa ser númerico'),
      vl_hour_cost_foto: Yup.number()
        .nullable()
        .positive('O valor do custo da hora precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor do custo da hora precisa ser númerico'),
      id_product: Yup.number()
        .required('Produto inválido')
        .typeError('Produto inválido'),
      id_professional: Yup.number()
        .required('Colaborador inválido')
        .typeError('Colaborador inválido'),
      id_role_picture: Yup.number()
        .required('Função inválida')
        .typeError('Função inválida'),
      id_grade_picture: Yup.number()
        .required('Cargo inválido')
        .typeError('Cargo inválido'),
      id_sector_picture: Yup.number()
        .required('Setor inválido')
        .typeError('Setor inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
