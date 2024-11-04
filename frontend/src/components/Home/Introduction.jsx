import Card from "../UI/Card";
import introduction from "../../assets/introduction.png";

const Introduction = () => {
  return (
    <Card additionalClassName="flex gap-x-6 max-md:flex-col max-md:gap-y-6">
      <div className="w-2/5 max-md:w-full">
        <img src={introduction} alt="Introduction image" />
      </div>
      <div className="w-3/5 pl-12 flex flex-col justify-center gap-y-6 max-md:w-full max-md:pl-0">
        <h3 className="font-bold text-2xl">What is FaceFusion</h3>
        <p className="font-bold text-md">
          We empower creators and businesses with cutting-edge AI technology,
          transforming static images into dynamic, lifelike talking head
          videos—perfect for engaging content, marketing, and beyond.
        </p>
      </div>
    </Card>
  );
};

export default Introduction;
