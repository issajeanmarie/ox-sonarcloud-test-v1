import Card from "antd/lib/card";

const TruckOverviewCard = ({ data }: any) => {
  return (
    <Card className="radius4">
      <span className="block mb-2 text_ellipsis" title={data?.name}>
        {data?.name}
      </span>

      <span className="text-2xl font-semibold block yellow">{data?.num}</span>
    </Card>
  );
};

export default TruckOverviewCard;
