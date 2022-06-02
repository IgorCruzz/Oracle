import {
  Product,
  Product_history,
  Professional,
  Allocation_period,
} from '../../database/models';

export class FindProductHistoryPtiService {
  async execute({ page, limit, id_product }) {
    const findProductHistory = await Product.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        {
          model: Product_history,
          required: true,
          as: 'product_history',
          where: {
            id_product,
          },
          include: [
            {
              model: Professional,
              as: 'professional',
            },
            {
              model: Allocation_period,
              as: 'allocation',
            },
          ],
        },
      ],
    });

    return {
      ptis: findProductHistory,
    };
  }
}
