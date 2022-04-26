import * as Yup from 'yup';

export const createLocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_address: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo endereço é 255')
        .required('O campo endereço é obrigatório')
        .typeError('Campo endereço precisa ser em texto'),
      nu_address: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo número de endereço é 20'
        )
        .required('O campo número de endereço é obrigatório')
        .typeError('Campo  número de endereço precisa ser em texto'),
      ds_district: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo bairro é 255')
        .required('O campo bairro é obrigatório')
        .typeError('Campo bairro precisa ser em texto'),
      nu_postal_code: Yup.string()
        .length(10, 'O tamanho permitido para o campo cep é 10')
        .required('O campo cep é obrigatório')
        .typeError('Campo cep precisa ser em texto'),
      nu_latitude: Yup.string()
        .length(20, 'O tamanho permitido para o campo latitude é 20')
        .nullable(),
      nu_longitude: Yup.string()
        .length(20, 'O tamanho permitido para o campo longitude é 20')
        .nullable(),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
