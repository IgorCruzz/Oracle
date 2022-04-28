import {
  ProjectPhaseRepository,
  ProductRepository,
} from '../../database/repositories';

export class DeleteProjectPhaseService {
  async execute({ id_project_phase }) {
    const repository = new ProjectPhaseRepository();
    const productRepository = new ProductRepository();

    const verifyProjectPhaseExists = await repository.findProjectPhaseById({
      id_project_phase,
    });

    if (!verifyProjectPhaseExists)
      return {
        error: `Não há nenhuma Fase de projeto registrado com este ID -> ${id_project_phase}.`,
      };

    const verifyFk = await productRepository.verifyProjectPhase({
      id_project_phase,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Fase de projeto pois existem Produtos associados.',
      };
    }

    await repository.deleteProjectPhase({
      id_project_phase,
    });

    return {
      message: 'Fase de projeto excluída com sucesso!',
    };
  }
}
