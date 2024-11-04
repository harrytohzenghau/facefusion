import Card from "../../UI/Card";
import Usage from "./Usage";
import AvailablePlan from "./AvailablePlan";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPlanUsageDetails } from "../../../services/UserService";
import toast from "react-hot-toast";

const PlanCard = () => {
  const user = useSelector((state) => state.auth.user);
  const [planDetails, setPlanDetails] = useState();
  const [showAvailablePlan, setShowAvailablePlan] = useState(false);

  const toggleShowAvailablePlan = () => {
    setShowAvailablePlan((prevState) => !prevState);
  };

  const getUserPlanUsageDetails = async () => {
    try {
      const response = await getPlanUsageDetails(user.id);
      setPlanDetails(response.data);
    } catch (error) {
      return toast.error("Something went wrong when fetching user plan data");
    }
  };

  useEffect(() => {
    getUserPlanUsageDetails();
  }, []);

  return (
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg max-lg:w-full">
      <h1 className="font-bold text-xl">Plan & Billing</h1>
      <p>Manage your plan and payments</p>
      <hr />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Current Plan</h2>
        <button
          onClick={toggleShowAvailablePlan}
          className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
        >
          {showAvailablePlan ? "Back" : "Manage Plan"}
        </button>
      </div>
      <div className="flex gap-x-4">
        <Card additionalClassName="w-1/2 flex mx-0 flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <h3>Monthly Plan</h3>
          <h2 className="text-xl font-bold">
            ${user.role === "Premium" ? "5" : "0"}.00 / month
          </h2>
        </Card>
        {planDetails && (
          <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
            <h3>Renew At</h3>
            <h2 className="text-xl font-bold">
              {planDetails.end_date &&
                `${new Date(planDetails.end_date).getUTCDate()} ${new Date(
                  planDetails.end_date
                ).toLocaleString("default", {
                  month: "short",
                })} ${new Date(planDetails.end_date).getUTCFullYear()}`}
            </h2>
          </Card>
        )}
      </div>
      {!showAvailablePlan && <Usage />}
      {showAvailablePlan && <AvailablePlan planDetails={planDetails} />}
    </Card>
  );
};

export default PlanCard;
