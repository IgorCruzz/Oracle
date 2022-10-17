module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('phase_status', {
      id_status: {
        type: Sequelize.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ds_status: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      dt_created_at: {
        type: Sequelize.DATE,
      },
      dt_updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: () => {},
};
