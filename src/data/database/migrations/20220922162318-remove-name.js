module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('project', 'ds_official_document');
  },
};
