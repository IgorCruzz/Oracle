import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createTimelapseValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_coordinates: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição da coordenada é 255'
        )
        .required('O campo descrição da coordenada é obrigatório')
        .typeError('O preenchimento da descrição da coordenada é obrigatório'),
      tp_media: Yup.number()
        .oneOf([1, 2], 'Tipo de média inválida')
        .required('O tipo de Média precisa ser preenchido')
        .typeError('média imválida'),
      nu_latitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo latitude é 20')
        .nullable(),
      nu_longitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo longitude é 20')
        .nullable(),
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
