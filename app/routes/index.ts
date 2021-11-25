import express from 'express'

const router = express.Router();

router.get('/', function(req, res) {
  //@ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('HOME!');
});

export default router;