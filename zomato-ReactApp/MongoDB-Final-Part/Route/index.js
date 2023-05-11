const express = require ("express");

const locationController = require("../Controllers/location");
const restaurantController = require("../Controllers/restaurant");
const mealtypeController = require("../Controllers/mealtype");
const userController = require("../Controllers/user");
const menucontroller = require("../Controllers/menu");


const route = express.Router();

route.get('/location', locationController.getLocations);
route.get('/restaurant/:locId', restaurantController.RestaurantsByLocationId);
route.get('/restaurants/:Id', restaurantController.RestaurantsById);
route.get('/mealtype', mealtypeController.getMealtype);
route.post('/singup', userController.postSingup);
route.post('/login', userController.postLogin);
route.post('/filter', restaurantController.postFilterRestaurant);
route.get('/menu/:resId', menucontroller.getMenuByResId);




module.exports = route;