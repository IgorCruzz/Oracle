import { CategoryRepository } from '../../database/repositories';

export class CreateCategoryService {
  async execute({ name }) {
    await new CategoryRepository().createCategory({ name });

    return {
      message: 'Categoria criada com sucesso!',
    };
  }
}
