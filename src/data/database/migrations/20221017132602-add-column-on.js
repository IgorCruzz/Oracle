module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('project', 'id_status', {
      type: Sequelize.SMALLINT,
      references: { model: 'project_status', key: 'id_status' },
      allowNull: true,
    });
  },

  down: () => {},
};
