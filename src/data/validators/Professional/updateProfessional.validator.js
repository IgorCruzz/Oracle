import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateProfessionalValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_professional: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_professional: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do colaborador é 255'
        )
        .required('O campo nome do colaborador é obrigatório'),
      in_delivery_analyst: Yup.string()
        .max(
          1,
          'O tamanho máximo permitido para o campo entrega do analista é 1'
        )
        .oneOf(
          ['N', 'S', 's', 'n'],
          'Valor para o campo entrega do analista inválido'
        )
        .required('O campo entrega do analista é obrigatório')
        .typeError('O preenchimento do entrega do analista é obrigatório'),
      id_role_grade: Yup.number()
        .required('Custo HH inválido')
        .typeError('Custo HH inválido'),
      id_sector: Yup.number()
        .required('Setor inválido')
        .typeError('Setor inválido'),
      id_user: Yup.number()
        .nullable()
        .typeError('Usuário inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
