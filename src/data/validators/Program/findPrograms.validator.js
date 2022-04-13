import * as Yup from 'yup';

export const findProgramsValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      limit: Yup.string().required(),
      page: Yup.string().required(),
    });

    await SchemaParam.validate(req.query, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};
