import Card from "../../UI/Card";
import Usage from "./Usage";
import AvailablePlan from "./AvailablePlan";
import { useState } from "react";

const PlanCard = () => {
  const [showAvailablePlan, setShowAvailablePlan] = useState(false);

  const toggleShowAvailablePlan = () => {
    setShowAvailablePlan((prevState) => !prevState);
  };

  return (
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
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
      <div className="flex gap-x-4 justify-between">
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <h3>Monthly Plan</h3>
          <h2 className="text-xl font-bold">$0.00/month</h2>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <h3>Renew At</h3>
          <h2 className="text-xl font-bold">31st October</h2>
        </Card>
      </div>
      {!showAvailablePlan && <Usage />}
      {showAvailablePlan && <AvailablePlan />}
    </Card>
  );
};

export default PlanCard;
