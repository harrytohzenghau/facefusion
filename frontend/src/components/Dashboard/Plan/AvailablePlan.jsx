import { useDispatch, useSelector } from "react-redux";
import {
  cancelSubscription,
  subscribePlan,
} from "../../../services/UserService";
import Card from "../../UI/Card";
import { CheckIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updatePlan } from "../../../store/authSlice";

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

const AvailablePlan = ({ planDetails }) => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unsubscribePlanHandler = async () => {
    try {
      await cancelSubscription(planDetails.subscription_id);
      if (user.role === "Free") {
        dispatch(
          updatePlan({
            user: { ...user, role: "Premium" },
          })
        );
      } else {
        dispatch(
          updatePlan({
            user: { ...user, role: "Free" },
          })
        );
      }
      toast.success("You have cancelled the plan successfully!");
      navigate("/user/plan");
    } catch (error) {
      toast.error("Something went wrong while trying to unsubscribe a plan!");
    }
  };

  const subscribePlanHandler = async (stripe_customer_id) => {
    try {
      await subscribePlan(stripe_customer_id);
      if (user.role === "Free") {
        dispatch(
          updatePlan({
            user: { ...user, role: "Premium" },
          })
        );
      } else {
        dispatch(
          updatePlan({
            user: { ...user, role: "Free" },
          })
        );
      }

      navigate("/user/plan");
    } catch (error) {
      toast.error("Something went wrong while trying to subscribe to a plan!");
    }
  };

  return (
    <div className="flex flex-col justify-between gap-y-4 mt-4">
      <h2 className="text-xl font-bold">Available Plan</h2>
      <Card additionalClassName="w-full flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
        <h3 className="text-lg font-bold">
          {user.role === "Premium" ? "Fusion Free" : "Fusion Pro"}
        </h3>
        <p>
          {user.role === "Premium"
            ? "Get Started for Free: Transform your images into lifelike talking head videos at No Cost! Perfect for testing the waters or small projects, our free plan offers everything you need to bring your ideas to life."
            : "Upgrade to Pro: Unlock the Full Potential of AI Video Creation! With our Pro Plan, you gain access to advanced features, higher resolution downloads, faster processing, and premium support. Perfect for professionals and businesses, this plan empowers you to create stunning, lifelike videos that stand out—taking your content to the next level."}
        </p>
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
        >
          {user.role === "Premium"
            ? freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-blue-2"
                  />
                  {feature}
                </li>
              ))
            : proFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-blue-2"
                  />
                  {feature}
                </li>
              ))}
        </ul>
        <button
          type="button"
          onClick={
            user.role === "Premium"
              ? () => unsubscribePlanHandler(user.stripe_customer_id)
              : () => subscribePlanHandler(user.stripe_customer_id)
          }
          className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
        >
          {user.role === "Premium" ? "Change" : "Subscribe"}
        </button>
      </Card>
    </div>
  );
};

export default AvailablePlan;
