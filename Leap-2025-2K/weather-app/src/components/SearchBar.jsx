import { Search } from "lucide-react";

export const SearchBar = ({
  searchValue,
  handleChange,
  filteredCity,
  setSearchValue,
  getWeather,
}) => {
  const changeWeather = (value) => {
    setSearchValue(value.split(",")[0]);
    getWeather();
  };

  return (
    <div className=" w-full -top-16 z-30">
      <div className="relative overflow-hidden rounded-full">
        <Search
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
          size={35}
        />
        <input
          type="text"
          value={searchValue}
          placeholder="search city ..."
          onChange={handleChange}
          className="w-full py-4 pl-20 pr-6 outline-none text-[32px] font-bold"
        />
      </div>
      <div>
        {filteredCity.map((city, index) => (
          <div key={index} onClick={() => changeWeather(city)}>
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};
