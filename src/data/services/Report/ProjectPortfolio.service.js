import Sequelize, { Op } from 'sequelize';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import {
  Project,
  Project_phase,
  Product,
  Product_history,
  City,
  Region,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

const formatValue = value =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export class ProjectPortfolioService {
  async execute({
    page,
    limit,
    id_region,
    id_city,
    cd_priority,
    download,
    order_by,
  }) {
    const projects = await Project.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      where: cd_priority ? { cd_priority } : {},
      distinct: true,
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
      ],
      include: [
        id_city || id_region
          ? {
              model: City,
              as: 'city',
              where: id_city ? { id_city } : {},
              attributes: ['nm_city'],
              include: [
                {
                  model: Region,
                  as: 'region',
                  attributes: ['nm_region'],
                  where: id_region ? { id_region } : {},
                },
              ],
            }
          : {
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
          model: Project_phase,
          as: 'project_phase',
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    const Data = [];

    await Promise.all(
      projects.rows.map(async project => {
        const ID_PROJECT_PHASES = project.dataValues.project_phase.map(
          result => result.dataValues.id_project_phase
        );

        if (ID_PROJECT_PHASES.length === 0) {
          Data.push({
            nm_project: project.dataValues.nm_project,
            cd_sei: project.dataValues.cd_sei,
            nm_city: project.dataValues.city.nm_city,
            qt_m2: project.dataValues.qt_m2 || '',
            cd_priority:
              (project.dataValues.cd_priority === 1 && 'Baixa') ||
              (project.dataValues.cd_priority === 2 && 'Média') ||
              (project.dataValues.cd_priority === 3 && 'Alta'),
            value:
              (project.dataValues.vl_contract &&
                formatValue(project.dataValues.vl_contract)) ||
              (project.dataValues.vl_bid &&
                formatValue(project.dataValues.vl_bid)) ||
              (project.dataValues.vl_estimated &&
                formatValue(project.dataValues.vl_estimated)) ||
              '',
            project_phase: '',
            phaseCompletion: '',
          });
        } else {
          const products = await Product.findAll({
            where: {
              id_project_phase: {
                [Op.in]: ID_PROJECT_PHASES,
              },
            },
          });

          if (products.length > 0) {
            const ID_PRODUCTS = products.map(
              product => product.dataValues.id_product
            );

            const findLastRecord = await Product_history.findAll({
              attributes: [
                [
                  Sequelize.fn('MAX', Sequelize.col('id_product_history')),
                  'id_product_history',
                ],
              ],
              group: Sequelize.col('id_product'),
              raw: true,
              having: {
                id_product: {
                  [Op.in]: ID_PRODUCTS,
                },
              },
            });

            const values = findLastRecord.map(
              ({ id_product_history }) => id_product_history
            );

            const productHistories = await Product_history.findAll({
              where: {
                [Op.and]: {
                  id_product_history: {
                    [Op.in]: values,
                  },
                  cd_status: {
                    [Op.gt]: 0,
                  },
                },
              },
              include: [
                {
                  model: Product,
                  as: 'product',
                },
              ],
            });

            if (productHistories.length > 0) {
              const projectPhaseWithHistories = productHistories.map(
                ph => ph.dataValues.product.dataValues.id_project_phase
              );

              const reducedArray = projectPhaseWithHistories.reduce(
                (acc, curr) => {
                  if (acc.length === 0)
                    acc.push({ id_project_phase: curr, count: 1 });
                  else if (
                    acc.findIndex(f => f.id_project_phase === curr) === -1
                  )
                    acc.push({ id_project_phase: curr, count: 1 });
                  else
                    ++acc[acc.findIndex(f => f.id_project_phase === curr)]
                      .count;
                  return acc;
                },
                []
              );

              const sort = reducedArray.sort((a, b) => b.count - a.count);

              const project_phase = await Project_phase.findByPk(
                sort[0].id_project_phase
              );

              const getProductsFromProjectPhase =
                sort.length > 0 &&
                (await Product.findAll({
                  where: {
                    id_project_phase: sort[0].id_project_phase,
                  },
                }));

              const productsZ = getProductsFromProjectPhase.map(product => ({
                id_product: product.id_product,
                product_name: product.nm_product,
                duration: calculateHour({
                  max: product.qt_maximum_hours,
                  min: product.qt_minimum_hours,
                  prov: product.qt_probable_hours,
                  value: product.tp_required_action,
                }),
              }));

              const productSumDuration =
                productsZ.length > 0 &&
                productsZ.reduce((acc, curr) => {
                  return acc + curr.duration;
                }, 0);

              const productHistoriesConcluded = await Product_history.findAll({
                where: {
                  [Op.and]: {
                    id_product_history: {
                      [Op.in]: values,
                    },
                    cd_status: {
                      [Op.eq]: 5,
                    },
                  },
                },
                attributes: ['id_product'],
                include: [
                  {
                    model: Product,
                    as: 'product',
                  },
                ],
              });

              const productHistoriesConcluded2 = productHistoriesConcluded.map(
                productHistory => ({
                  id_product: productHistory.dataValues.product.id_product,
                  product_name: productHistory.dataValues.product.nm_product,
                  duration: calculateHour({
                    max: productHistory.dataValues.product.qt_maximum_hours,
                    min: productHistory.dataValues.product.qt_minimum_hours,
                    prov: productHistory.dataValues.product.qt_probable_hours,
                    value: productHistory.dataValues.product.tp_required_action,
                  }),
                })
              );

              const productHistoriesConcluded3 = productHistoriesConcluded2.reduce(
                (acc, curr) => {
                  return acc + curr.duration;
                },
                0
              );

              Data.push({
                nm_project: project.dataValues.nm_project,
                cd_sei: project.dataValues.cd_sei,
                nm_city: project.dataValues.city.nm_city,
                qt_m2: project.dataValues.qt_m2 || '',
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                value:
                  (project.dataValues.vl_contract &&
                    formatValue(project.dataValues.vl_contract)) ||
                  (project.dataValues.vl_bid &&
                    formatValue(project.dataValues.vl_bid)) ||
                  (project.dataValues.vl_estimated &&
                    formatValue(project.dataValues.vl_estimated)) ||
                  '',
                project_phase: project_phase.dataValues.nm_project_phase,
                phaseCompletion: `${(
                  (productHistoriesConcluded3 / productSumDuration) *
                  100
                ).toFixed(2)}%`,
              });
            } else {
              Data.push({
                nm_project: project.dataValues.nm_project,
                cd_sei: project.dataValues.cd_sei,
                nm_city: project.dataValues.city.nm_city,
                qt_m2: project.dataValues.qt_m2 || '',
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                value:
                  (project.dataValues.vl_contract &&
                    formatValue(project.dataValues.vl_contract)) ||
                  (project.dataValues.vl_bid &&
                    formatValue(project.dataValues.vl_bid)) ||
                  (project.dataValues.vl_estimated &&
                    formatValue(project.dataValues.vl_estimated)) ||
                  '',
                project_phase: '',
                phaseCompletion: '',
              });
            }
          } else {
            Data.push({
              nm_project: project.dataValues.nm_project,
              cd_sei: project.dataValues.cd_sei,
              nm_city: project.dataValues.city.nm_city,
              qt_m2: project.dataValues.qt_m2 || '',
              cd_priority:
                (project.dataValues.cd_priority === 1 && 'Baixa') ||
                (project.dataValues.cd_priority === 2 && 'Média') ||
                (project.dataValues.cd_priority === 3 && 'Alta'),
              value:
                (project.dataValues.vl_contract &&
                  formatValue(project.dataValues.vl_contract)) ||
                (project.dataValues.vl_bid &&
                  formatValue(project.dataValues.vl_bid)) ||
                (project.dataValues.vl_estimated &&
                  formatValue(project.dataValues.vl_estimated)) ||
                '',
              project_phase: '',
              phaseCompletion: '',
            });
          }
        }
      })
    );

    let buffer;

    if (download) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('ExampleSheet');

      worksheet.getCell('A2').value = 'RELATÓRIO:';
      worksheet.getCell('A2').font = {
        bold: true,
      };

      worksheet.getCell('A3').value = 'DATA:';
      worksheet.getCell('A3').font = {
        bold: true,
      };

      worksheet.getCell('A5').value = 'FILTROS:';
      worksheet.getCell('A5').font = {
        bold: true,
      };

      worksheet.getCell('A6').value = 'Região:';
      worksheet.getCell('A6').font = {
        bold: true,
      };
      worksheet.getCell('A7').value = 'Município:';
      worksheet.getCell('A7').font = {
        bold: true,
      };
      worksheet.getCell('A8').value = 'Prioridade:';
      worksheet.getCell('A8').font = {
        bold: true,
      };

      worksheet.getCell('A10').value = 'Nome do Projeto';
      worksheet.getCell('A10').font = {
        bold: true,
      };
      worksheet.getCell('B10').value = 'Número SEI';
      worksheet.getCell('B10').font = {
        bold: true,
      };
      worksheet.getCell('C10').value = 'Município';
      worksheet.getCell('C10').font = {
        bold: true,
      };
      worksheet.getCell('D10').value = 'Prioridade';
      worksheet.getCell('D10').font = {
        bold: true,
      };
      worksheet.getCell('E10').value = 'Valor';
      worksheet.getCell('E10').font = {
        bold: true,
      };
      worksheet.getCell('F10').value = 'M2';
      worksheet.getCell('F10').font = {
        bold: true,
      };
      worksheet.getCell('G10').value = 'Fase';
      worksheet.getCell('G10').font = {
        bold: true,
      };
      worksheet.getCell('H10').value = '% Completude da Fase';
      worksheet.getCell('H10').font = {
        bold: true,
      };

      let sortByNameCity;
      let sortByCdPriority;
      let sortByNameProject;

      if (order_by === 'nm_city') {
        sortByNameCity = Data.sort((a, b) => {
          if (a.nm_city < b.nm_city) {
            return -1;
          }
          if (a.nm_city > b.nm_city) {
            return 1;
          }
          return 0;
        });
      }

      if (order_by === 'cd_priority') {
        sortByCdPriority = Data.sort((a, b) => {
          if (a.cd_priority < b.cd_priority) {
            return -1;
          }
          if (a.cd_priority > b.cd_priority) {
            return 1;
          }
          return 0;
        });
      }

      if (order_by === 'nm_project') {
        sortByNameProject = Data.sort((a, b) => {
          if (a.nm_project < b.nm_project) {
            return -1;
          }
          if (a.nm_project > b.nm_project) {
            return 1;
          }
          return 0;
        });
      }

      const portfolioList =
        sortByNameCity || sortByNameProject || sortByCdPriority || Data;

      for (let i = 0; i <= portfolioList.length - 1; i++) {
        let num = 11;

        worksheet.getCell(`A${String(num + i)}`).value = Data[i].nm_project;
        worksheet.getCell(`B${String(num + i)}`).value = Data[i].cd_sei || '';
        worksheet.getCell(`C${String(num + i)}`).value = Data[i].nm_city;
        worksheet.getCell(`D${String(num + i)}`).value = Data[i].cd_priority;
        worksheet.getCell(`E${String(num + i)}`).value = Data[i].value;
        worksheet.getCell(`F${String(num + i)}`).value = Data[i].qt_m2 || '';
        worksheet.getCell(`G${String(num + i)}`).value = Data[i].project_phase;
        worksheet.getCell(`H${String(num + i)}`).value =
          Data[i].phaseCompletion;

        worksheet.getCell(`A${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`B${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`C${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`D${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`E${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`F${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`G${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`H${String(num + i)}`).alignment = {
          horizontal: 'left',
        };

        num++;
      }

      const colA = worksheet.getColumn('A');
      const colB = worksheet.getColumn('B');
      const colC = worksheet.getColumn('C');
      const colD = worksheet.getColumn('D');
      const colE = worksheet.getColumn('E');
      const colF = worksheet.getColumn('F');
      const colG = worksheet.getColumn('G');
      const colH = worksheet.getColumn('H');

      colA.width = 20;
      colB.width = 20;
      colC.width = 20;
      colD.width = 20;
      colE.width = 20;
      colF.width = 20;
      colG.width = 20;
      colH.width = 20;

      worksheet.getCell('B2').value = 'Portfolio de Projetos';
      worksheet.getCell('B3').value = format(new Date(), 'dd/MM/yyyy');

      const region = id_region
        ? await Region.findOne({
            where: {
              id_region: Number(id_region),
            },
            raw: true,
          })
        : false;

      const city = id_city
        ? await City.findOne({
            where: {
              id_city: Number(id_city),
            },
            raw: true,
          })
        : false;

      worksheet.getCell('B6').value = region
        ? region.nm_region
        : 'Filtro não informado.';
      worksheet.getCell('B7').value = city
        ? city.nm_city
        : 'Filtro não informado.';
      worksheet.getCell('B8').value = cd_priority
        ? (cd_priority === '1' && 'Baixa') ||
          (cd_priority === '2' && 'Média') ||
          (cd_priority === '3' && 'Alta')
        : 'Filtro não informado.';

      buffer = await workbook.xlsx.writeBuffer();
    }

    return {
      projects: {
        count: projects.count,
        rows: Data,
        buffer,
      },
    };
  }
}
