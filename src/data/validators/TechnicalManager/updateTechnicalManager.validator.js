import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateTechnicalManagerValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_technical_manager: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do técnico responsável é 255'
        )
        .required('O campo nome do técnico responsável é obrigatório')
        .typeError(
          'O preenchimento do nome do técnico responsável é obrigatório'
        ),
      nu_crea: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo número CREA é 20')
        .required('O campo número CREA é obrigatório')
        .typeError('O preenchimento do número CREA é obrigatório'),
      nu_rrt_art: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo ART é 20')
        .required('O campo ART é obrigatório')
        .typeError('O preenchimento do ART é obrigatório'),
      tp_responsability: Yup.mixed()
        .oneOf([1, 2], 'Tipo de responsabilidade inválido')
        .required('O campo tipo de responsabilidade é obrigatório'),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
