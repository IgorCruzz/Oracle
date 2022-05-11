import { Product, Product_history } from '../../models';

export class ProductHistoryRepository {
  async createProductHistory(data) {
    const createdProductHistory = await Product_history.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Product_history.findOne({
      where: {
        id_product_history: createdProductHistory.dataValues.id_product_history,
      },
      include: [{ model: Product, as: 'product' }],
    });
  }
}
