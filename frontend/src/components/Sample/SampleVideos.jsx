import Card from "../UI/Card";
import video_1_SD from "../../assets/videos/V01_SD.mp4";
import video_2_SD from "../../assets/videos/V02_SD.mp4";
import video_3_SD from "../../assets/videos/V03_SD.mp4";
import video_1_HD from "../../assets/videos/V01_HD.mp4";
import video_2_HD from "../../assets/videos/V02_HD.mp4";
import video_3_HD from "../../assets/videos/V03_HD.mp4";

const SampleVideos = () => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-2xl">
        View Our Sample Videos in SD resolution
      </h3>
      <div className="flex gap-x-6 max-md:flex-col">
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_1_SD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_2_SD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_3_SD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
      </div>
      <h3 className="font-bold text-2xl">
        View Our Sample Videos in HD resolution
      </h3>
      <div className="flex gap-x-6 max-md:flex-col">
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_1_HD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_2_HD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card additionalClassName="max-md:mx-0 max-md:w-full">
          <video controls className="w-full rounded-xl drop-shadow-xl">
            <source src={video_3_HD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
      </div>
    </div>
  );
};

export default SampleVideos;
