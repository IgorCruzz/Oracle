"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProfessionalsService {
  async execute({
    id_role_grade,
    id_sector,
    id_user,
    in_delivery_analyst,
    limit,
    nm_professional,
    in_active,
    page,
    ds_email_login,
    has_no_association,
    id_role,
    id_grade,
  }) {
    const repository = new (0, _repositories.ProfessionalRepository)();

    const findProfessionals = await repository.findProfessionals({
      id_role_grade,
      id_sector,
      id_user,
      in_delivery_analyst,
      limit,
      nm_professional,
      in_active,
      page,
      ds_email_login,
      has_no_association,
      id_role,
      id_grade,
    });

    if (findProfessionals.length === 0)
      return { error: 'Não há nenhum Colaborador registrado.' };

    return {
      professionals: findProfessionals,
    };
  }
} exports.FindProfessionalsService = FindProfessionalsService;
