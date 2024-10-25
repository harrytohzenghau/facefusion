const Download = ({ video }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = video;
    link.download = "video.mp4"; // Set a default file name for download
    link.click();
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <video className="w-3/5 my-0 mx-auto" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <button
        className="bg-blue-1 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
        type="button"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default Download;
