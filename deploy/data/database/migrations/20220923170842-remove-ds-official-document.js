"use strict";module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('project', 'ds_official_document');
  },
};
