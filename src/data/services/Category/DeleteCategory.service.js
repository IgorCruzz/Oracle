import { CategoryRepository } from '../../database/repositories';

export class DeleteCategoryService {
  async execute({ id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: 'There is no category with this name.' };

    await repository.deleteCategory({
      id,
    });

    return {
      message: 'Category deleted successfully!',
    };
  }
}
