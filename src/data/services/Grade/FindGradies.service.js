import { GradeRepository } from '../../database/repositories';

export class FindGradiesService {
  async execute({ page, limit, nm_grade }) {
    const repository = new GradeRepository();

    const findGradies = await repository.findGradies({
      limit,
      page,
      nm_grade,
    });

    if (findGradies.length === 0)
      return { error: 'Não há nenhum Cargo registrado.' };

    return {
      gradies: findGradies,
    };
  }
}
