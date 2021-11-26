import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import {environment} from './config'
import routes from './routes'
import { ValidationError } from 'sequelize'
import { arrayBuffer } from 'stream/consumers'




const isProduction: boolean = environment === 'production';

//  Setup app to use express
const app = express();

// Utilize middleware and other techs
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Use CORS in development 
if (!isProduction) {
    app.use(cors());
}

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        //@ts-ignore
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
);

// Hook routes up to your app, place at the bottom after middleware.
app.use(routes)

// Error handling O_O

class GeneralError extends Error{
  title: string
  errors: Array<string>
  status: number

  constructor(msg: string){
    super(msg)
    this.title = ''
    this.errors = []
    this.status = 0
  }
}
// 404 Error creator
app.use((_req, _res, next) => {
  const err = new GeneralError("404 not found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Sequelize error creator
app.use((err: GeneralError | ValidationError, _req: any, _res: any, next: any) => {

  if (err instanceof ValidationError) {
    const sqlError = new GeneralError("Sequelize Error")
    sqlError.errors = err.errors.map((e) => e.message);
    sqlError.title = 'Validation error';
    return next(sqlError)
  }
   next(err);
});


// General Error Handler

app.use((err: GeneralError, _req: any, res: any, _next: any) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});





export default app;