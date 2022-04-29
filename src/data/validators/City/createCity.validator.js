import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createCityValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .required('O campo nome é obrigatório')
        .typeError('O preenchimento do nome é obrigatório'),
      regionId: Yup.number()
        .required('Região inválida')
        .typeError('Região inválida'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
