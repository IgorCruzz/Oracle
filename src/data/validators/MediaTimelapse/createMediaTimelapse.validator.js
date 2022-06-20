import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const createMediaTimelapseValidator = async (req, res, next) => {
  try {
		if (!req.file)
			return res
				.status(400)
				.send({ "error": "Erro na validação", "messages": ["O arquivo não pode estar vazio"] });
		
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
		const SchemaFile = Yup.object().shape({
			size: Yup.number()
				.min(1, 'O arquivo não pode estar vazio')
				.max(20, 'O arquivo não pode passar de 200Mb'),
			mimetype: Yup.string()
				.test('fileFormat', 'Tipo de imagem/video inválido', (value) => {
					return SUPPORTED_FORMATS.includes(value)
				}),
		});
		await SchemaFile.validate(req.file, { abortEarly: false });

		const SchemaBody = Yup.object().shape({
			dt_media: Yup.string().required('A data precisa ser preenchida'),
		});
		await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
	} catch (e) {
    return ValidationError(e, res);
  }
};
