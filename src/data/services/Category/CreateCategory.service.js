import { CategoryRepository } from '../../database/repositories';

export class CreateCategoryService {
  async execute({ name }) {
    const repository = new CategoryRepository();

    await repository.createCategory({ name });

    return {
      message: 'Categoria criada com sucesso!',
    };
  }
}
