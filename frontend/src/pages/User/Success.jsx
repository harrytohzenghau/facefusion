import { useEffect } from "react";
import SuccessCard from "../../components/Dashboard/Plan/SuccessCard";
import { useDispatch, useSelector } from "react-redux";
import { updatePlan } from "../../store/authSlice";

const Success = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role === "Free") {
      dispatch(
        updatePlan({
          user: { ...user, role: "Premium" }, // Update to Premium only after successful checkout
        })
      );
    }
  }, [user]);

  return (
    <div className="mt-3 flex flex-col gap-y-10">
      <SuccessCard />
    </div>
  );
};

export default Success;
