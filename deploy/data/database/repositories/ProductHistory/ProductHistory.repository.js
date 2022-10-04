"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');





var _models = require('../../models');

 class ProductHistoryRepository {
  async createProductHistory(data) {
    const { transaction, ...rest } = data;

    const createdProductHistory = await _models.Product_history.create(
      {
        ...rest,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      },
      { ...(transaction && { transaction }) }
    );

    return await _models.Product_history.findOne({
      where: {
        id_product_history: createdProductHistory.dataValues.id_product_history,
      },
      include: [{ model: _models.Product, as: 'product' }],
    });
  }

  async findProductById({ id_product }) {
    return await _models.Product_history.findOne({
      where: {
        id_product,
      },
      raw: true,
    });
  }

  async findStatus({ id_product, cd_status }) {
    return await _models.Product_history.findOne({
      where: {
        [_sequelize.Op.and]: [{ id_product }, { cd_status }],
      },
      raw: true,
    });
  }

  async verifyRelationProduct({ id_product }) {
    return await _models.Product_history.findAll({
      include: [
        {
          model: _models.Product,
          as: 'product',
          where: { id_product },
        },
      ],
    });
  }

  async verifyRelationAllocationPeriod({ id_allocation_period }) {
    return await _models.Product_history.findAll({
      include: [
        {
          model: _models.Allocation_period,
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
    return await _models.Product_history.findOne({
      where: {
        [_sequelize.Op.and]: [{ id_product }, { id_allocation_period }, { cd_status }],
      },

      ...(transaction && { transaction }),
    });
  }

  async verifyRelation({ id_professional }) {
    return await _models.Product_history.findAll({
      include: [
        {
          model: _models.Professional,
          as: 'professional',
          where: { id_professional },
        },
      ],
    });
  }

  async deleteProductHistory({ id_professional, id_product, transaction }) {
    return _models.Product_history.destroy({
      where: {
        [_sequelize.Op.and]: [{ id_professional }, { id_product }],
      },

      transaction,
    });
  }

  async deleteProductHistoryDelivery({
    id_allocation_period,
    id_product,
    transaction,
  }) {
    return _models.Product_history.destroy({
      where: {
        [_sequelize.Op.and]: [{ id_allocation_period }, { id_product }, { cd_status: 2 }],
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
    return _models.Product_history.destroy({
      where: {
        [_sequelize.Op.and]: [
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

    const product = await _models.Product_history.findOne({
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
} exports.ProductHistoryRepository = ProductHistoryRepository;
