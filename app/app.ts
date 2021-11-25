import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import {environment} from './config'
import routes from './routes'


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
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Hook routes up to your app, place at the bottom after middleware.
app.use(routes)

export default app;