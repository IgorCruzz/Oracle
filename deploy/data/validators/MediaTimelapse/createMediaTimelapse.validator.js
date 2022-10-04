"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const createMediaTimelapseValidator = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).send({
        error: 'Erro na validação',
        messages: ['O arquivo não pode estar vazio'],
      });

    const SUPPORTED_FORMATS = [
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png',
      'video/x-msvideo',
      'video/mpeg',
      'video/ogg',
      'video/webm',
      'video/mp4'
    ];
    const SchemaFile = Yup.object().shape({
      size: Yup.number()
        .min(1, 'O arquivo não pode estar vazio')
        .max(200000000, 'O arquivo não pode passar de 200Mb'),
      mimetype: Yup.string().test(
        'fileFormat',
        'Tipo de imagem/video inválido',
        value => {
          return SUPPORTED_FORMATS.includes(value);
        }
      ),
    });
    await SchemaFile.validate(req.file, { abortEarly: false });

    const SchemaBody = Yup.object().shape({
      dt_media: Yup.string().required('A data precisa ser preenchida'),
    });
    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.createMediaTimelapseValidator = createMediaTimelapseValidator;
