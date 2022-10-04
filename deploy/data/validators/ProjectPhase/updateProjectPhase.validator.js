"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateProjectPhaseValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_project_phase: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_project_phase: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome da fase de projeto é 255'
        )
        .required('O campo nome da fase de projeto é obrigatório')
        .typeError('O preenchimento do nome da fase de projeto é obrigatório'),
      dt_planned_start: Yup.string().nullable(),
      dt_planned_end: Yup.string().nullable(),
      vl_phase: Yup.number()
        .nullable()
        .positive('O campo valor precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor precisa ser númerico'),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateProjectPhaseValidator = updateProjectPhaseValidator;
