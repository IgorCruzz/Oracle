import {
  ProfessionalRepository,
  ProductHistoryRepository,
  UserRepository,
  AllocationRepository,
} from '../../database/repositories';
import { sequelize } from '../../database';

export class DeleteProfessionalService {
  async execute({ id_professional }) {
    const repository = new ProfessionalRepository();
    const productHistory = new ProductHistoryRepository();
    const userRepository = new UserRepository();
    const allocationRepository = new AllocationRepository();

    const t = await sequelize.transaction();

    try {
      const verifyProfessionalExists = await repository.findProfessionalById({
        id_professional,
      });

      if (!verifyProfessionalExists)
        return {
          error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
        };

      const verifyFkProductHistory = await productHistory.verifyRelation({
        id_professional,
      });

      if (verifyFkProductHistory.length > 0) {
        return {
          error:
            'Não foi possível excluir o Colaborador pois existem Históricos de produtos associados.',
        };
      }

      const verifyFkProfessional = await allocationRepository.verifyRelationProfessional(
        {
          id_professional,
        }
      );

      if (verifyFkProfessional.length > 0) {
        return {
          error:
            'Não foi possível excluir o Colaborador pois existem Alocações associadas.',
        };
      }

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
