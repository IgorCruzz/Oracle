module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('project_status', 'dt_updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: () => {},
};
