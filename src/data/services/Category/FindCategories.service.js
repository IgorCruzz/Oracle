import { CategoryRepository } from '../../database/repositories';

export class FindCategoriesService {
  async execute({ page, limit }) {
    const repository = new CategoryRepository();

    const findCategories = await repository.findCategories({
      limit,
      page,
    });

    if (findCategories.length === 0)
      return { error: 'Não há nenhuma categoria registrada.' };

    return {
      categories: findCategories,
    };
  }
}
