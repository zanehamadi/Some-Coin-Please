'use strict';

import {Model, Optional} from 'sequelize'
import bcrypt from 'bcryptjs'


interface UserAttributes{
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
  profile_picture: string;
  balance: number;

}


export interface DefaultScopeUser{
  id: number;
  username: string;
  profile_picture: string;
  toSafeObject: () => void
  validatePassword: (password: string) => boolean
}

export interface CurrentScopeUser extends DefaultScopeUser{
  created_at: string;
  updated_at: string;
  balance: number;
}

export interface LoginScopeUser extends CurrentScopeUser{
  hashedPassword: string;
}

interface LogInData {
  credential: string;
  password: string;
}

interface SignUpData{
  username: string;
  email: string;
  profile_picture: string;
  password: string;

}

interface UserCreationAttribute extends Optional<UserAttributes, "id">{}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes, UserCreationAttribute> implements UserAttributes{
    id!: number; 
    username!: string;
    email!: string;
    hashedPassword!: string;
    profile_picture!: string;
    balance!: number;
    static associate(models: any) {
    }
    toSafeObject = () => {
      const {id,username,email} = this;
      return {id, username, email}
    }

    validatePassword = (password: string) => {
      return bcrypt.compareSync(password, this.hashedPassword)
    }

    static async getUserByPk(id: number){
      return await User.scope('currentUser').findByPk(id)
    }

    static async login(userData: LogInData){
      const {credential, password} = userData
      const { Op } = require('sequelize')
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signUp(userData: SignUpData){
      let {username, email, password, profile_picture} = userData
      const hashedPassword = bcrypt.hashSync(password)
      if(!profile_picture){
        let profile_picture = 'https://i.imgur.com/Os2MTOy.png'
      }
      const user: any = await User.create({
        username,
        email,
        hashedPassword,
        profile_picture,
        balance: 0
      })
      return await User.scope('currentUser').findByPk(user.id);
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
      unique: true,
      validate: {
        len: [3,15],
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [5, 345],
        isEmail: true,

      }
      
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
      validate: {
        min: 0
      }
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