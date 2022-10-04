"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProjectsService {
  async execute({
    page,
    limit,
    id_city,
    id_category,
    id_program,
    id_agency,
    cd_sei,
    nm_project,
  }) {
    const repository = new (0, _repositories.ProjectRepository)();

    const findProjects = await repository.findProjects({
      page,
      limit,
      id_city,
      id_category,
      id_program,
      id_agency,
      cd_sei,
      nm_project,
    });

    if (findProjects.length === 0)
      return { error: 'Não há nenhum Projeto registrado.' };

    return {
      projects: findProjects,
    };
  }
} exports.FindProjectsService = FindProjectsService;
