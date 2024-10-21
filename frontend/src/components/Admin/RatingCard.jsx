import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRating } from "../../services/AdminService";
import toast from "react-hot-toast";

const RatingCard = ({ ratingData }) => {
  const { id } = useParams();
  const [rating, setRating] = useState();
  const [isPublished, setIsPublished] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setRating(ratingData);
    setIsPublished(ratingData?.is_published);
  }, [ratingData]);

  const deleteRatingHandler = async () => {
    try {
      const response = await deleteRating(id);

      if (response.success) {
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
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <h1 className="font-bold text-xl">View Rating</h1>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Name</label>
            <input
              type="text"
              disabled
              defaultValue={rating && rating.name}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Name</label>
            <input
              type="text"
              disabled
              defaultValue={rating && rating.name}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Username</label>
            <input
              type="text"
              disabled
              defaultValue={rating && rating.name}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-y-4">
              <label>
                Status:{" "}
                <span className="font-bold">
                  {isPublished ? "Published" : "Not Published"}
                </span>
              </label>
              {/* <button
                type="button"
                onClick={toggleStatusHandler}
                className={`px-4 py-2 rounded-lg text-white ${
                  isActive
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } transform transition-all duration-200 ease-in-out`}
              >
                {isActive ? "Deactivate User" : "Activate User"}
              </button> */}
            </div>
          </div>
        </div>
        {/* <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={user && user.email}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Phone Number</label>
            <input
              type="tel"
              ref={phoneRef}
              required
              defaultValue={user && user.phone}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div> */}
        <div className="flex ml-auto mt-4 gap-x-4">
          <button
            type="submit"
            className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteRatingHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-7 px-4 py-2 rounded-lg hover:bg-blue-6 transform transition-all duration-200 ease-in-out"
          >
            Back
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RatingCard;
