import {
  RoleRepository,
  ProductRepository,
  RoleGradeRepository,
} from '../../database/repositories';

export class DeleteRoleService {
  async execute({ id_role }) {
    const repository = new RoleRepository();
    const productRepository = new ProductRepository();
    const roleGradeRepository = new RoleGradeRepository();

    const verifyRoleExists = await repository.findRoleById({
      id_role,
    });

    if (!verifyRoleExists)
      return { error: `Não existe uma Função com este ID -> ${id_role}.` };

    const verifyFkFromProduct = await productRepository.verifyRole({
      id_suggested_role: id_role,
    });

    if (verifyFkFromProduct.length > 0) {
      return {
        error:
          'Não foi possível excluir a Função pois existem Produtos associados.',
      };
    }

    const verifyFkFromRoleGrade = await roleGradeRepository.verifyRelationRole({
      id_role,
    });

    if (verifyFkFromRoleGrade.length > 0) {
      return {
        error:
          'Não foi possível excluir a Função pois existem Custos HH associados.',
      };
    }

    await repository.deleteRole({
      id_role,
    });

    return {
      message: 'Função excluída com sucesso!',
    };
  }
}
