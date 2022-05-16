import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const deleteRoleGradeValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      id_role_grade: Yup.string().required('O campo id é obrigatório'),
    });

    await Schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
