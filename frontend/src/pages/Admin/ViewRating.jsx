import { useEffect, useState } from "react";
import RatingCard from "../../components/Admin/RatingCard";
import { getOneRating } from "../../services/AdminService";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../../components/UI/Card";

const ViewRating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getOneRating(id);

        if (!response.success) {
          return toast.error("Something went wrong when fetching rating data.");
        }

        setRating(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <Card additionalClassName="flex flex-col my-10 gap-y-6 px-6 py-6">
      <RatingCard ratingData={rating} />
    </Card>
  );
};

export default ViewRating;
