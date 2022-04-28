import { RoleRepository, ProductRepository } from '../../database/repositories';

export class DeleteRoleService {
  async execute({ id_role }) {
    const repository = new RoleRepository();
    const productRepository = new ProductRepository();

    const verifyRoleExists = await repository.findRoleById({
      id_role,
    });

    if (!verifyRoleExists)
      return { error: `Não existe uma função com este ID -> ${id_role}.` };

    const verifyFk = await productRepository.verifyRole({
      id_suggested_role: id_role,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Função pois existem Produtos associados.',
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
