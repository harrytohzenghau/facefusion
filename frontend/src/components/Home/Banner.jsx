import { Link } from "react-router-dom";
import banner_img from "../../assets/banner_img.png";
import Card from "../Card";

const Banner = () => {
  return (
    <header className="overflow-hidden relative flex w-full h-[50vh] bg-gradient-to-r from-blue-9 to-white">
      <Card additionalClassName="flex">
        <div className="relative flex items-center justify-start">
          <div className="w-[70%] max-w-6xl flex flex-col items-start gap-y-6">
            <h2 className="text-2xl font-bold">FaceFusion</h2>
            <h1 className="text-3xl font-bold">
              Bring Your Images to Life: Create Realistic Talking Head Videos
              with AI-Driven Facial Animation.
            </h1>
            <Link className="text-base text-white bg-blue-2 px-3 py-2 rounded-md hover:bg-blue-3 transform transition-all duration-200 ease-in-out">
              Explore Now
            </Link>
          </div>
        </div>
        <img
          src={banner_img}
          alt="Banner Image"
          className="absolute w-[40vw] right-0 bottom-0"
        />
      </Card>
    </header>
  );
};

export default Banner;
