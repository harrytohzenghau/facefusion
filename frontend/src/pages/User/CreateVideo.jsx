import { useState } from "react";
import Upload from "../../components/Dashboard/CreateVideo/Upload";
import Download from "../../components/Dashboard/CreateVideo/Download";

const CreateVideo = () => {
  const [video, setVideo] = useState("null");

  return (
    <div className="mt-3 flex flex-col gap-y-10">
      <h1 className="font-bold text-xl">Create Video</h1>
      <Upload />
      {video && <Download />}
    </div>
  );
};

export default CreateVideo;
