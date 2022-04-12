import { CategoryRepository } from '../../database/repositories';

export class CreateCategoryService {
  async execute({ name }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategory({
      name,
    });

    if (verifyCategoryExists)
      return { error: 'A category with this name already exists.' };

    await repository.createCategory({ name });

    return {
      message: 'Category created succesfully!',
    };
  }
}
