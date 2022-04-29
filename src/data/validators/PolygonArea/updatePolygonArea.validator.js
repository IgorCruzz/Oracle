import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updatePolygonAreaValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_polygon_area: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nu_latidude_vertice: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo vertice de latitude é 20'
        )
        .required('O campo vertice de latitude é obrigatório')
        .typeError('O preenchimento da vertice de latitude é obrigatório'),
      nu_longitude_vertice: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo vertice de longitude é 20'
        )
        .nullable()
        .typeError('O preenchimento da vertice de longitude é obrigatório'),
      id_location: Yup.number()
        .required('Localização de Canteiro inválida')
        .typeError('Localização de Canteiro inválida'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
