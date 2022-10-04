"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteCategoryService {
  async execute({ id }) {
    const repository = new (0, _repositories.CategoryRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

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
} exports.DeleteCategoryService = DeleteCategoryService;
