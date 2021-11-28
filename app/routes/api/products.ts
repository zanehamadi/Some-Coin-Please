import express from 'express'
import asyncHandler from 'express-async-handler';
import db  from '../../db/models';
import { check } from 'express-validator';

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
  tags: Array<string>;
  image: string;
  video: string;
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
  check('image')
    .exists({checkFalsy: true})
    .withMessage('How did you get here?'),
  check('video')
    .exists({checkFalsy: true})
    .withMessage('How did you get here?')
]


router.get(
  '/',
  asyncHandler(async (req:any, res:any) => {
    const products = await Product.findAll()
    console.log(products)
    return res.json({
      products
    })
  })
)

router.post(
  '/',
  validateProduct,
  asyncHandler(async (req:any, res:any) => {
    const {user_id, title, description, summary, funding, investors, rewards, tags, image, video}: ProductAttributes = req.body
    let product = await Product.create({
      user_id, 
      title, 
      description,
      summary,
      funding,
      investors,
      rewards,
      tags,
      image,
      video
    })
    return res.json(product)
  })
)

export default router