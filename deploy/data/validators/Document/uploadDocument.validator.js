"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const uploadDocumentValidator = async (req, res, next) => {
  try {
    const request = {
      filename: req.file ? req.file.filename : '',
      id_document: req.body.id_document,
    };

    const SchemaBody = Yup.object().shape({
      filename: Yup.string().required(
        'O campo arquivo do documento é obrigatorio'
      ),

      id_document: Yup.string().required(
        'O campo id do documento é obrigatório'
      ),
    });

    await SchemaBody.validate(request, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.uploadDocumentValidator = uploadDocumentValidator;
