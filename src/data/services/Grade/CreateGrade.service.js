import { GradeRepository } from '../../database/repositories';

export class CreateGradeService {
  async execute({ nm_grade }) {
    const repository = new GradeRepository();

    const verifyGradeExists = await repository.findGrade({
      nm_grade,
    });

    if (verifyGradeExists)
      return { error: 'Já existe um Cargo registrado com este nome.' };

    const grade = await repository.createGrade({ nm_grade });

    return {
      message: 'Cargo registrado com sucesso!',
      grade: grade.dataValues,
    };
  }
}
