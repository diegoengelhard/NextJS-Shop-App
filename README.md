## Next.js E-Commerce Shop App

### Description

This project is a __dockerized__ e-commerce platform built using Next.js with React.js. Using MongoDB for database management, and integrating Tailwind CSS and Styled Components styles. The platform is divided into two distinct parts: the __Admin dashboard__ and the __Client interface__.

#### Admin Features
- **Product Management:** Add, edit, and delete products with ease.
- **Category Management:** Create, edit, and delete product categories.
- **Order Visualization:** View and manage orders efficiently.
- **User Administration:** Control user roles, determining who has administrative privileges.

#### Client Features
- **Shopping Experience:** Users can add products to their cart.
- **Order Placement:** Create orders, ensuring transaction flow.
- **Product Filtering:** Filter products by category.
- **Account Management:** View order history.


### Getting Started

To get started with this project, follow these steps:

1. Clone the repository: 
```
git clone https://github.com/diegoengelhard/NextJS-Shop-App.git
```
2. Navigate into either project directory to run either project:
```
cd shop-app-admin
```
or 
```
cd shop-app-client
```
3. Copy .env.example in both projects and replace the environment variables for your own project

4. Run docker container on either project:
```
docker-compose up
```

5. Open http://localhost:3000 with your browser to see the result.


### Admin Dashboard
![Alt text](https://ibb.co/jMqnrn7)

### Client Homepage
![Alt text](https://ibb.co/6YyKy4k)
