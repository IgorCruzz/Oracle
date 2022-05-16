import { GradeRepository } from '../../database/repositories';

export class FindGradeService {
  async execute({ id_grade }) {
    const repository = new GradeRepository();

    const findCategory = await repository.findGradeById({
      id_grade,
    });

    if (!findCategory)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    return {
      category: findCategory,
    };
  }
}
