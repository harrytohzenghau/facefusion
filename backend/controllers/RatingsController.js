const Ratings = require("../models/Ratings");

class RatingsController {
  // Method to fetch all ratings
  async getAllRatings(req, res) {
    try {
      const ratings = await Ratings.find().populate(
        "user_id",
        "username email"
      );
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Method to fetch ratings by user ID
  async getRatingsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const ratings = await Ratings.find({ user_id: userId }).populate(
        "user_id",
        "username email"
      );
      if (!ratings.length) {
        return res
          .status(404)
          .json({ message: "No ratings found for this user." });
      }
      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRatingByRatingId(req, res) {
    try {
      const { ratingId } = req.params;
      const rating = await Ratings.findById(ratingId).populate("user_id");

      if (!rating) {
        return res
          .status(404)
          .json({ message: "No ratings with the associate ID is found." });
      }

      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  // Method to post a rating for a video
  async postRating(req, res) {
    try {
      const { user_id, name, rating, occupation, company_name, feedback } =
        req.body;

      // Validate the rating value
      if (rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be between 1 and 5." });
      }

      // Create a new rating entry
      const newRating = new Ratings({
        user_id,
        name,
        rating,
        occupation,
        company_name,
        feedback,
        created_at: new Date(),
      });

      await newRating.save();
      res
        .status(201)
        .json({ message: "Rating submitted successfully", rating: newRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRatingStatus(req, res) {
    try {
      const { ratingId } = req.params;
      const rating = await Ratings.findById(ratingId);
  
      if (!rating) {
        return res
          .status(404)
          .json({ message: "No ratings with the associated ID are found." });
      }
  
      // If the current rating is unpublished and we are trying to publish it
      if (!rating.is_published) {
        // Count the number of published ratings
        const publishedCount = await Ratings.countDocuments({ is_published: true });
  
        // If there are already 3 published ratings, do not allow more to be published
        if (publishedCount >= 3) {
          return res
            .status(400)
            .json({ message: "Cannot publish more than 3 ratings." });
        }
      }
  
      // Toggle the is_published status
      rating.is_published = !rating.is_published;
  
      // Save the updated rating
      await rating.save();
  
      return res.status(200).json({
        message: `Rating ${
          rating.is_published ? "published" : "unpublished"
        } successfully.`,
        rating,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  

  async getPublishedRating(req, res) {
    try {
      const ratings = await Ratings.find({ is_published: true }).populate(
        "user_id"
      );

      res.status(200).json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Method to update a rating
  async updateRating(req, res) {
    try {
      const { rating, feedback } = req.body;
      const { ratingId } = req.params;

      if (rating && (rating < 1 || rating > 5)) {
        return res
          .status(400)
          .json({ message: "Rating must be between 1 and 5." });
      }

      const updatedRating = await Ratings.findByIdAndUpdate(
        ratingId,
        { rating, feedback },
        { new: true }
      );

      if (!updatedRating) {
        return res.status(404).json({ message: "Rating not found." });
      }

      res.status(200).json({
        message: "Rating updated successfully",
        rating: updatedRating,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Method to delete a rating
  async deleteRating(req, res) {
    try {
      const { ratingId } = req.params;
      const deletedRating = await Ratings.findByIdAndDelete(ratingId);

      if (!deletedRating) {
        return res.status(404).json({ message: "Rating not found." });
      }

      res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RatingsController();
