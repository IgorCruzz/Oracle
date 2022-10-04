"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProductService {
  async execute({ id_product }) {
    const repository = new (0, _repositories.ProductRepository)();

    const findProduct = await repository.findProductById({
      id_product,
      populate: true,
    });

    if (!findProduct || (findProduct && !findProduct.dataValues.project_phase))
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    return {
      product: findProduct,
    };
  }
} exports.FindProductService = FindProductService;
