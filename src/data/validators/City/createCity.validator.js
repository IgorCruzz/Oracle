import * as Yup from 'yup';

export const createCityValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      regionId: Yup.number().required(),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};