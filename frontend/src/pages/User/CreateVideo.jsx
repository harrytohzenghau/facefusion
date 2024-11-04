import { useContext, useState } from "react";
import Generate from "../../components/Dashboard/CreateVideo/Generate";
import Download from "../../components/Dashboard/CreateVideo/Download";
import {
  getImagesAndVideos,
  updateContentBank,
} from "../../services/AnimationService";
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
  const [contentId, setContentId] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  const generateVideoHandler = async (
    image,
    expression,
    voiceType,
    inputText,
    audio
  ) => {
    // Check for user role
    try {
      const response = await getImagesAndVideos(user.id);

      if (!response.success) {
        return toast.error("Something went wrong when fetching user data.");
      }

      const existingVideoList = response.data.content
        .map((content, index) => {
          if (content.file_type === "Video") {
            return {
              content,
              fileUrl: response.data.fileUrl[index],
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      if (
        (user.role === "Free" && existingVideoList.length >= 3) ||
        (user.role === "Premium" && existingVideoList.length >= 10)
      ) {
        return toast.error(
          "You had hit the video generate limit. Please remove some video before proceed!"
        );
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    if (user.role === "Free" || user.role === "Premium") {
      try {
        setIsLoading(true); // Start the loading state

        // generate audio first
        let generatedAudioUrl = audio; // If no input audio is provided, we'll use the generated one
        let audioType = "file"; // Use this to update type of audio in LipSync
        if (!audio && inputText) {
          const ttsResponse = await generateTextToSpeech(inputText, voiceType); // Call the new service

          if (ttsResponse.success) {
            generatedAudioUrl = ttsResponse.audioUrl; // Get the audio file URL from the service response
            audioType = "url";

            const s3BaseUrl =
              "https://prod-facefusion.s3.ap-southeast-2.amazonaws.com/";
            const fileName = "Generated Audio";
            const fileType = "Audio";
            const fileS3Key = generatedAudioUrl.replace(s3BaseUrl, ""); // URL from S3

            const result = await updateContentBank(
              fileName,
              fileType,
              fileS3Key
            );

            if (result.success) {
              console.log(
                "Content updated successfully in MongoDB:",
                result.data
              );
            } else {
              console.error(
                "Error updating content in MongoDB:",
                result.message
              );
            }
          } else {
            throw new Error("Text-to-speech generation failed.");
          }
        }

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
          generatedAudioUrl,
          audioType
        ); // Use the service instead

        // Check if the lip-sync video URL exists in the response
        if (lipSyncResponse.success && lipSyncResponse.data.lipSyncVideoUrl) {
          setVideo(lipSyncResponse.data.lipSyncVideoUrl); // Set the lip-sync video URL in state
          setContentId(lipSyncResponse.data.content_id);
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
      {video && <Download video={video} contentId={contentId} />}
    </div>
  );
};

export default CreateVideo;
