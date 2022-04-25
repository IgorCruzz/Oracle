import { Op } from 'sequelize';
import { Program } from '../../models';

export class ProgramRepository {
  async createProgram({ name }) {
    const createdProgram = await Program.create({
      nm_program: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Program.findOne({
      where: { nm_program: createdProgram.dataValues.nm_program },
    });
  }

  async findPrograms({ page, limit, search }) {
    return search
      ? await Program.findAndCountAll({
          where: {
            nm_program: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
        })
      : await Program.findAndCountAll({
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
        });
  }

  async findProgram({ name }) {
    return await Program.findOne({
      where: {
        nm_program: name.trim(),
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
    const program = await Program.findOne({
      where: {
        id_program: id,
      },
    });

    const programUpdate = await program.update({
      nm_program: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Program.findOne({
      where: {
        nm_program: programUpdate.dataValues.nm_program,
      },
      raw: true,
    });
  }
}
