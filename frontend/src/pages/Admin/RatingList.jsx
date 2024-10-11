import RatingTable from "../../components/Admin/RatingTable";
import Card from "../../components/UI/Card";

const RatingList = () => {
  return (
    <>
      <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
        <RatingTable title="Published Rating" />
      </Card>
      <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
        <RatingTable title="Other Rating" />
      </Card>
    </>
  );
};

export default RatingList;
