const express = require('express');
const router = express.Router();

const CarListing = require('./schemas/CarListing');
const Sorter = require('./sorter');

// Sorted search
router.get('/year', Sorter.sortByYear);
router.get('/price', Sorter.sortByPrice);
router.get('/mileage', Sorter.sortByMileage);

module.exports = router;