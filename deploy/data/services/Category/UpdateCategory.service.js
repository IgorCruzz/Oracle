"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateCategoryService {
  async execute({ name, id }) {
    const repository = new (0, _repositories.CategoryRepository)();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: `Não existe uma Categoria com este ID -> ${id}.` };

    const verifyCategoryName = await repository.findCategory({
      name,
    });

    if (verifyCategoryName && verifyCategoryName.id_category !== Number(id))
      return { error: 'Já existe uma Categoria registrada com este nome.' };

    const categoryUpdated = await repository.updateCategory({
      id,
      name,
    });

    return {
      message: 'Categoria atualizada com sucesso!',
      category: categoryUpdated,
    };
  }
} exports.UpdateCategoryService = UpdateCategoryService;
