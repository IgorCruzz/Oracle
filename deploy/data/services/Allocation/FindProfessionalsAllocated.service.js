"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _models = require('../../database/models');

 class FindProfessionalsAllocatedService {
  async execute() {
    const professionals = await _models.Allocation.findAll({
      attributes: ['id_professional'],
      include: [
        {
          model: _models.Professional,
          as: 'professional',
        },
      ],
    });

    return {
      professionals,
    };
  }
} exports.FindProfessionalsAllocatedService = FindProfessionalsAllocatedService;
