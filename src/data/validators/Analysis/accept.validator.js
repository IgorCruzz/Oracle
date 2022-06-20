import * as Yup from 'yup';
import { ValidationError } from '../../../utils/validationError';

export const acceptValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      analysis: Yup.array()
        .of(
          Yup.object().shape({
            cd_status: Yup.string().required('O campo status é obrigatório'),
            id_allocation_period: Yup.number()
              .required('Período de locação inválido')
              .typeError('Período de locação inválido'),
            id_product: Yup.number()
              .required('Produto inválido')
              .typeError('Produto inválido'),
            tx_remark: Yup.string()
              .max(
                1000,
                'O tamanho máximo permitido para o campo justificativa da indicação da ação é 1000'
              )
              .nullable(),
          })
        )
        .required('Campo Alocação é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return ValidationError(e, res);
  }
};
