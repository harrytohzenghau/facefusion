import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import logo from "../../../assets/facefusion_logo.png";

const SuccessCard = () => {
  return (
    <Card additionalClassName="max-w-2xl flex flex-col gap-y-6 items-start px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <img src={logo} alt="FaceFusion" className="h-20 w-auto" />
      <h1 className="font-bold text-xl">Thanks for your review</h1>
      <p>Sign Up successfully!</p>
      <div className="flex ml-auto justify-end mt-4 gap-x-4">
        <Link
          to="/user"
          className="bg-blue-7 px-4 py-2 rounded-lg hover:bg-blue-6 transform transition-all duration-200 ease-in-out"
        >
          Back
        </Link>
      </div>
    </Card>
  );
};

export default SuccessCard;
