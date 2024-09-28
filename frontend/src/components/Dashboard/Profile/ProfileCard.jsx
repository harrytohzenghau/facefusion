import Card from "../../UI/Card";

const ProfileCard = () => {
  const updateProfileHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <h1 className="font-bold text-xl">Update Profile</h1>
      <form onSubmit={updateProfileHandler} className="flex flex-col gap-y-6">
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>First Name</label>
            <input
              type="text"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Last Name</label>
            <input
              type="text"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Username</label>
            <input
              type="text"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Email</label>
            <input
              type="email"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Phone Number</label>
            <input
              type="tel"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Password</label>
            <input
              type="password"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="bg-white p-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ProfileCard;
