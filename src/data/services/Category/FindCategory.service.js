import { CategoryRepository } from '../../database/repositories';

export class FindCategoryService {
  async execute({ id }) {
    const repository = new CategoryRepository();

    const findCategory = await repository.findCategoryById({
      id,
    });

    if (!findCategory)
      return { error: `Não existe uma Categoria com este ID -> ${id}.` };

    return {
      category: findCategory,
    };
  }
}
