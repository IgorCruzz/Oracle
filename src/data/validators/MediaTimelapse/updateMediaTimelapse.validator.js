import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const updateMediaTimelapseValidator = async (req, res, next) => {
<<<<<<< HEAD
	try {
		const SUPPORTED_FORMATS = [
			"image/jpg",
			"image/jpeg",
			"image/gif",
			"image/png",
			"video/x-msvideo",
			"video/mpeg",
			"video/ogg",
			"video/webm"
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
				mimetype: Yup.string()
					.test('fileFormat', 'Tipo de imagem/video inválido', (value) => {
						return SUPPORTED_FORMATS.includes(value)
					}),
			});
			await Schema.validate(req.file, { abortEarly: false });
		}

		const SchemaBody = Yup.object().shape({
=======
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
>>>>>>> main
      dt_media: Yup.string().nullable(),
    });
    await SchemaBody.validate(req.body, { abortEarly: false });

<<<<<<< HEAD
		return next();
=======
    return next();
>>>>>>> main
  } catch (e) {
    return ValidationError(e, res);
  }
};
