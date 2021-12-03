'use strict';

import {Model, Optional} from 'sequelize'


interface ProductAttributes{
  id: number;
  user_id: number;
  title: string;
  description: string;
  summary: string;
  funding: number;
  investors: number;
  rewards: object;
  tags: Array<string>;
  image: string;
}


interface ProductCreationAttributes extends Optional<ProductAttributes, "id">{}


module.exports = (sequelize:any, DataTypes:any) => {
  class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes{
    id!: number;
    user_id!: number;
    title!: string;
    description!: string;
    summary!: string;
    funding!: number;
    investors!: number;
    rewards!: object;
    tags!: Array<string>;
    image!: string;

    static associate(models:any) {
      Product.belongsTo(models.User, {foreignKey:'user_id'})
      Product.hasMany(models.Update, {foreignKey:'product_id'})
    }
  };
  Product.init({
    id: {
      allowNull: false,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title:{
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        len: [1,256]
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [15, 10000]
      }
    },
    summary: {
      allowNull: false,
      type:  DataTypes.STRING,
      validate: {
        len: [15, 256]
      }
    },
    funding: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    investors: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rewards: {
      type: DataTypes.STRING(1000000)
    },
    tags: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING(2000)),
      validate: {
        max: 1000000, 
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};