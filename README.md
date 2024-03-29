# Some Coin, Please


## What is Some Coin, Please?

SCP is a crowdfunding website that allows users to create an account, add money through the Stripe API, and fund products they feel passionate for. Users can see updates from these products displayed on their home page, and even post a product that they want to create.

## How to start the app on local

1. Clone the repository
2. Open a terminal and change directories to the "backend" folder
3. `npm install` install all packages
4. Setup your database following credentials on PSQL
5. Create a `.env` file in the backend folder that has: 
    - PORT={backend_port}
    - DB_USERNAME={database_username}
    - DB_PASSWORD={database_user_pass}
    - DB_DATABASE={name_of_database}
    - JWT_SECRET={JSON_web_token_secret_key}
    - JWT_EXPIRES_IT={JWT_expiration_time}
    - AWS_ACCESS_KEY_ID={aws_access_id}
    - AWS_SECRET_ACCESS_KEY={aws_secret_key}
    - STRIPE_KEY={stripe_test_key}(found here https://stripe.com/docs/api/charges)
6. Migrate and seed the database(run `npx sequelize-cli db:migrate` AND `npx sequelize-cli db:seed:all` in terminal)
7. Open another terminals, change directory to the frontend folder.
8. 'npm install' in the frontend folder
9. 'npm start' in both backend and frontend terminals

## Structure

TypeScript React/Redux Front-End

TypeScript Express/Sequelize Back-End

## Front-End Technologies/Languages:

- TypeScript
- React
- Redux
- MUI

## Back-End Technologies/Languages:

- TypeScript
- AWS
- Stripe
- Express
- Sequelize
- PSQL

## Reusable Component

### Update Modal

![update-preview](https://i.imgur.com/8X4tEpb.png)

Using dynamic rendering, I utilized the same modal for both creating an update and editing an update, depending on the props passed in.

## Architecture Pattern: MODEL-VIEW-CONTROLLER

MVC seemed like the perfect pattern to follow, as it flows extremely well and is inline with React/Redux's data flow. Consistently following core MVC principles also allowed for a clean state and DRY code. An easy way for me to understand these principles was to compare them with things I am familiar with,


Model = Redux Store

View = React

Controller = Reducers/Thunk


## REST API routes


### Third-Party APIs
Utilized `POST` for both Stripe and AWS.

![stripe-example](https://i.imgur.com/jHNOVqF.png)
![stripe-example2](https://i.imgur.com/7sdXNWA.png)


### Product Handling
For products, `GET`, `POST`, and `PUT` were all utilized for getting all products, creating a product, and updating a product.

![product-example](https://i.imgur.com/4NkXebf.png)
![product-example](https://i.imgur.com/msdNUWB.png)

### Update Handling
Updates used `GET`, `POST`, AND `PUT`. Since updates could not exist without a product, updates were primarly housed in the product state, however, the `GET` route was utilized to update the slice of state in case any changes were made. `POST` and `PUT` were utilized to create and update.

![update-example](https://i.imgur.com/kSyaLxp.png)
![update-example](https://i.imgur.com/lEtADVm.png)

### Investments

Investments used all 4 CRUD functionalities -  `GET`, `POST`, `PUT`, and `DELETE`. I initially planned on creating a "followed" data table, but for the sake of time I chose to combine that with investments, using the investment table for both. I utilized  `GET` to load all investments made on the platform, `POST` to create an investment, `PUT` to update one(if a user wanted to invest more money into a product), and `DELETE` for if a user wanted to "unfollow" a product.

![investment-example](https://i.imgur.com/sJCVXFZ.png)
![investment-example](https://i.imgur.com/J0FMrIb.png)

### User/Session

For users, I used all 4 CRUD functionalities -  `GET`, `POST`, `PUT`, and `DELETE`. `GET` to load all users and restore a user, `POST` to create and login users, `PUT` to update a user(primarily used to update a user's balance after depositing/withdrawing, and `DELETE` to delete a user.

![user-example](https://i.imgur.com/6XjJ6T1.png)
![user-example](https://i.imgur.com/I7AXboY.png)


## User Interactions

A user can:
- Create an account, and login/logout of said account
- Purchase coin through Stripe
- Invest in a product
- Unfollow a product
- Post a product
- Edit a product
- Post an update
- Edit an update
- Search for a product


## MUI Components Used:
-  Button (Utilized on: Home/Login/SignUp/Product/Product Form/Update/Edit Update)
-  Modal (Utilized on: Login/Signup/Edit Update/Purchase Coin/Fund Product)
-  Box (Utilized on: Coin Purchase/Home/Login/Nav/Product Form/Edit Form/Fund/Update/Search/Signup)
-  Input (Utilized on: Coin Purchase/Login/Product Form/Edit Form/Fund/Update/Search/Signup)
-  InputAdornment (Utilized on: Coin Purchase/Fund)
-  AttachMoneyIcon (Utilized on: Coin Purchase/Fund)
-  Snackbar (Utilized on: Coin Purchase/Home/Fund/Update)
-  Tab (Utilized on: Home/Product)
-  Tabs(Utilized on: Home/Product)
-  Card(CardActions, CardContent, CardMedia) (Utilized on: Home/Product/Product Form/Edit Form/Search)


## Challenges

Since this was the first time I used TypeScript, it definitely was a challenge to create a "purely" TypeScript based project. While React/Redux work phenomenally with TypeScript, Express/Sequelize was definitely a hurdle that took deep delving into research and documentation.

Deployment was definitely the most stressful part of the project, as I had little to work with when it came to error codes, spending a good amount of the tail end of my projects heavily researching and testing different methods. 

## Results

This project was an amazing learning opportunity for me that will absolutely impact me as a developer. I am now going to utilize TypeScript on most projects, as it is the perfect net to catch any lingering errors that I would have had trouble noticing. This was also the first time I used MUI on a full-stack application, and will also be adding that to my go-to list, as the styling components are stunning. 



