import { CategoryRepository } from '../../database/repositories';

export class CreateCategoryService {
  async execute({ name }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategory({
      name,
    });

    if (verifyCategoryExists)
      return { error: 'Já existe uma categoria registrada com este nome.' };

    const category = await repository.createCategory({ name });

    return {
      message: 'Categoria registrada com sucesso!',
      category: category.dataValues,
    };
  }
}
