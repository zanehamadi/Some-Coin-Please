# Some Coin, Please

## What is Some Coin, Please?

SCP is a crowdfunding website that allows users to create an account, add money through the Stripe API, and fund products they feel passionate for. Users can see updates from these products displayed on their home page, and even post a product that they want to create.

## How to start the app on local

1. Clone the repository
2. Setup your database following credentials on PSQL
3. Migrate and seed the database(npx sequelize-cli db:migrate/db:seed:all)
4. Open two terminals, change directory to the 'backend' folder on one, and 'frontend' on the other.
5. 'npm install' in both backend and frontend terminals
6. 'npm start' in both backend and frontend terminals

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

## Architecture Pattern: MVC

MVC seemed like the perfect pattern to follow, as it flows extremely well and is inline with React/Redux's data flow. Consistently following core MVC principles also allowed for a clean state and DRY code. An easy way for me to understand these principles was to compare them with things I am familiar with,

Model = Redux Store
View = React
Controller = Reducers/Thunk


## REST API routes

### Stripe Handling
Stripe was definitely a lot easier to handle than expected, simply using a `POST` route to their build in method, users are able to make purchases through the website.

### Product Handling
For products, `GET`, `POST`, and `PUT` were all utilized for getting all products, creating a product, and updating a product.

### Update Handling
Updates used `GET`, `POST`, AND `PUT`. Since updates could not exist without a product, updates were primarly housed in the product state, however, the `GET` route was utilized to update the slice of state in case any changes were made. `POST` and `PUT` were utilized to create and update.

### Investments

Investments used all 4 CRUD functionalities -  `GET`, `POST`, `PUT`, and `DELETE`. I initially planned on creating a "followed" data table, but for the sake of time I chose to combine that with investments, using the investment table for both. I utilized  `GET` to load all investments made on the platform, `POST` to create an investment, `PUT` to update one(if a user wanted to invest more money into a product), and `DELETE` for if a user wanted to "unfollow" a product.

### User/Session

For users, I used all 4 CRUD functionalities -  `GET`, `POST`, `PUT`, and `DELETE`. `GET` to load all users and restore a user, `POST` to create and login users, `PUT` to update a user(primarily used to update a user's balance after depositing/withdrawing, and `DELETE` to delete a user.

## Challenges

Since this was the first time I used TypeScript, it definitely was a challenge to create a "purely" TypeScript based project. While React/Redux work phenomenally with TypeScript, Express/Sequelize was definitely a hurdle that took deep delving into research and documentation.

Deployment was definitely the most stressful part of the project, as I have little to work with when it came to error codes, spending a good amount of the tail end of my projects heavily reading into error codes and testing different methods. 

## Results

This project was an amazing learning opportunity for me, that will absolutely impact me as a developer. I am now going to utilize TypeScript on most projects, as it is the perfect net to catch any lingering errors that I would have trouble noticing without it. This was the first time I used MUI on a full-stack application, and will also be adding that to my go-to list, as the styling components are stunning. 



