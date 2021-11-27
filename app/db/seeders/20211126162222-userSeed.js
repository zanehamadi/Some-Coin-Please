'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'Demo',
      email: 'demo@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'STRING',
      balance: 5000000,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
