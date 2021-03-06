import jwt from 'jsonwebtoken'
import db from  '../db/models'
import {DefaultScopeUser} from '../db/models/user'
import {GeneralError} from '../app'

const User: any = db.User

interface JWTConfigInterface{
  secret: string;
  expiresIn: string
}

const { jwtConfig } = require('../config')
const {secret, expiresIn}: JWTConfigInterface = jwtConfig;

export const setTokenCookie = (res:any, user: DefaultScopeUser) => {
    const token: string = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: parseInt(expiresIn) }, 
    );
  
    const isProduction: boolean = process.env.NODE_ENV === "production";
  
    res.cookie('token', token, {
      maxAge: parseInt(expiresIn) * 1000, 
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax",
    });
  
    return token;
};




export const restoreUser = (req: any, res: any, next: any) => {
  
  interface CookieTypes{
    token: string;
  }

    const { token }: CookieTypes = req.cookies;
  
    return jwt.verify(token, secret, async (err:any, jwtPayload: any) => {
      if (err) {
        return next();
      }
  
      try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
      } catch (e) {
        res.clearCookie('token');
        return next();
      }
  
      if (!req.user) res.clearCookie('token');
  
      return next();
    });
};



export const requireAuth = [
  restoreUser,
  function (req: any, res:any, next: any) {
    if (req.user) return next();

    const err = new GeneralError('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];



  


