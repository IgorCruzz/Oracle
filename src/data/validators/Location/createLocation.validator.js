import * as Yup from 'yup';

export const createLocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      ds_address: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo endereço é 255')
        .required('O campo endereço é obrigatório'),
      nu_address: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo nome é 20')
        .required('O campo número de endereço é obrigatório'),
      ds_district: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo bairro é 255')
        .required('O campo bairro é obrigatório'),
      nu_postal_code: Yup.string()
        .max(10, 'O tamanho permitido para o campo cep é 10')
        .max(10, 'O tamanho permitido para o campo cep é 10')
        .required('O campo cep é obrigatório'),
      nu_latitude: Yup.string()
        .max(20, 'O tamanho permitido para o campo latitude é 20')
        .max(20, 'O tamanho permitido para o campo latitude é 20')
        .required('O campo latitude é obrigatório'),
      nu_longitude: Yup.string()
        .max(20, 'O tamanho permitido para o campo nu_longitude é 20')
        .max(20, 'O tamanho permitido para o campo nu_longitude é 20')
        .required('O campo longitude é obrigatório'),
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
