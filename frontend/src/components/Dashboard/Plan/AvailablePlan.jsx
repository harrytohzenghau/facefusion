import Card from "../../UI/Card";
import { CheckIcon } from "@heroicons/react/20/solid";

const freeFeatures = [
  "Up to 3 image uploads",
  "Generate animated video",
  "15-second video exports",
  "Up to 3 videos",
  "Downloads in standard SD resolution (1280 x 720)",
];

const proFeatures = [
  "Unlimited image uploads",
  "Audio upload (optional)",
  "Generate animated video",
  "Customisable video length",
  "Up to 10 videos",
  "Downloads in standard HD resolution (1920 x 1080)",
];

const AvailablePlan = () => {
  return (
    <div className="flex flex-col justify-between gap-y-4 mt-4">
      <h2 className="text-xl font-bold">Available Plan</h2>
      <Card additionalClassName="w-full flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
        <h3 className="text-lg font-bold">Fusion Pro</h3>
        <p>
          Upgrade to Pro: Unlock the Full Potential of AI Video Creation! With
          our Pro Plan, you gain access to advanced features, higher resolution
          downloads, faster processing, and premium support. Perfect for
          professionals and businesses, this plan empowers you to create
          stunning, lifelike videos that stand out—taking your content to the
          next level.
        </p>
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
        >
          {proFeatures.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon
                aria-hidden="true"
                className="h-6 w-5 flex-none text-blue-2"
              />
              {feature}
            </li>
          ))}
        </ul>
        <button className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out">
          Subscribe
        </button>
      </Card>
    </div>
  );
};

export default AvailablePlan;
