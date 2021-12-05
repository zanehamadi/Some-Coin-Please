# Some Coin, Please

## What is Some Coin, Please?

SCP is a crowdfunding website that allows users to create an account, add money through the Stripe API, and fund products they feel passionate for. Users can see updates from these products displayed on their home page, and even post a product that they want to create.

## How to start the app on local

1. Clone the repository
2. Setup your database following credentials on PSQL
3. Migrate and seed the database(npx sequelize-cli db:migrate/db:seed:all)
4. Open two terminals, change directory to the 'backend' folder on one, and 'frontend' on the other.
5. 'npm start' in both backend and frontend terminals

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
- Swift
- Express
- Sequelize
- PSQL

## Reusable Component

### Update Modal

![update-preview](https://i.imgur.com/8X4tEpb.png)

Using dynamic rendering, I utilized the same modal for both creating an update and editing an update, depending on the props passed in.

## Architecture Pattern: MVC

MVC seemed like the perfect pattern to follow, as it flows extremely well and is inline with React/Redux's dataflow. Consistantly following core MVC principles also allowed for a clean state and DRY code.

##
