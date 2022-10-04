"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateMediaTimelapseValidator = async (req, res, next) => {
  try {
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
    const SchemaParam = Yup.object().shape({
      id_media_timelapse: Yup.number().required('ID da do documento inválido'),
    });
    await SchemaParam.validate(req.params, { abortEarly: false });
    if (req.file) {
      const Schema = Yup.object().shape({
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
      await Schema.validate(req.file, { abortEarly: false });
    }

    const SchemaBody = Yup.object().shape({
      dt_media: Yup.string().nullable(),
    });
    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateMediaTimelapseValidator = updateMediaTimelapseValidator;
