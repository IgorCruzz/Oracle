"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateSectorValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_sector: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_sector: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome do setor é 255')
        .required('O campo nome do setor é obrigatório')
        .typeError('O preenchimento do nome do setor é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateSectorValidator = updateSectorValidator;
