import {
  Professional,
  Sector,
  Grade,
  Role,
  Role_grade,
  User,
} from '../../database/models';

export class PowerBiProfessionalService {
  async execute() {
    const findProfessionals = await Professional.findAll({
      include: [
        {
          model: Sector,
          as: 'sector',
        },
        {
          model: Role_grade,
          as: 'coustHH',
          include: [
            {
              model: Grade,
              as: 'grade',
            },
            {
              model: Role,
              as: 'role',
            },
          ],
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });

    const response = findProfessionals.map(professional => ({
      nm_professional: professional.nm_professional,
      nm_role: professional.coustHH.role.nm_role,
      nm_grade: professional.coustHH.grade.nm_grade,
      nm_sector: professional.sector.nm_sector,
      ds_email_login: professional.user
        ? professional.user.ds_email_login
        : 'Não Possui',
      in_delivery_analyst: professional.in_delivery_analyst,
      in_active: professional.in_active,
    }));

    return {
      professionals: response,
    };
  }
}
