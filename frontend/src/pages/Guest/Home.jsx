import { useEffect, useState } from "react";
import Banner from "../../components/Home/Banner";
import FAQs from "../../components/Home/FAQs";
import Feedback from "../../components/Home/Feedback";
import Introduction from "../../components/Home/Introduction";
import Steps from "../../components/Home/Steps";
import { getPublishedRating } from "../../services/UserService";
import toast from "react-hot-toast";

const Home = () => {
  const [publishedRatings, setPublishedRatings] = useState([]);

  useEffect(() => {
    const fetchPublishedRatings = async () => {
      try {
        const response = await getPublishedRating();

        if (!response.success) {
          return toast.error(
            "Something went wrong when fetching ratings data."
          );
        }

        let publishedRatingList = [];

        for (let i = 0; i < response.data.length; i++) {
          publishedRatingList.push(response.data[i]);
        }

        setPublishedRatings(publishedRatingList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPublishedRatings();
  }, []);
  return (
    <>
      <Banner />
      <Introduction />
      <Steps />
      <FAQs />
      <Feedback publishedRatings={publishedRatings} />
    </>
  );
};

export default Home;
