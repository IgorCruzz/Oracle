import { CategoryRepository } from '../../database/repositories';

export class UpdateCategoryService {
  async execute({ name, id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: 'There is no category with this name.' };

    const categoryUpdated = await repository.updateCategory({
      id,
      name,
    });

    return {
      category: categoryUpdated,
    };
  }
}
