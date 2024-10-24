const express = require('express');
const router = express.Router();
const RatingsController = require('../controllers/RatingsController');

// Get all ratings
router.get('/', RatingsController.getAllRatings);

router.get("/published", RatingsController.getPublishedRating);

router.get("/:ratingId", RatingsController.getRatingByRatingId);

router.put("/update/:ratingId", RatingsController.updateRatingStatus);

// Get ratings by user ID
router.get('/user/:userId', RatingsController.getRatingsByUserId);

// Post a new rating
router.post('/', RatingsController.postRating);

// Update a rating by ID
router.put('/:ratingId', RatingsController.updateRating);

// Delete a rating by ID
router.delete('/:ratingId', RatingsController.deleteRating);

module.exports = router;
