import {
  Project,
  Project_phase,
  City,
  Region,
  Product,
  Location,
  Product_history,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

export class PowerBiProjectService {
  async execute() {
    const projects = await Project.findAll({
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
        'cd_complexity',
        'tx_description',
      ],

      include: [
        {
          model: City,
          as: 'city',
          attributes: ['nm_city'],
          include: [
            {
              model: Region,
              as: 'region',
              attributes: ['nm_region'],
            },
          ],
        },
        {
          model: Location,
          as: 'location',
        },
        {
          model: Project_phase,
          as: 'project_phase',
          include: [
            {
              model: Project,
              as: 'project',
            },
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: Product_history,
                  as: 'product_history',
                },
                {
                  model: Project_phase,
                  as: 'project_phase',
                  include: [
                    {
                      model: Project,
                      as: 'project',
                      include: [
                        {
                          model: City,
                          as: 'city',
                          include: [
                            {
                              model: Region,
                              as: 'region',
                              attributes: ['nm_region'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const Data = [];

    await Promise.all(
      projects.map(async project => {
        project.dataValues.project_phase.map(result => {
          const product_result = result.dataValues.product.map(product => {
            return Data.push({
              nm_project:
                product.dataValues.project_phase.dataValues.project.dataValues
                  .nm_project,
              nm_city:
                product.dataValues.project_phase.dataValues.project.dataValues
                  .city.dataValues.nm_city,
              cd_priority:
                product.dataValues.project_phase.dataValues.project.cd_priority,
              cd_complexity:
                product.dataValues.project_phase.dataValues.project
                  .cd_complexity,
              nm_region:
                product.dataValues.project_phase.dataValues.project.dataValues
                  .city.dataValues.region.dataValues.nm_region,
              cd_sei:
                product.dataValues.project_phase.dataValues.project.dataValues
                  .cd_sei || '',
              tx_description:
                product.dataValues.project_phase.dataValues.project.dataValues
                  .tx_description || '',
              phase_type_code:
                product.dataValues.project_phase.tp_project_phase || '',
              phase_type_name: product.dataValues.project_phase.tp_project_phase
                ? (product.dataValues.project_phase.tp_project_phase === 10 &&
                    'Concepção') ||
                  (product.dataValues.project_phase.tp_project_phase === 20 &&
                    'Priorização') ||
                  (product.dataValues.project_phase.tp_project_phase === 30 &&
                    'Desenvolvimento') ||
                  (product.dataValues.project_phase.tp_project_phase === 40 &&
                    'Licitação') ||
                  (product.dataValues.project_phase.tp_project_phase === 50 &&
                    'Execução') ||
                  (product.dataValues.project_phase.tp_project_phase === 60 &&
                    'Encerrado em Garantia')
                : '',
              nm_project_phase:
                product.dataValues.project_phase.nm_project_phase,
              nm_product: product.dataValues.nm_product,
              tp_required_action: product.dataValues.tp_required_action,
              hours: calculateHour({
                max: product.dataValues.qt_maximum_hours,
                min: product.dataValues.qt_minimum_hours,
                prov: product.dataValues.qt_probable_hours,
                value: product.dataValues.tp_required_action,
              }),
            });
          });

          if (product_result.length === 0) {
            Data.push({
              nm_project: project.dataValues.nm_project,
              nm_city: project.dataValues.city.dataValues.nm_city,
              cd_priority: project.dataValues.cd_priority,
              cd_complexity: project.cd_complexity,
              nm_region: project.city.dataValues.region.dataValues.nm_region,
              cd_sei: project.dataValues.cd_sei || '',
              tx_description: project.dataValues.tx_description || '',
              phase_type_code: result.dataValues.tp_project_phase || '',
              phase_type_name: result.dataValues.tp_project_phase
                ? (result.dataValues.tp_project_phase === 10 && 'Concepção') ||
                  (result.dataValues.tp_project_phase === 20 &&
                    'Priorização') ||
                  (result.dataValues.tp_project_phase === 30 &&
                    'Desenvolvimento') ||
                  (result.dataValues.tp_project_phase === 40 && 'Licitação') ||
                  (result.dataValues.tp_project_phase === 50 && 'Execução') ||
                  (result.dataValues.tp_project_phase === 60 &&
                    'Encerrado em Garantia')
                : '',
              nm_project_phase: result.dataValues.nm_project_phase,
              nm_product: '',
              tp_required_action: '',
              hours: '',
            });
          }
        });

        if (project.project_phase.length === 0) {
          Data.push({
            nm_project: project.dataValues.nm_project,
            nm_city: project.dataValues.city.dataValues.nm_city,
            cd_priority: project.dataValues.cd_priority,
            cd_complexity: project.dataValues.cd_complexity,
            nm_region: project.city.dataValues.region.dataValues.nm_region,
            cd_sei: project.dataValues.cd_sei || '',
            tx_description: project.dataValues.tx_description || '',
            phase_type_code: '',
            phase_type_name: '',
            nm_project_phase: '',
            nm_product: '',
            tp_required_action: '',
            hours: '',
          });
        }
      })
    );

    return {
      projects: Data,
    };
  }
}
