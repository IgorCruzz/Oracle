module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('project_phase', 'id_status', {
      type: Sequelize.SMALLINT,
      references: { model: 'phase_status', key: 'id_status' },
      allowNull: true,
    });
  },

  down: () => {},
};
