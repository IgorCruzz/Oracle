import {
  ProductRepository,
  RoleRepository,
  ProjectPhaseRepository,
} from '../../database/repositories';

export class UpdateProductService {
  async execute(id_product, data) {
    const {
      id_suggested_role,
      id_project_phase,
      nm_product,
      changeOrder,
    } = data;

    const repository = new ProductRepository();
    const roleRepository = new RoleRepository();
    const projectPhaseRepository = new ProjectPhaseRepository();

    const verifyProjectExists = await repository.findProductById({
      id_product,
    });

    if (
      !verifyProjectExists ||
      (verifyProjectExists && !verifyProjectExists.dataValues.project_phase)
    )
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    if (id_suggested_role) {
      const roleExists = await roleRepository.findRoleById({
        id_role: id_suggested_role,
      });

      if (!roleExists) {
        return {
          error: `Não há nenhuma Função registrada com este ID -> ${id_suggested_role}.`,
        };
      }
    }

    const ProjectPhaseExists = await projectPhaseRepository.findProjectPhaseById(
      {
        id_project_phase,
      }
    );

    if (!ProjectPhaseExists) {
      return {
        error: `Não há nenhuma Fase de projeto registrada com este ID -> ${id_project_phase}.`,
      };
    }

    if (!changeOrder) {
      const verifyProductName = await repository.findProductByName({
        nm_product,
        id_project_phase,
      });

      if (
        verifyProductName &&
        verifyProductName.id_product !== Number(id_product)
      )
        return { error: 'Já existe um Produto registrado com este nome.' };
    }

    const productUpdated = await repository.updateProduct(id_product, data);

    return {
      message: 'Produto atualizado com sucesso!',
      product: productUpdated,
    };
  }
}
