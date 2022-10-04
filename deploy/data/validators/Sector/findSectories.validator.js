"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const findSectoriesValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required('O campo limite é obrigatório'),
      page: Yup.string().required('O campo página é obrigatório'),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.findSectoriesValidator = findSectoriesValidator;
