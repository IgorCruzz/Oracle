"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateInspectionDocumentValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_inspection_document: Yup.number().required('ID da do documento inválido'),
    });
    await SchemaParam.validate(req.params, { abortEarly: false });

    if (req.file) {
      const SchemaBody = Yup.object().shape({
        originalname: Yup.string().required('O nome do arquivo precisa ser preenchido'),
        size: Yup.number().min(1, 'O arquivo não pode estar vazio').required('Tamanho de arquivo inválido')
      });
      await SchemaBody.validate(req.file, { abortEarly: false });
    }
    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateInspectionDocumentValidator = updateInspectionDocumentValidator;
