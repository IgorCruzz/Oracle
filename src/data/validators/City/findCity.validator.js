import * as Yup from 'yup';

export const findCityValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id: Yup.string().required(),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};
