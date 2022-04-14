import { Program } from '../../models';

export class ProgramRepository {
  async createProgram({ name }) {
    await Program.create({
      nm_program: name.toLowerCase().trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
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
        nm_program: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findProgramById({ id }) {
    return await Program.findOne({
      where: {
        id_program: id,
      },
      raw: true,
    });
  }

  async deleteProgram({ id }) {
    await Program.destroy({
      where: { id_program: id },
    });
  }

  async updateProgram({ id, name }) {
    const category = await Program.findOne({
      where: {
        id_program: id,
      },
    });

    return category.update({
      nm_program: name.toLowerCase().trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }
}
