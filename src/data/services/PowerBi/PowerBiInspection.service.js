import {
  Inspection,
  Project,
  Project_phase,
  City,
  Category,
} from '../../database/models';

export class PowerBiInspectionService {
  async execute() {
    const inspections = await Inspection.findAll({
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
          include: [
            {
              model: Project,
              as: 'project',
              include: [
                {
                  model: Category,
                  as: 'category',
                },
                {
                  model: City,
                  as: 'city',
                },
              ],
            },
          ],
        },
      ],
    });

    return {
      inspections,
    };
  }
}
