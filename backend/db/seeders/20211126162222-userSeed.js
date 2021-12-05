'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'Demo',
      email: 'demo@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'John',
      email: 'john@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Joe',
      email: 'joe@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Mohamad',
      email: 'mo@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Ali',
      email: 'ali@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Mariam',
      email: 'mariam@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,

    },
    {
      username: 'Ahmed',
      email: 'ahmed@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Hussian',
      email: 'hussian@email.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 5000000,
    },
    {
      username: 'Claire',
      email: 'claire@gmail.com',
      hashedPassword: bcrypt.hashSync('password',10),
      profile_picture: 'https://i.imgur.com/Os2MTOy.png',
      balance: 6000000,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
