import { useContext, useState } from "react";
import Generate from "../../components/Dashboard/CreateVideo/Generate";
import Download from "../../components/Dashboard/CreateVideo/Download";
import { useSelector } from "react-redux";
import {
  generateTextToSpeech,
  generateExpression,
  generateLipSync,
} from "../../services/AnimationService";
import { LoadingContext } from "../../context/LoadingContext";
import toast from "react-hot-toast";

const CreateVideo = () => {
  const user = useSelector((state) => state.auth.user);
  const [video, setVideo] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  const generateVideoHandler = async (
    image,
    expression,
    voiceType,
    inputText,
    audio
  ) => {
    // Check for user role
    if (user.role === "Free" || user.role === "Premium") {
      try {
        setIsLoading(true); // Start the loading state

        // generate audio first
        let generatedAudioUrl = audio; // If no input audio is provided, we'll use the generated one
        if (!audio && inputText) {
          const ttsResponse = await generateTextToSpeech(inputText, voiceType); // Call the new service

          if (ttsResponse.success) {
            generatedAudioUrl = ttsResponse.audioUrl; // Get the audio file URL from the service response
          } else {
            throw new Error("Text-to-speech generation failed.");
          }
        }

        console.log(image.file_s3_key);
        // Call the backend service to generate the video
        const expressionResponse = await generateExpression(
          image.file_s3_key,
          expression
        );

        // Check if the video URL exists in the response
        if (
          !expressionResponse.success ||
          !expressionResponse.data.videoS3Url
        ) {
          throw new Error("Failed to generate the expression video.");
        }
        const expressionVideoUrl = expressionResponse.data.videoS3Url;

        const lipSyncResponse = await generateLipSync(
          expressionVideoUrl,
          generatedAudioUrl
        ); // Use the service instead

        // Check if the lip-sync video URL exists in the response
        if (lipSyncResponse.success && lipSyncResponse.data.lipSyncVideoUrl) {
          setVideo(lipSyncResponse.data.lipSyncVideoUrl); // Set the lip-sync video URL in state
          toast.success("Video generated successfully!");
        } else {
          throw new Error("Failed to generate the lip-sync video.");
        }

        toast.success("Video generated successfully!");
      } catch (error) {
        console.error("Error generating video:", error);
        toast.error("An error occurred while generating the video.");
      } finally {
        setIsLoading(false); // Stop the loading state
      }
    } else {
      console.error("Invalid user role:", user.role);
      toast.error("Unauthorized user role.");
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-y-10">
      <h1 className="font-bold text-xl">Create Video</h1>
      <Generate generateVideoHandler={generateVideoHandler} />
      {video && <Download video={video} />}
    </div>
  );
};

export default CreateVideo;
