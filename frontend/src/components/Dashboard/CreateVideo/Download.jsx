const Download = ({ video }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = video;
    link.download = "video.mp4"; // Set a default file name for download
    link.click();
  };

  const handleDelete = () => {}

  return (
    <div className="flex gap-x-6 items-start">
      <div className="w-1/5">
        <video className="w-full my-0 mx-auto" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-2/5 flex flex-col gap-y-4">
        <button
          className="bg-blue-1 w-2/5 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          type="button"
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          className="bg-red-50 w-2/5 text-white py-2 rounded-lg hover:bg-red-400 transform transition-all duration-200 ease-in-out"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Download;
