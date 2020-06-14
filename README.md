# Black Plum Store Frontend

This React.js project creates the 'Black Plum Apparel' t-shirt store user interface.

### Purpose

Allow users to:
  * Browse t-shirt catalog and inspect items
  * Select size, color, and quantity of items
  * Add items to shopping cart
  * Checkout (review/edit shopping cart, add payment and shipping info, submit order)
  * View 'About Us', 'Contact Us', 'Return/Refund Policy', 'Shipping FAQ', 'Order Status', 'Privacy Policy', and 'Terms & Conditions' pages

### Getting started

This project requires node and the npm package manager to be installed on the command line.

**Clone the project**
   * git clone https://github.com/ramirezchristopher/blackplum_tshirt_store_frontend.git

**Install package dependencies**
  1. cd <PATH_TO_PROJECT>/blackplum_tshirt_store_frontend/
  2. npm install


### METHOD 1: Running with npm

  1. cd <PATH_TO_PROJECT>/blackplum_tshirt_store_frontend/
  2. npm start


### METHOD 2: Running with Docker

This project has different Dockerfiles for production and develop environments.
The file named 'Dockerfile' refers to production and the file named 'Dockerfile-develop' refers to develop.
The difference is that develop runs on a React development server and production runs on an nginx server.

**Build Image**
  1. cd <PATH_TO_PROJECT>/blackplum_tshirt_store_frontend/
  2. sudo docker build -f Dockerfile-develop -t blackplum_frontend .

**Running Container**
  * sudo docker run -it -p 3000:3000 --rm blackplum_frontend (develop)
  * sudo docker run -it -p 80:80 --rm blackplum_frontend (production)

**Stopping Container**
  * sudo docker container stop <container id>

**Deleting Image**
  * sudo docker image rm blackplum_frontend


### Accessing the user interface

  * Develop environment: [http://localhost:3000/](http://localhost:3000/)
  * Production environment: [http://localhost:80/](http://localhost:80/)
