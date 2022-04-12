import { CategoryRepository } from '../../database/repositories';

export class DeleteCategoryService {
  async execute({ name }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategory({
      name,
    });

    if (!verifyCategoryExists)
      return { error: 'Não existe uma categoria com este nome.' };

    const { ID_CATEGORIA } = verifyCategoryExists;

    await repository.deleteCategory({
      id: ID_CATEGORIA,
    });

    return {
      mensagem: 'Categoria deletada com sucesso!',
    };
  }
}
