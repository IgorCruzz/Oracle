import { ProductHistoryRepository } from '../../database/repositories';

export class CreateProductHistoryService {
  async execute(data) {
    const repository = new ProductHistoryRepository();

    return await repository.createProductHistory(data);
  }
}
