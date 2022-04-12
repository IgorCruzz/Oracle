import { CategoryRepository } from '../../database/repositories';

export class UpdateCategoryService {
  async execute({ name, id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: 'Não existe uma categoria com este nome.' };

    const categoryUpdated = await repository.updateCategory({
      id,
      name,
    });

    return {
      categoria: categoryUpdated,
    };
  }
}
