import * as Yup from 'yup';

export const updateProjectValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_project: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_project: Yup.string().max(
        255,
        'O tamanho máximo permitido para o campo nome do projeto é 255'
      ),
      tx_description: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo nome do projeto é 1000'
        )
        .nullable(),
      vl_estimated: Yup.number()
        .nullable()
        .typeError('O campo valor estimado precisa ser númerico'),
      vl_bid: Yup.number()
        .nullable()
        .typeError('O campo valor licitado precisa ser númerico'),
      vl_contract: Yup.number()
        .nullable()
        .typeError('O campo valor de contrato precisa ser númerico'),
      cd_sei: Yup.string()
        .nullable()
        .max(
          25,
          'O tamanho máximo permitido para o campo nome do projeto é 25'
        ),
      cd_priority: Yup.number(),
      cd_complexity: Yup.number().nullable(),
      qt_m2: Yup.number()
        .nullable()
        .typeError('O campo m² precisa ser númerico'),
      ds_official_document: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo descrição do documento é 1000'
        )
        .nullable(),
      nm_official_document_applicant: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do documento é 255'
        )
        .nullable(),
      dt_official_document: Yup.string().nullable(),
      id_city: Yup.number().typeError('Município inválido'),
      id_category: Yup.number().typeError('Categoria inválida'),
      id_program: Yup.number().typeError('Programa inválida'),
      id_agency: Yup.number().typeError('Orgão inválido'),
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
