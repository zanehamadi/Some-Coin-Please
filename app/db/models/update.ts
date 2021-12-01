'use strict';

import {Model, Optional} from 'sequelize'

interface UpdateAttributes{
  id: number;
  title: string;
  description: string;
  product_id:number;
}

interface UpdateCreationAttributes extends Optional<UpdateAttributes, "id">{}

module.exports = (sequelize:any, DataTypes:any) => {
  class Update extends Model<UpdateAttributes, UpdateCreationAttributes> implements UpdateAttributes {

    id!:number;
    title!: string;
    description!: string;
    product_id!:number;


    static associate(models:any) {
      Update.belongsTo(models.Product, {foreignKey:'product_id'})
    }
  };
  Update.init({
    id:{
      allowNull: false,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title:{
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1,256]
      }
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [15, 2000]
        }
      },
  }, {
    sequelize,
    modelName: 'Update',
  });
  return Update;
};