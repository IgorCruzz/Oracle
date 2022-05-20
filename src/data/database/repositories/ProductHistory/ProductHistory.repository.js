import { Product, Product_history, Professional } from '../../models';

export class ProductHistoryRepository {
  async createProductHistory(data) {
    const { transaction, ...rest } = data;

    const createdProductHistory = await Product_history.create(
      {
        ...rest,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      },
      { ...(transaction && { transaction }) }
    );

    return await Product_history.findOne({
      where: {
        id_product_history: createdProductHistory.dataValues.id_product_history,
      },
      include: [{ model: Product, as: 'product' }],
    });
  }

  async findProductById({ id_product }) {
    return await Product_history.findOne({
      where: {
        id_product,
      },
      raw: true,
    });
  }

  async verifyRelation({ id_professional }) {
    return await Product_history.findAll({
      include: [
        {
          model: Professional,
          as: 'professional',
          where: { id_professional },
        },
      ],
    });
  }

  async updateProductHistory(data) {
    const { id_product, transaction, ...rest } = data;

    const product = await Product.findOne({
      where: {
        id_product,
      },
    });

    await product.update({
      ...rest,
      dt_updated_at: new Date(Date.now()).toISOString(),
      ...(transaction && { transaction }),
    });
  }
}
