import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

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
        .typeError('O preenchimento do nome do projeto é obrigatório'),
      tx_description: Yup.string()
        .max(1000, 'O tamanho máximo permitido para o campo descrição é 1000')
        .nullable(),
      vl_estimated: Yup.number()
        .nullable()
        .positive('O valor estimado precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor estimado precisa ser númerico'),
      vl_bid: Yup.number()
        .nullable()
        .positive('O valor licitado precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor licitado precisa ser númerico'),
      vl_contract: Yup.number()
        .nullable()
        .positive('O valor de contrato precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor de contrato precisa ser númerico'),
      cd_sei: Yup.string()
        .max(25, 'O tamanho máximo permitido para o campo código SEI é 25')
        .nullable(),
      cd_priority: Yup.mixed()
        .oneOf([1, 2, 3], 'Prioridade inválida')
        .required('O campo Prioridade é obrigatório'),
      cd_complexity: Yup.mixed()
        .oneOf([1, 2, 3, null], 'Complexidade inválida')
        .nullable(),
      qt_m2: Yup.number()
        .nullable()
        .test(
          'is-decimal',
          'A área (m2) do projeto precisa ser um valor positivo',
          value => `${value}`.match(/^\d*\.?\d*$/) || value
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
    return ValidationError(e, res);
  }
};
