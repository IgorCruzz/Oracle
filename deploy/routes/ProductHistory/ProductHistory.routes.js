"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _express = require('express');
var _path = require('path');
var _models = require('../../data/database/models');

const routes = _express.Router.call(void 0, );

routes.get('/product_history/download', async (req, res) => {
  const { nm_file } = req.query;

  const getFilename = await _models.Product_history.findOne({
    where: {
      [_sequelize.Op.and]: [{ nm_file }],
    },
  });

  if (!getFilename) {
    return res.status(400).json({ error: 'Não há arquivo com este nome!' });
  }

  const { nm_original_file } = getFilename;

  const file = _path.resolve.call(void 0, 
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'product_history',
    nm_file
  );

  return res.download(file, nm_original_file);
});

exports. default = routes;
