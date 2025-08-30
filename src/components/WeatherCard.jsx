import React from "react";
import { getWeatherIcon } from "../utils/weatherCodes";

export default function WeatherCard({ weatherData, place }) {
  if (!weatherData || !weatherData.current) return null;
  const { current, humidity } = weatherData;
  const temp = Math.round(current.temperature);
  const wind = Math.round(current.windspeed);
  const { icon, desc } = getWeatherIcon(current.weathercode);

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-800/40 to-slate-700/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{place?.name ?? "Unknown"}</h2>
          <p className="text-sm text-slate-400">{place?.admin1}, {place?.country}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-5xl">{icon}</div>
          <div className="text-4xl font-bold">{temp}°C</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
          <div className="text-xs text-slate-400">Humidity</div>
          <div className="text-lg">{humidity ?? "—"}%</div>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
          <div className="text-xs text-slate-400">Wind</div>
          <div className="text-lg">{wind} km/h</div>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
          <div className="text-xs text-slate-400">Condition</div>
          <div className="text-lg">{desc}</div>
        </div>
      </div>
    </div>
  );
}
