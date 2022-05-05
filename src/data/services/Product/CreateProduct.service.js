import {
  ProductRepository,
  RoleRepository,
  ProjectPhaseRepository,
} from '../../database/repositories';

export class CreateProductService {
  async execute(data) {
    const { id_suggested_role, id_project_phase, nm_product } = data;

    const repository = new ProductRepository();
    const roleRepository = new RoleRepository();
    const projectPhaseRepository = new ProjectPhaseRepository();

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

    const productExists = await repository.findProductByName({
      nm_product,
      id_project_phase,
    });

    if (productExists) {
      return { error: 'Já existe um Produto com este nome.' };
    }

    const product = await repository.createProduct(data);

    return {
      message: 'Produto adicionado com sucesso!',
      product,
    };
  }
}
