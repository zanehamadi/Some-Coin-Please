'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Updates', [{
        title: 'Neque porro quisquam est qui dolorem ',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
        product_id: 1,
        
     },
     {
      title: 'Neque porro quisquam est qui dolorem ',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
      product_id:2
   },
   {
    title: 'Neque porro quisquam est qui dolorem ',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
    product_id: 3
 },
 {
  title: 'Neque porro quisquam est qui dolorem ',
  description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
  product_id: 4
},
{
  title: 'Neque porro quisquam est qui dolorem ',
  description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
  product_id:5
},
  {
    title: 'Neque porro quisquam est qui dolorem ',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in euismod diam. Duis sagittis pulvinar pharetra. Duis dapibus massa massa, ac lacinia elit luctus id. Vestibulum quis porttitor dui. Nullam a neque volutpat, facilisis orci sit amet, vulputate enim. Nam viverra tortor id ante dapibus consectetur. Aliquam erat volutpat. Fusce sed enim non ex sollicitudin porttitor. Proin vitae justo justo. Suspendisse imperdiet purus vitae nulla bibendum posuere.',
    product_id: 3
 }
], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Updates', null, {})
  }
};
