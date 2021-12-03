'use strict';

import {Model, Optional} from 'sequelize'

interface InvestmentAttribute{
  id: number;
  product_id: number;
  user_id: number;
  amount: number;
}

interface InvestmentCreationAttributes extends Optional<InvestmentAttribute, "id"> {}

module.exports = (sequelize:any, DataTypes:any) => {
  class Investment extends Model<InvestmentAttribute,
  InvestmentCreationAttributes> implements InvestmentAttribute{

    id!: number;
    product_id!: number;
    user_id!: number;
    amount!:number;

    static associate(models:any) {
      Investment.belongsTo(models.Product, {foreignKey:'product_id'})
      Investment.belongsTo(models.User, {foreignKey:'user_id'})
    }
    };
    Investment.init({
      id:{
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER
        
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};