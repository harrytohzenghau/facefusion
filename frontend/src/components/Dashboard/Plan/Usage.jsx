import Card from "../../UI/Card";
import { FaVideo } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

const Usage = () => {
  return (
    <div className="flex flex-col justify-between gap-y-4 mt-4">
      <h2 className="text-xl font-bold">Usage</h2>
      <div className="flex gap-x-4 justify-between">
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <FaVideo size={32} />
          <h3>Videos Generate</h3>
          <h2 className="text-xl font-bold">3</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-blue-9">
            <div
              className="bg-blue-4 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <FaDownload size={32} />
          <h3>Videos Download</h3>
          <h2 className="text-xl font-bold">2</h2>
        </Card>
      </div>
    </div>
  );
};

export default Usage;
