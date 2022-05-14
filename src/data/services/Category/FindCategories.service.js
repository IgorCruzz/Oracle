import { CategoryRepository } from '../../database/repositories';

export class FindCategoriesService {
  async execute({ page, limit, nm_category }) {
    const repository = new CategoryRepository();

    const findCategories = await repository.findCategories({
      limit,
      page,
      nm_category,
    });

    if (findCategories.length === 0)
      return { error: 'Não há nenhuma Categoria registrada.' };

    return {
      categories: findCategories,
    };
  }
}
