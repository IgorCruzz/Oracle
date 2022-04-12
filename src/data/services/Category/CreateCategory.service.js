import { CategoryRepository } from '../../database/repositories';

export class CreateCategoryService {
  async execute({ name }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategory({
      name,
    });

    if (verifyCategoryExists)
      return { error: 'Já existe uma categoria com este nome.' };

    await repository.createCategory({ name });

    return {
      mensagem: 'Categoria criada com sucesso!',
    };
  }
}
