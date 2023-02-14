// @ts-nocheck
interface GJNumberLabel {
  data: [string, number]
}

function GJNumberLabel({ data }: GJNumberLabel) {
  return (
    <div className="flex w-56 justify-between  m-1 bg-green-300">
      <div>{data[0]}</div>
      <div>{`${data[1].toFixed(4)}`}</div>
    </div>
  )
}

export default GJNumberLabel
