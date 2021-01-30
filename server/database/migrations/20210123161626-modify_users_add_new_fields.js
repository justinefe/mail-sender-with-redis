module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users', // table name
      'subscribe', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    );
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn('Users', 'subscribe');
  },
};
