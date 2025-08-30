export function getWeatherIcon(code) {
  const map = {
    0: { icon: "☀️", desc: "Clear" },
    1: { icon: "🌤️", desc: "Mainly clear" },
    2: { icon: "⛅", desc: "Partly cloudy" },
    3: { icon: "☁️", desc: "Overcast" },
    45: { icon: "🌫️", desc: "Fog" },
    48: { icon: "🌫️", desc: "Rime fog" },
    51: { icon: "🌦️", desc: "Light drizzle" },
    53: { icon: "🌧️", desc: "Drizzle" },
    55: { icon: "🌧️", desc: "Heavy drizzle" },
    61: { icon: "🌦️", desc: "Light rain" },
    63: { icon: "🌧️", desc: "Rain" },
    65: { icon: "⛈️", desc: "Heavy rain" },
    71: { icon: "❄️", desc: "Snow" },
    73: { icon: "❄️", desc: "Snow" },
    80: { icon: "🌦️", desc: "Showers" },
    81: { icon: "🌧️", desc: "Showers" },
    95: { icon: "⛈️", desc: "Thunderstorm" },
    96: { icon: "⛈️", desc: "Thunderstorm + hail" },
  };
  return map[code] ?? { icon: "🌈", desc: "Weather" };
}
