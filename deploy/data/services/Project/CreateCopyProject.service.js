"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _CreateProjectservice = require('./CreateProject.service');






var _models = require('../../database/models');

 class CreateCopyProjectService {
  async execute(id_project, data) {
    const projectService = new (0, _CreateProjectservice.CreateProjectService)();
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRIAR COPIA DO PROJETO
    const checkProjectId = await _models.Project.findOne({
      where: {
        id_project,
      },
      raw: true,
    });

    if (!checkProjectId) {
      return {
        error: `Não existe um projeto com este ID -> ${id_project}`,
      };
    }

    const response = await projectService.execute(data);

    if (response.error)
      return {
        error: response.error,
      };

    const { project } = response;
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRIAR COPIA DAS FASES DO PROJETO

    const findProjectsPhase = await _models.Project_phase.findAll({
      include: [
        {
          model: _models.Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
            id_project,
          },
        },
      ],
      order: [['nu_order', 'ASC']],
      raw: true,
    });

    if (findProjectsPhase.length === 0) {
      return {
        message: 'Projeto adicionado com sucesso!',
        project,
      };
    }

    const projectPhaseCopy = findProjectsPhase.map(projectPhases => {
      return {
        id_project: project.id_project,
        nu_order: projectPhases.nu_order,
        nm_project_phase: projectPhases.nm_project_phase,
        tp_project_phase: projectPhases.tp_project_phase,
        dt_planned_start: null,
        dt_planned_end: null,
        vl_phase: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      };
    });
    const projectPhase = await _models.Project_phase.bulkCreate(projectPhaseCopy);

    const projectPhaseResult = projectPhase.map(values => values.dataValues);

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRIAR COPIA DOS PRODUTOS

    const getProjectPhases = await _models.Project_phase.findAll({
      include: [
        {
          model: _models.Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
            id_project,
          },
        },
      ],
      order: [['nu_order', 'ASC']],
      raw: true,
    });

    const result = getProjectPhases.map((a, i) => {
      return {
        id_project_phase: a.id_project_phase,
        nu_order: a.nu_order,
        nm_project_phase: a.nm_project_phase,
        dt_planned_start: a.dt_planned_start,
        dt_planned_end: a.dt_planned_end,
        vl_phase: a.vl_phase,
        dt_created_at: a.dt_created_at,
        dt_updated_at: a.dt_updated_at,
        id_project: projectPhaseResult[i].id_project,
        id_project_phase_copy: projectPhaseResult[i].id_project_phase,
      };
    });

    const getProducts = await Promise.all(
      result.map(async res => {
        return await _models.Product.findAll({
          where: {
            id_project_phase: res.id_project_phase,
          },
          raw: true,
        });
      })
    );

    if (getProducts.length === 0) {
      return {
        message: 'Projeto adicionado com sucesso!',
        project,
      };
    }

    const productsReplaceValue = [];

    getProducts.map(a =>
      a.map(product => {
        const copy = result.find(
          res => res.id_project_phase === product.id_project_phase
        );

        productsReplaceValue.push({
          nu_order: product.nu_order,
          nm_product: product.nm_product,
          qt_minimum_hours: product.qt_minimum_hours,
          qt_maximum_hours: product.qt_maximum_hours,
          qt_probable_hours: product.qt_probable_hours,
          tp_required_action: 0,
          ds_note_required_action: null,
          dt_created_at: new Date(Date.now()).toISOString(),
          dt_updated_at: new Date(Date.now()).toISOString(),
          id_project_phase: copy.id_project_phase_copy,
          id_suggested_role: product.id_suggested_role,
        });
      })
    );

    const productBulkCreate = await _models.Product.bulkCreate(productsReplaceValue);

    const productResult = productBulkCreate.map(values => values.dataValues);

    productResult.map(async product => {
      await _models.Product_history.create({
        cd_status: 0,
        dt_status: new Date(Date.now()).toISOString(),
        tx_remark: null,
        id_product: product.id_product,
        id_allocation_period: null,
        id_professional: null,
        id_analyst_user: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      });
    });

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRIAR COPIA DOS DOCUMENTOS

    const getDocumentsReplace = [];

    getProducts.map(async product => {
      product.map(res => {
        getDocumentsReplace.push(res);
      });
    });

    const getDocuments = await Promise.all(
      getDocumentsReplace.map(async document => {
        return await _models.Document.findAll({
          where: {
            id_product: document.id_product,
          },
          include: [{ model: _models.Product, as: 'product' }],
        });
      })
    );

    const documentsLoaded = [];

    getDocuments.map(value => {
      value.map(document => {
        documentsLoaded.push({
          ...document.dataValues,
          product: document.dataValues.product.dataValues,
        });
      });
    });

    if (getDocuments.length === 0) {
      return {
        message: 'Projeto adicionado com sucesso!',
        project,
      };
    }

    const documentsParsed = documentsLoaded.map(value => {
      const getId = productResult.find(
        product => product.nm_product === value.product.nm_product
      );

      return {
        ds_document: value.ds_document,
        dt_upload: null,
        nm_file: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
        id_product: getId.id_product,
      };
    });

    await _models.Document.bulkCreate(documentsParsed);

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return {
      message: 'Projeto adicionado com sucesso!',
      project,
    };
  }
} exports.CreateCopyProjectService = CreateCopyProjectService;
