import Card from "../Card";
import upload_image from "../../assets/upload_image.jpg";
import upload_audio from "../../assets/upload_audio.jpg";
import download_video from "../../assets/download.jpg";

const Steps = () => {
  return (
    <div className=" w-full bg-gradient-to-r from-white to-blue-9">
      <Card additionalClassName="flex flex-col gap-y-8">
        <h5 className="w-full text-center text-2xl font-bold">
          Three Simple Steps to Generate Animated Video
        </h5>
        <div className="flex gap-x-6 justify-between">
          <Card additionalClassName="flex flex-col gap-y-6 justify-between bg-white rounded-md px-6 drop-shadow-lg hover:drop-shadow-xl hover:scale-105 transform transition-all duration-200 ease-in-out">
            <img
              src={upload_image}
              alt="Upload audio image"
              className="max-w-[70%] m-auto"
            />
            <div className="flex">
              <span>1.</span> &nbsp; <p>Upload a portrait image</p>
            </div>
          </Card>
          <Card additionalClassName="flex flex-col gap-y-6 justify-between bg-white rounded-md px-6 drop-shadow-lg hover:drop-shadow-xl hover:scale-105 transform transition-all duration-200 ease-in-out">
            <img
              src={upload_audio}
              alt="Upload audio image"
              className="max-w-[70%] m-auto"
            />
            <div className="flex">
              <span>2.</span> &nbsp; <p>Upload an audio file (optional)</p>
            </div>
          </Card>
          <Card additionalClassName="flex flex-col gap-y-6 justify-between bg-white rounded-md px-6 drop-shadow-lg hover:drop-shadow-xl hover:scale-105 transform transition-all duration-200 ease-in-out">
            <img
              src={download_video}
              alt="Download video image"
              className="max-w-[70%] m-auto"
            />
            <div className="flex">
              <span>3.</span> &nbsp;
              <p>Generate animated clip and download it</p>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Steps;
