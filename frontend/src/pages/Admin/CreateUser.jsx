import NewProfileCard from "../../components/Admin/NewProfileCard";
import Card from "../../components/UI/Card";

const CreateUser = () => {
  return (
    <Card additionalClassName="flex flex-col my-10 gap-y-6 px-6 py-6">
      <NewProfileCard />
    </Card>
  );
};

export default CreateUser;
