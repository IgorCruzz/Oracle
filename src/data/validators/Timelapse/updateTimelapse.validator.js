import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateTimelapseValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_timelapse_coordinates: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_coordinates: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição da coordenada é 255'
        )
        .required('O campo descrição da coordenada é obrigatório')
        .typeError('O preenchimento da descrição da coordenada é obrigatório'),
      tp_media: Yup.number()
        .oneOf([1, 2], 'Tipo de média inválida')
        .required('Média inválida')
        .typeError('média imválida'),
      nu_latitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo latitude é 20')
        .nullable(),
      nu_longitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo longitude é 20')
        .nullable(),
    });
    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
