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
  video: string;
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
    video!: string;

    static associate(models:any) {
      Product.belongsTo(models.User, {foreignKey:'user_id'})
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
        len: [1,15]
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
      type: DataTypes.JSON
    },
    tags: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};