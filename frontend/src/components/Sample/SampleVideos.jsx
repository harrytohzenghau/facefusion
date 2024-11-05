import Card from "../UI/Card";
import video_1 from "../../assets/videos/video.mp4";

const SampleVideos = () => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-2xl">
        View Our Sample Videos in SD resolution
      </h3>
      <div className="flex gap-x-6 max-md:flex-col">
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
      </div>
      <h3 className="font-bold text-2xl">
        View Our Sample Videos in HD resolution
      </h3>
      <div className="flex gap-x-6 max-md:flex-col">
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
      </div>
    </div>
  );
};

export default SampleVideos;
