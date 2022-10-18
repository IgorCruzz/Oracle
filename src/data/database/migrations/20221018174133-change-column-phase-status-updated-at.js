module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('phase_status', 'dt_updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: () => {},
};
