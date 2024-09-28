import Card from "../../components/UI/Card";
import SampleVideos from "../../components/Sample/SampleVideos";
import SampleVideosAudio from "../../components/Sample/SampleVideosAudio";

const Sample = () => {
  return (
    <div className="bg-gradient-to-r from-blue-9 to-white">
      <Card>
        <SampleVideos />
        <SampleVideosAudio />
      </Card>
    </div>
  );
};

export default Sample;
