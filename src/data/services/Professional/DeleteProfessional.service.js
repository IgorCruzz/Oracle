import {
  ProfessionalRepository,
  ProductHistoryRepository,
  UserRepository,
} from '../../database/repositories';
import { sequelize } from '../../database';

export class DeleteProfessionalService {
  async execute({ id_professional }) {
    const repository = new ProfessionalRepository();
    const productHistory = new ProductHistoryRepository();
    const userRepository = new UserRepository();

    const t = await sequelize.transaction();

    try {
      const verifyProfessionalExists = await repository.findProfessionalById({
        id_professional,
      });

      if (!verifyProfessionalExists)
        return {
          error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
        };

      const verifyFk = await productHistory.verifyRelation({
        id_professional,
      });

      if (verifyFk.length > 0) {
        return {
          error:
            'Não foi possível excluir o Colaborador pois existem Históricos de produtos associados.',
        };
      }

      // ADICIONAR VERIFICAÇÃO DE INTEGRIDADE COM ALOCAÇÃO

      const { id_user } = verifyProfessionalExists;

      if (id_user) {
        await userRepository.deleteUser({
          id_user,
          transaction: t,
        });
      }

      await repository.deleteProfessional({
        id_professional,
        transaction: t,
      });

      t.commit();

      return {
        message: 'Colaborador excluído com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
