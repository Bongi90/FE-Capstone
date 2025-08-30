import axios from "axios";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function geocodeCity(city, country = "ZA") {
  const res = await axios.get(GEO_URL, {
    params: { name: city, country, count: 1 }
  });
  const place = res.data?.results?.[0];
  if (!place) throw new Error("City not found");
  return {
    name: place.name,
    latitude: place.latitude,
    longitude: place.longitude,
    admin1: place.admin1,
    country: place.country
  };
}


export async function getCurrentWeather(latitude, longitude) {
  const res = await axios.get(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      current_weather: true,
      hourly: "relativehumidity_2m",
      temperature_unit: "celsius",
      windspeed_unit: "kmh",
      timezone: "auto"
    }
  });

  const data = res.data;
  const current = data.current_weather;
  let humidity = null;

  if (data.hourly && data.hourly.time && data.hourly.relativehumidity_2m) {
    const idx = data.hourly.time.indexOf(current.time);
    if (idx !== -1) humidity = data.hourly.relativehumidity_2m[idx];
  }

  return { current, humidity, raw: data };
}
