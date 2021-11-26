'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'Demo',
      email: 'demo@email.com',
      hashedPassword: 'password',
      profile_picture: 'STRING',
      balance: 5000000,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
