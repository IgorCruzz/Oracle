import { GradeRepository } from '../../database/repositories';

export class FindGradeService {
  async execute({ id_grade }) {
    const repository = new GradeRepository();

    const findGrade = await repository.findGradeById({
      id_grade,
    });

    if (!findGrade)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    return {
      grade: findGrade,
    };
  }
}
