import { useContext, useState } from "react";
import Upload from "../../components/Dashboard/CreateVideo/Upload";
import Download from "../../components/Dashboard/CreateVideo/Download";
import { useSelector } from "react-redux";
import { generateExpression } from "../../services/AnimationService";
import { LoadingContext } from "../../context/LoadingContext";

const CreateVideo = () => {
  const user = useSelector((state) => state.auth.user);
  const [video, setVideo] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  const generateVideoHandler = async (image, expression, inputText, audio) => {
    if (user.role === "Free") {
      try {
        setIsLoading(true);
        const response = await generateExpression(image, expression);
        setVideo(response.data.videoUrl);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    if (user.role === "Premium") {
      try {
        setIsLoading(true);
        const response = await generateExpression(image, expression);
        setVideo(response.data.videoUrl);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-y-10">
      <h1 className="font-bold text-xl">Create Video</h1>
      <Upload generateVideoHandler={(user.role, generateVideoHandler)} />
      {video && <Download video={video} />}
    </div>
  );
};

export default CreateVideo;
