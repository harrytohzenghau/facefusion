import { useContext, useState } from "react";
import Upload from "../../components/Dashboard/CreateVideo/Upload";
import Download from "../../components/Dashboard/CreateVideo/Download";
import { useSelector } from "react-redux";
import { generateExpression } from "../../services/AnimationService";
import { LoadingContext } from "../../context/LoadingContext";
import toast from 'react-hot-toast'; 

const CreateVideo = () => {
  const user = useSelector((state) => state.auth.user);
  const [video, setVideo] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  const generateVideoHandler = async (image, expression, inputText, audio) => {
    // Check for user role
    if (user.role === "Free" || user.role === "Premium") {
      try {
        setIsLoading(true);  // Start the loading state
  
        // Call the backend service to generate the video
        const response = await generateExpression(image, expression);
  
        // Check if the video URL exists in the response
        if (response.success && response.data.videoS3Url) {
          setVideo(response.data.videoS3Url);  // Set the video URL in state
        } else {
          console.error("Failed to generate video. Response:", response);
          toast.error("Video generation failed.");
        }
  
      } catch (error) {
        console.error("Error generating video:", error);
        toast.error("An error occurred while generating the video.");
      } finally {
        setIsLoading(false);  // Stop the loading state
      }
    } else {
      console.error("Invalid user role:", user.role);
      toast.error("Unauthorized user role.");
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
