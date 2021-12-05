'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

       await queryInterface.bulkInsert('Investments', [{
         product_id: 1,
         user_id: 1,
         amount: 100
       },
       {
        product_id: 1,
        user_id: 2,
        amount: 100
      },
      {
        product_id: 1,
        user_id: 5,
        amount: 100000
      },
    ], {});
      
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Investments', null, {})
  } 
};
