// @ts-nocheck
interface GJNumberLabel {
  data: [string, number]
}

function GJNumberLabel({ data }: GJNumberLabel) {
  return (
    <div className="w-32 m-1 bg-green-300">
      {/* without interpolation the browser gives an error but not typescript */}
      <div>{data[0]}</div>
      <div>{`${data[1]}`}</div>
    </div>
  )
}

export default GJNumberLabel
