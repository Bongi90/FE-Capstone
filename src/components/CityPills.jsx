export default function CityPills({ cities, onPick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          className="px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 text-sm"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
