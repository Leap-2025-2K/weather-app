import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState({});
  const [searchValue, setSearchValue] = useState("Tokyo");
  const [cities, setCities] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=899d9c2c0f5845838dc70138240912&q=${searchValue}`
      );
      const data = await response.json();

      setWeather(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const data = await response.json();

      setCities(data.data);
    } catch (error) {
      setError("No location found");
    }
  };

  useEffect(() => {
    getCities();
    getWeather();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);

    const citiesAndCountry = cities.flatMap((country) =>
      country.cities.map((city) => `${city}, ${country.country}`)
    );

    const city = citiesAndCountry
      ?.filter((item) =>
        item.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      .slice(0, 4);

    setFilteredCity(city);
  };

  return (
    <div className=" flex flex-col gap-6 justify-center items-center">
      <div>
        <SearchBar
          handleChange={handleChange}
          searchValue={searchValue}
          filteredCity={filteredCity}
          setSearchValue={setSearchValue}
          getWeather={getWeather}
        />
      </div>
      {error && <div>{error}</div>}
      <p>city: {weather.location?.name}</p>
      <p>date: {weather.forecast?.forecastday[0].date}</p>
      <p>temp: {weather.forecast?.forecastday[0].day.maxtemp_c}</p>
    </div>
  );
}
