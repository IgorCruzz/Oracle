"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateTimelapseValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_timelapse_coordinates: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_coordinates: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição da coordenada é 255'
        )
        .required('O campo descrição da coordenada é obrigatório')
        .typeError('O preenchimento da descrição da coordenada é obrigatório'),
      tp_media: Yup.number()
        .oneOf([1, 2], 'Tipo de média inválida')
        .required('Média inválida')
        .typeError('média imválida'),
      nu_latitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo latitude é 20')
        .nullable(),
      nu_longitude: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo longitude é 20')
        .nullable(),
    });
    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateTimelapseValidator = updateTimelapseValidator;
