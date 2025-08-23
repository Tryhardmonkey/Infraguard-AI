export default function Progress({ value }) {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full">
      <div
        className="h-3 bg-green-500 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
