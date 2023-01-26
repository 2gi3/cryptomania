interface GJNumberLabel {
  data: [string, number];
}

function GJNumberLabel({ data }: GJNumberLabel) {
  return (
    <div>
      {/* without interpolation the browser gives an error but not typescript */}
      <div>{`${data[1]}`}</div>
      <div>{data[0]}</div>
    </div>
  );
}

export default GJNumberLabel;
