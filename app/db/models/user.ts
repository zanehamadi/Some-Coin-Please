'use strict';

import {Model, Optional} from 'sequelize'

interface UserAttributes{
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
  profile_picture: string;
  balance: number;

}

//  Because we might not get an ID from the frontend, and sql generates it

interface UserCreationAttribute extends Optional<UserAttributes, "id">{}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes, UserCreationAttribute> implements UserAttributes{
    id!: number; //! === not nullable
    username!: string;
    email!: string;
    hashedPassword!: string;
    profile_picture!: string;
    balance!: number;
    static associate(models: any) {
      // define association here
    }
  };
  User.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
}, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'balance', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {
          exclude: []
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};