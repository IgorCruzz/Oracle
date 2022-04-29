import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';


export const createLocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_address: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo endereço é 255')
        .required('O campo endereço é obrigatório')
        .typeError('O preenchimento do endereço é obrigatório'),
      nu_address: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo número de endereço é 20'
        )
        .required('O campo número de endereço é obrigatório')
        .typeError('O preenchimento do número de endereço é obrigatório'),
      ds_district: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo bairro é 255')
        .required('O campo bairro é obrigatório')
        .typeError('O preenchimento do bairro é obrigatório'),
      nu_postal_code: Yup.string()
        .max(10, 'O tamanho máximo permitido para o campo CEP é 10')
        .required('O campo cep é obrigatório')
        .typeError('O preenchimento do cep é obrigatório'),
      nu_latitude: Yup.string()
        .max(10, 'O tamanho máximo permitido para o campo latitude é 10')
        .nullable(),
      nu_longitude: Yup.string()
        .max(10, 'O tamanho máximo permitido para o campo longitude é 10')
        .nullable(),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
   return ValidationError(e, res);
  }
};
