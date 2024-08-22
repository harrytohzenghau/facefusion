import Card from "../Card";
import video_1 from "../../assets/videos/video.mp4";

const SampleVideos = () => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-2xl">View Our Sample Videos</h3>
      <div className="flex gap-x-6">
        <Card>
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card>
          <video controls className="rounded-xl drop-shadow-xl">
            <source src={video_1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card>
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
