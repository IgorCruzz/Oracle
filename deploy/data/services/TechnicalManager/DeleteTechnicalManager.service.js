"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteTechnicalManagerService {
  async execute({ id_technical_manager }) {
    const repository = new (0, _repositories.TechnicalManagerRepository)();

    const verifyTechnicalManagerExists = await repository.findTechnicalManagerById(
      {
        id_technical_manager,
      }
    );

    if (!verifyTechnicalManagerExists)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    await repository.deleteTechnicalManagerArea({
      id_technical_manager,
    });

    return {
      message: 'Técnico responsável excluído com sucesso!',
    };
  }
} exports.DeleteTechnicalManagerService = DeleteTechnicalManagerService;
