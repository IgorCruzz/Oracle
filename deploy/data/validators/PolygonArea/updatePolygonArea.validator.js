"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updatePolygonAreaValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_polygon_area: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nu_latidude_vertice: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo vertice de latitude é 20'
        )
        .required('O campo vertice de latitude é obrigatório')
        .typeError('O preenchimento da vertice de latitude é obrigatório'),
      nu_longitude_vertice: Yup.string()
        .max(
          20,
          'O tamanho máximo permitido para o campo vertice de longitude é 20'
        )
        .required('O campo vertice de longitude é obrigatório')
        .typeError('O preenchimento da vertice de longitude é obrigatório'),
      id_location: Yup.number()
        .required('Localização da Obra inválida')
        .typeError('Localização da Obra inválida'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updatePolygonAreaValidator = updatePolygonAreaValidator;
