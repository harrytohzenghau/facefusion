import { useState } from "react";
import Upload from "../../components/Dashboard/CreateVideo/Upload";
import Download from "../../components/Dashboard/CreateVideo/Download";
import { useSelector } from "react-redux";
import { generateExpression } from "../../services/AnimationService";

const CreateVideo = () => {
  const user = useSelector((state) => state.auth.user);
  const [video, setVideo] = useState(null);

  const generateVideoHandler = async (image, expression, inputText, audio) => {
    if (user.role === "Free") {
      try {
        const response = await generateExpression(image, expression);
        setVideo(response.data.videoUrl);
      } catch (error) {
        console.log(error);
      }
    }

    if (user.role === "Premium") {
      try {
        const response = await generateExpression(image, expression);
        setVideo(response.data.videoUrl);
      } catch (error) {
        console.log(error);
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
