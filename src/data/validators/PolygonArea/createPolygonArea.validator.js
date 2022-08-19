import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createPolygonAreaValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
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
        .required('O campo vertice de longitude é obrigatório')
        .typeError('O preenchimento da vertice de longitude é obrigatório'),
      id_location: Yup.number()
        .required('Localização da Obra inválida')
        .typeError('Localização da Obra inválida'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
