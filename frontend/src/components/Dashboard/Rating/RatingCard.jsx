import { useState } from "react";
import Card from "../../UI/Card";
import { Link, useNavigate } from "react-router-dom";

const RatingCard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    companyName: "",
    comment: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, rating);
    navigate("/user/thanks")
  };

  return (
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <h1 className="font-bold text-xl">Rate our service</h1>
      <p>Let us know how satisfy you are with our service!</p>
      <hr />
      <div className="max-w-2xl mx-auto flex items-center gap-x-10 justify-center mb-4">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <svg
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  ratingValue <= (hover || rating)
                    ? "text-blue-2"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.958 0 1.355 1.23.588 1.791l-3.974 2.888 1.518 4.674c.3.921-.755 1.688-1.54 1.177l-3.974-2.888-3.974 2.888c-.784.511-1.84-.256-1.54-1.177l1.518-4.674-3.974-2.888c-.768-.56-.37-1.791.588-1.791h4.911L9.049 2.927z" />
              </svg>
            </label>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="occupation"
            className="block text-sm font-medium text-gray-700"
          >
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="flex ml-auto justify-end mt-8 gap-x-4">
          <button
            type="submit"
            className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          >
            Submit
          </button>
          <Link
            to="/user"
            className="bg-blue-7 px-4 py-2 rounded-lg hover:bg-blue-6 transform transition-all duration-200 ease-in-out"
          >
            Back
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default RatingCard;