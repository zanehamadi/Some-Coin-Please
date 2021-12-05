import express from 'express'
import apiRouter from './api'
import expressAsyncHandler from 'express-async-handler';
import db from '../db/models'
const router = express.Router();
const isProduction: boolean = process.env.NODE_ENV === 'production'
router.use('/api', apiRouter)


if (isProduction) {
  const path = require('path');
  router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
          path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
  });

  router.use(express.static(path.resolve("../../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
          path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
  });
}

if (!isProduction) {
  router.get('/api/csrf/restore', (req:any, res:any) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

router.get('/', function(req:any, res:any) {
  //@ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('HOME!');
});

router.get('/users', expressAsyncHandler(async(req:any, res:any) => {
  const user = await db.User.findAll()
  res.json(user)
}))





export default router;