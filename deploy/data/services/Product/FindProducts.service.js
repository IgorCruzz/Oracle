"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProductsService {
  async execute({
    page,
    limit,
    id_project_phase,
    id_suggested_role,
    nm_product,
  }) {
    const repository = new (0, _repositories.ProductRepository)();

    const findProducts = await repository.findProducts({
      id_project_phase,
      id_suggested_role,
      limit,
      page,
      nm_product,
    });

    if (findProducts.length === 0)
      return { error: 'Não há nenhum Produto registrado.' };

    return {
      products: findProducts,
    };
  }
} exports.FindProductsService = FindProductsService;
