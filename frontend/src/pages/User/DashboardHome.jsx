import CTA from "../../components/Dashboard/Home/CTA";
import RecentVideos from "../../components/Dashboard/Home/RecentVideos";
import Steps from "../../components/Dashboard/Home/Steps";

const Dashboard = () => {
  return (
    <div className="mt-3">
      <CTA />
      <Steps />
      <RecentVideos />
    </div>
  );
};

export default Dashboard;
