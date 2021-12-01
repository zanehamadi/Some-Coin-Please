import express from 'express'
import asyncHandler from 'express-async-handler';
import db  from '../../db/models';
import { check } from 'express-validator';
import {singleMulterUpload, singlePublicFileUpload} from '../../awsS3'
const Product: any = db.Product
const router = express.Router()

interface ProductAttributes{
  id?: number;
  user_id: number;
  title: string;
  description: string;
  summary: string;
  funding: number;
  investors: number;
  rewards: object;
  tags: string;
  image?: string;
}

const validateProduct = [
  check('title')
    .exists({checkFalsy: true})
    .isLength({min: 1})
    .withMessage('Please provide a title.'),
  check('title')
    .exists({checkFalsy: true})
    .isLength({max:256})
    .withMessage('Product title is too long.'),
    check('description')
      .exists({checkFalsy:true})
      .isLength({min: 15})
      .withMessage('Description is too short.'),
  check('description')
    .exists({checkFalsy: true})
    .isLength({max: 10000})
    .withMessage('Description is too long.'),
  check('summary')
    .exists({checkFalsy: true})
    .isLength({min: 15})
    .withMessage('Summary is too short.'),
  check('summary')
    .exists({checkFalsy: true})
    .isLength({max:256})
    .withMessage('Summary is too long.'),
  check('funding')
    .exists({checkFalsy:true})
    .withMessage('How did you get here?'),
  check('investors')
    .exists({checkFalsy: true})
    .withMessage('How did you get here?'),
  check('tags')
    .exists({checkFalsy: true})
    .withMessage('Please provide at least one tag.'),
]


router.get(
  '/',
  asyncHandler(async (req:any, res:any) => {
    const products = await Product.findAll()
    return res.json({
      products
    })
  })
)

router.post(
  '/',
  singleMulterUpload("image"),
  validateProduct,
  asyncHandler(async (req:any, res:any) => {

    const {user_id, title, description, summary, funding, investors, rewards, tags}: ProductAttributes = req.body
    console.log('REWARDS', rewards, typeof rewards)
    const image = await singlePublicFileUpload(req.file);
    let product = await Product.create({
      user_id:+user_id, 
      title, 
      description,
      summary,
      funding: +funding,
      investors: +investors,
      'rewards': rewards,
      tags: tags.split(','),
      image
    })
    
    return res.json(product)
  })
)

export default router