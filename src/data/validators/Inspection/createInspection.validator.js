import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createInspectionValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
  /*
    vl_new_cost: Yup.number()
      .required('O valor efetivo precisa estar preenchido')
      .typeError('Valor efetivo inválido'),
  */
    dt_inspection	: Yup.string().nullable(),
    dt_new_end : Yup.string().nullable(),
    tp_inspection: Yup.number()
      .oneOf([1, 2], 'Tipo de inspeção inválida')
      .required('Projeto inválido')
      .typeError('Projeto inválido'),
    id_project: Yup.number()
      .required('Projeto inválido')
      .typeError('Projeto inválido'),
    id_project_phase: Yup.number()
      .required('Fase inválida')
      .typeError('Fase inválida'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
