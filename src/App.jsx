import React, { useEffect, useState } from "react";
import { EASTERN_CAPE_CITIES } from "./data/easternCapeCities";
import { geocodeCity, getCurrentWeather } from "./api/openMeteo";
import CityPills from "./components/CityPills";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [query, setQuery] = useState("East London");
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function loadForCityName(name) {
    setLoading(true);
    setErr("");
    try {
      const p = await geocodeCity(name, "ZA");
      setPlace(p);
      const w = await getCurrentWeather(p.latitude, p.longitude);
      setWeather(w);
    } catch (e) {
      setErr(e.message || "Failed to load");
      setWeather(null);
      setPlace(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForCityName(query); 
  }, []);

  const onPick = (name) => {
    setQuery(name);
    loadForCityName(name);
  };

  const onSearch = (ev) => {
    ev.preventDefault();
    loadForCityName(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">WeatheR — Eastern Cape</h1>
      </header>

      <form onSubmit={onSearch} className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl bg-slate-800/80 px-4 py-3 outline-none"
          placeholder="Search location (e.g., Mthatha or Gqeberha)"
        />
        <button className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600">Search</button>
      </form>

      <p className="mb-2 text-slate-300 text-sm">Quick pick: major Eastern Cape cities</p>
      <div className="mb-6">
        <CityPills cities={EASTERN_CAPE_CITIES} onPick={onPick} />
      </div>

      {loading && <div className="rounded-xl p-6 bg-slate-800 animate-pulse">Loading weather…</div>}
      {err && <div className="rounded-xl p-6 bg-red-600/20 text-red-200">{err}</div>}

      {!loading && !err && weather && <WeatherCard weatherData={weather} place={place} />}

      <footer className="mt-8 text-xs text-slate-500">
        Data: Open-Meteo • No API key required.
      </footer>
    </div>
  );
}
