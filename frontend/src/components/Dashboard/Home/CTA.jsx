import Card from "../../UI/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card additionalClassName="flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
      <h5 className="text-xl text-center font-bold">
        Create your own video now
      </h5>
      <Link
        to="/user/create"
        className="w-1/3 mx-auto text-base text-white text-center bg-blue-2 px-3 py-2 rounded-full hover:bg-blue-3 transform transition-all duration-200 ease-in-out"
      >
        Start
      </Link>
    </Card>
  );
};

export default Home;
