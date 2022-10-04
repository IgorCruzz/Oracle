"use strict";Object.defineProperty(exports, "__esModule", {value: true});






var _models = require('../../database/models');

 class PowerBiProfessionalService {
  async execute() {
    const findProfessionals = await _models.Professional.findAll({
      include: [
        {
          model: _models.Sector,
          as: 'sector',
        },
        {
          model: _models.Role_grade,
          as: 'coustHH',
          include: [
            {
              model: _models.Grade,
              as: 'grade',
            },
            {
              model: _models.Role,
              as: 'role',
            },
          ],
        },
        {
          model: _models.User,
          as: 'user',
        },
      ],
    });

    const response = findProfessionals.map(professional => ({
      nm_professional: professional.nm_professional,
      nm_role: professional.coustHH.role.nm_role,
      nm_grade: professional.coustHH.grade.nm_grade,
      nm_sector: professional.sector.nm_sector,
      ds_email_login: professional.user ? professional.user.ds_email_login : '',
      in_delivery_analyst: professional.in_delivery_analyst,
      in_active: professional.in_active,
    }));

    return {
      professionals: response,
    };
  }
} exports.PowerBiProfessionalService = PowerBiProfessionalService;
