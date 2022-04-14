import { CategoryRepository } from '../../database/repositories';

export class UpdateCategoryService {
  async execute({ name, id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: `Não existe uma categoria com este ID -> ${id}.` };

    const categoryUpdated = await repository.updateCategory({
      id,
      name,
    });

    return {
      category: categoryUpdated,
    };
  }
}
