import * as Yup from 'yup';

export const createProjectValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_project: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do projeto é 255'
        )
        .required('O campo nome do projeto é obrigatório'),
      tx_description: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo nome do projeto é 1000'
        )
        .required('O campo nome de descrição é obrigatório'),
      vl_estimated: Yup.number()
        .required('O campo valor estimado é obrigatório')
        .test('is-decimal', 'invalid decimal', value =>
          `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo valor estimado precisa ser númerico'),
      vl_bid: Yup.number()
        .required('O campo valor licitado é obrigatório')
        .test('is-decimal', 'invalid decimal', value =>
          `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo valor licitado precisa ser númerico'),
      vl_contract: Yup.number()
        .required('O campo valor de contrato é obrigatório')
        .test('is-decimal', 'invalid decimal', value =>
          `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo valor de contrato precisa ser númerico'),
      cd_sei: Yup.string()
        .max(25, 'O tamanho máximo permitido para o campo nome do projeto é 25')
        .required('O campo código SEI é obrigatório'),
      cd_priority: Yup.number().required(
        'O campo código de prioridade é obrigatório'
      ),
      cd_complexity: Yup.number().required(
        'O campo código de complexidade é obrigatório'
      ),
      qt_m2: Yup.number()
        .required('O campo m² é obrigatório')
        .test('is-decimal', 'invalid decimal', value =>
          `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo m² precisa ser númerico'),
      ds_official_document: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo descrição do documento é 1000'
        )
        .required('O campo descrição do documento é obrigatório'),
      nm_official_document_applicant: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do documento é 255'
        )
        .required('O campo nome do documento é obrigatório'),
      dt_official_document: Yup.string().required(
        'O campo data do documento é obrigatório'
      ),
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

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
