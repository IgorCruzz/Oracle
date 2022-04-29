import {
  CategoryRepository,
  ProjectRepository,
} from '../../database/repositories';

export class DeleteCategoryService {
  async execute({ id }) {
    const repository = new CategoryRepository();
    const projectRepository = new ProjectRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: `Não existe uma Categoria com este ID -> ${id}.` };

    const verifyFk = await projectRepository.verifyRelationCategory({
      id_category: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Categoria pois existem Projetos associados.',
      };
    }

    await repository.deleteCategory({
      id,
    });

    return {
      message: 'Categoria excluída com sucesso!',
    };
  }
}
