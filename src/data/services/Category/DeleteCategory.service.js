import { CategoryRepository } from '../../database/repositories';

export class DeleteCategoryService {
  async execute({ id }) {
    const repository = new CategoryRepository();

    const verifyCategoryExists = await repository.findCategoryById({
      id,
    });

    if (!verifyCategoryExists)
      return { error: `Não existe uma categoria com este ID -> ${id}.` };

    await repository.deleteCategory({
      id,
    });

    return {
      message: 'Categoria deleta com sucesso!',
    };
  }
}
