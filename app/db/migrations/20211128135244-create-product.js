'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(256)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(10000)
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      funding: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0.00
      },
      investors: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rewards: {
        type: Sequelize.STRING(1000000)
      },
      tags: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING(2000))
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(2000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};