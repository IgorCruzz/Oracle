import { ProfessionalRepository } from '../../database/repositories';

export class FindProfessionalsService {
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
  }) {
    const repository = new ProfessionalRepository();

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
    });

    if (findProfessionals.length === 0)
      return { error: 'Não há nenhum Colaborador registrado.' };

    return {
      professionals: findProfessionals,
    };
  }
}
