import { Program } from '../../models';

export class ProgramRepository {
  async createProgram({ name }) {
    await Program.create({
      NM_PROGRAM: name.toLowerCase().trim(),
    });
  }

  async findPrograms({ page, limit }) {
    return await Program.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findProgram({ name }) {
    return await Program.findOne({
      where: {
        NM_PROGRAM: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findProgramById({ id }) {
    return await Program.findOne({
      where: {
        ID_PROGRAM: id,
      },
      raw: true,
    });
  }

  async deleteProgram({ id }) {
    await Program.destroy({
      where: { ID_PROGRAM: id },
    });
  }

  async updateProgram({ id, name }) {
    const category = await Program.findOne({
      where: {
        ID_PROGRAM: id,
      },
    });

    return category.update({
      NM_PROGRAM: name.toLowerCase().trim(),
    });
  }
}
