import * as Yup from 'yup';

export const updateLocationValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_location: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_address: Yup.string().max(
        255,
        'O tamanho máximo permitido para o campo endereço é 255'
      ),
      nu_address: Yup.string().max(
        20,
        'O tamanho máximo permitido para o campo nome é 20'
      ),
      ds_district: Yup.string().max(
        255,
        'O tamanho máximo permitido para o campo bairro é 255'
      ),
      nu_postal_code: Yup.string()
        .max(10, 'O tamanho permitido para o campo cep é 10')
        .max(10, 'O tamanho permitido para o campo cep é 10'),
      nu_latitude: Yup.string()
        .max(20, 'O tamanho permitido para o campo latitude é 20')
        .max(20, 'O tamanho permitido para o campo latitude é 20'),
      nu_longitude: Yup.string()
        .max(20, 'O tamanho permitido para o campo nu_longitude é 20')
        .max(20, 'O tamanho permitido para o campo nu_longitude é 20'),
      id_project: Yup.number().required('Projeto inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
