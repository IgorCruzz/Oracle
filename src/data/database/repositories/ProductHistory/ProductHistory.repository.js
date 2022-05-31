import { Op } from 'sequelize';
import {
  Product,
  Product_history,
  Professional,
  Allocation_period,
} from '../../models';

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

  async findStatus({ id_product, cd_status }) {
    return await Product_history.findOne({
      where: {
        [Op.and]: [{ id_product }, { cd_status }],
      },
      raw: true,
    });
  }

  async verifyRelationProduct({ id_product }) {
    return await Product_history.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          where: { id_product },
        },
      ],
    });
  }

  async verifyRelationAllocationPeriod({ id_allocation_period }) {
    return await Product_history.findAll({
      include: [
        {
          model: Allocation_period,
          as: 'allocation',
          where: { id_allocation_period },
        },
      ],
    });
  }

  async findByProductandPeriod({
    id_product,
    id_allocation_period,
    cd_status,
    transaction,
  }) {
    return await Product_history.findOne({
      where: {
        [Op.and]: [{ id_product }, { id_allocation_period }, { cd_status }],
      },
      ...(transaction && { transaction }),
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

  async deleteProductHistory({ id_professional, id_product, transaction }) {
    return Product_history.destroy({
      where: {
        [Op.and]: [{ id_professional }, { id_product }],
      },

      transaction,
    });
  }

  async deleteProductHistoryAllocation({
    id_professional,
    id_allocation_period,
    id_product,
    transaction,
  }) {
    return Product_history.destroy({
      where: {
        [Op.and]: [
          { id_professional },
          { id_allocation_period },
          { id_product },
        ],
      },
      transaction,
    });
  }

  async updateProductHistory(data) {
    const { id_product, transaction, ...rest } = data;

    const product = await Product_history.findOne({
      where: {
        id_product,
      },
      ...(transaction && { transaction }),
    });

    await product.update({
      ...rest,
      dt_updated_at: new Date(Date.now()).toISOString(),
      ...(transaction && { transaction }),
    });
  }
}
