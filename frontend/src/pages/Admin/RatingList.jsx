import { useEffect, useState } from "react";
import RatingTable from "../../components/Admin/RatingTable";
import Card from "../../components/UI/Card";
import { deleteRating, getAllRatings } from "../../services/AdminService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RatingList = () => {
  const [allRatings, setAllRatings] = useState([]);
  const [allPublishedRatings, setAllPublishedRatings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await getAllRatings();

        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        console.log(response.data);

        let ratingList = [];
        let publishedRatingList = [];

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].is_published) {
            publishedRatingList.push(response.data[i]);
          } else {
            ratingList.push(response.data[i]);
          }
        }
        setAllRatings(ratingList);
        setAllPublishedRatings(publishedRatingList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRatings();
  }, []);

  const viewRatingHandler = async (ratingId) => {
    navigate(`/admin/rating/${ratingId}`);
  };

  const deleteRatingHandler = async (ratingId) => {
    try {
      const response = await deleteRating(ratingId);

      if (response.success) {
        const updatedOtherRating = allRatings.filter((rating) => rating._id !== ratingId);
        const updatedPublishedRating = allPublishedRatings.filter((rating) => rating._id !== ratingId);

        setAllRatings(updatedOtherRating);
        setAllPublishedRatings(updatedPublishedRating);

        toast.success("Rating has been deleted");
        navigate("/admin/rating");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
        <RatingTable
          title="Published Rating"
          allRatings={allPublishedRatings}
        />
      </Card>
      <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
        <RatingTable
          title="Other Rating"
          allRatings={allRatings}
          viewRatingHandler={viewRatingHandler}
          deleteRatingHandler={deleteRatingHandler}
        />
      </Card>
    </>
  );
};

export default RatingList;
