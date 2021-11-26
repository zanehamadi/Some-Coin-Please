import express from 'express'
import apiRouter from './api'
import expressAsyncHandler from 'express-async-handler';
import db from '../db/models'

const router = express.Router();


router.use('/api', apiRouter)

router.get('/', function(req, res) {
  //@ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('HOME!');
});

router.get('/users', expressAsyncHandler(async(req, res) => {
  const user = await db.User.findAll()
  console.log('USER:', user)
  res.json(user)
}))

export default router;