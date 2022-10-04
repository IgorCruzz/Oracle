"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');











var _models = require('../../database/models');
var _calculateHour = require('../../../utils/calculateHour');

 class PowerBiProjectService {
  async execute() {
    const projects = await _models.Project.findAll({
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
          model: _models.City,
          as: 'city',
          attributes: ['nm_city'],
          include: [
            {
              model: _models.Region,
              as: 'region',
              attributes: ['nm_region'],
            },
          ],
        },
        {
          model: _models.Location,
          as: 'location',
        },
        {
          model: _models.Project_phase,
          as: 'project_phase',
          include: [
            {
              model: _models.Project,
              as: 'project',
            },
            {
              model: _models.Product,
              as: 'product',
              include: [
                {
                  model: _models.Product_history,
                  as: 'product_history',
                  include: [
                    {
                      model: _models.Allocation_period,
                      as: 'allocation',
                    },
                    {
                      model: _models.Professional,
                      as: 'professional',
                    },
                    {
                      model: _models.User,
                      as: 'user',
                      include: [
                        {
                          model: _models.Professional,
                          as: 'professional',
                        },
                      ],
                    },
                  ],
                },
                {
                  model: _models.Project_phase,
                  as: 'project_phase',
                  include: [
                    {
                      model: _models.Project,
                      as: 'project',
                      include: [
                        {
                          model: _models.City,
                          as: 'city',
                          include: [
                            {
                              model: _models.Region,
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
          const product_result = result.dataValues.product.map(
            async product => {
              return Data.push({
                nm_project:
                  product.dataValues.project_phase.dataValues.project.dataValues
                    .nm_project,
                nm_city:
                  product.dataValues.project_phase.dataValues.project.dataValues
                    .city.dataValues.nm_city,
                cd_priority:
                  product.dataValues.project_phase.dataValues.project
                    .cd_priority,
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
                phase_type_name: product.dataValues.project_phase
                  .tp_project_phase
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
                tp_required_action:
                  (product.dataValues.tp_required_action === 0 &&
                    'Não Definida') ||
                  (product.dataValues.tp_required_action === 1 &&
                    'Produção Integral') ||
                  (product.dataValues.tp_required_action === 2 &&
                    'Produção Parcial') ||
                  (product.dataValues.tp_required_action === 3 &&
                    'Dispensado') ||
                  (product.dataValues.tp_required_action === 4 &&
                    'Concluído pelo demandante'),
                hours: _calculateHour.calculateHour.call(void 0, {
                  max: product.dataValues.qt_maximum_hours,
                  min: product.dataValues.qt_minimum_hours,
                  prov: product.dataValues.qt_probable_hours,
                  value: product.dataValues.tp_required_action,
                }),
                pti:
                  product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status > 0
                    ? `${_datefns.format.call(void 0, 
                        new Date(
                          product.dataValues.product_history[
                            product.dataValues.product_history.length - 1
                          ].allocation.dt_start_allocation
                        ),
                        'dd/MM/yyyy'
                      )}-${_datefns.format.call(void 0, 
                        new Date(
                          product.dataValues.product_history[
                            product.dataValues.product_history.length - 1
                          ].allocation.dt_end_allocation
                        ),
                        'dd/MM/yyyy'
                      )}(${
                        product.dataValues.product_history[
                          product.dataValues.product_history.length - 1
                        ].allocation.qt_business_hours
                      }h)`
                    : '',
                nm_professional:
                  product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status > 0
                    ? product.dataValues.product_history[
                        product.dataValues.product_history.length - 1
                      ].professional.nm_professional
                    : 0,
                cd_status:
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 0 &&
                    'Ag. Alocação') ||
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 1 &&
                    'Em Produção') ||
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 2 &&
                    'Em Análise') ||
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 3 &&
                    'Em Correção') ||
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 4 &&
                    'Em Análise de Correção') ||
                  (product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 5 &&
                    'Concluído'),
                dt_concluded:
                  product.dataValues.product_history[
                    product.dataValues.product_history.length - 1
                  ].cd_status === 5
                    ? _datefns.format.call(void 0, 
                        new Date(
                          product.dataValues.product_history[
                            product.dataValues.product_history.length - 1
                          ].dt_created_at
                        ),
                        'dd/MM/yyyy'
                      )
                    : '',
                nm_analyst_user: product.dataValues.product_history[
                  product.dataValues.product_history.length - 1
                ].user
                  ? product.dataValues.product_history[
                      product.dataValues.product_history.length - 1
                    ].user.dataValues.professional
                    ? product.dataValues.product_history[
                        product.dataValues.product_history.length - 1
                      ].user.dataValues.professional.nm_professional
                    : product.dataValues.product_history[
                        product.dataValues.product_history.length - 1
                      ].user.nm_user
                  : '',
              });
            }
          );

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
              pti: '',
              nm_professional: '',
              cd_status: '',
              dt_concluded: '',
              nm_analyst_user: '',
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
            pti: '',
            nm_professional: '',
            cd_status: '',
            dt_concluded: '',
            nm_analyst_user: '',
          });
        }
      })
    );

    return {
      projects: Data,
    };
  }
} exports.PowerBiProjectService = PowerBiProjectService;
