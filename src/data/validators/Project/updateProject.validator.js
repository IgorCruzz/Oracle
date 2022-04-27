import * as Yup from 'yup';

export const updateProjectValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_project: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_project: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do projeto é 255'
        )
        .required('O campo nome do projeto é obrigatório')
        .typeError('Campo nome do projeto precisa ser em texto'),
      tx_description: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo nome do projeto é 1000'
        )
        .nullable(),
      vl_estimated: Yup.number()
        .nullable()
        .positive('O valor estimado precisa ser positivo')
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError('O campo valor estimado precisa ser númerico'),
      vl_bid: Yup.number()
        .nullable()
        .positive('O valor licitado precisa ser positivo')
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError('O campo valor licitado precisa ser númerico'),
      vl_contract: Yup.number()
        .nullable()
        .positive('O valor de contrato precisa ser positivo')
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError('O campo valor de contrato precisa ser númerico'),
      cd_sei: Yup.string()
        .max(25, 'O tamanho máximo permitido para o campo nome do projeto é 25')
        .nullable(),
      cd_priority: Yup.mixed()
        .oneOf(
          ['1', '2', '3'],
          'Valores permitidos no campo tipo de código de prioridade:  1 = Baixa, 2 = Média, 3 = Alta'
        )
        .required('O campo código de prioridade é obrigatório'),
      cd_complexity: Yup.mixed()
        .oneOf(
          ['1', '2', '3', null],
          'Valores permitidos no campo tipo de código de complexidade:  1 = Baixa, 2 = Média, 3 = Alta'
        )
        .nullable(),
      qt_m2: Yup.number()
        .nullable()
        .test(
          'is-decimal',
          'A área (m2) do projeto precisa ser um valor positivo',
          value => `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo m² precisa ser númerico'),
      ds_official_document: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo descrição do ofício é 1000'
        )
        .nullable(),
      nm_official_document_applicant: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do solicitante do ofício é 255'
        )
        .nullable(),
      dt_official_document: Yup.string().nullable(),
      id_city: Yup.number()
        .required('Município inválido')
        .typeError('Município inválido'),
      id_category: Yup.number()
        .required('Categoria inválida')
        .typeError('Categoria inválida'),
      id_program: Yup.number()
        .required('Programa inválida')
        .typeError('Programa inválida'),
      id_agency: Yup.number()
        .required('Orgão inválido')
        .typeError('Orgão inválido'),
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
