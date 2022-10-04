"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProjectService {
  async execute({ id_project }) {
    const repository = new (0, _repositories.ProjectRepository)();

    const findProject = await repository.findProjectById({
      id_project,
      populate: true,
    });

    if (!findProject)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    return {
      project: findProject,
    };
  }
} exports.FindProjectService = FindProjectService;
