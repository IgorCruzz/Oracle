import { Allocation, Professional } from '../../database/models';

export class FindProfessionalsAllocatedService {
  async execute() {
    const professionals = await Allocation.findAll({
      attributes: ['id_professional'],
      include: [
        {
          model: Professional,
          as: 'professional',
        },
      ],
    });

    return {
      professionals,
    };
  }
}
