"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateTechnicalManagerValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_technical_manager: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do técnico responsável é 255'
        )
        .required('O campo nome do técnico responsável é obrigatório')
        .typeError(
          'O preenchimento do nome do técnico responsável é obrigatório'
        ),
      nu_crea: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo número CREA é 20')
        .required('O campo número CREA é obrigatório')
        .typeError('O preenchimento do número CREA é obrigatório'),
      nu_rrt_art: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo ART é 20')
        .required('O campo ART é obrigatório')
        .typeError('O preenchimento do ART é obrigatório'),
      tp_responsability: Yup.mixed()
        .oneOf([1, 2], 'Tipo de responsabilidade inválido')
        .required('O campo tipo de responsabilidade é obrigatório'),
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
}; exports.updateTechnicalManagerValidator = updateTechnicalManagerValidator;
