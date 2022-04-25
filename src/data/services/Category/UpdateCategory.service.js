import { CategoryRepository } from '../../database/repositories';

export class UpdateCategoryService {
  async execute({ name, id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: `Não existe uma categoria com este ID -> ${id}.` };

    const verifyCategoryName = await repository.findCategory({
      name,
    });

    if (verifyCategoryName.id_category !== Number(id))
      return { error: 'Já existe uma categoria registrada com este nome.' };

    const categoryUpdated = await repository.updateCategory({
      id,
      name,
    });

    return {
      message: 'Categoria atualizada com sucesso!',
      category: categoryUpdated,
    };
  }
}
