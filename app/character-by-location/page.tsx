"use client";

import { useState, useEffect } from "react";

import { Card } from "@/components/card";

import { Character } from "@/types";

type CharactersByLocation = {
  [key: string]: Character[];
};

const LocationsPage = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [charactersByLocation, setCharactersByLocation] =
    useState<CharactersByLocation>({});
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const storedLocations = localStorage.getItem("locations");
    const storedCharacters = localStorage.getItem("characters");

    if (storedLocations && storedCharacters) {
      setLocations(JSON.parse(storedLocations));
      setCharactersByLocation(JSON.parse(storedCharacters));
    }
    setIsDataLoaded(true);
  }, []);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const location = event.target.value;

    setSelectedLocation(location === "all" ? null : location);
  };

  const filteredCharacters = selectedLocation
    ? { [selectedLocation]: charactersByLocation[selectedLocation] || [] }
    : charactersByLocation;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Rick and Morty Character Filtered by Location
      </h1>
      <div className="mb-4">
        <select
          className=" border border-gray-300 text-sm rounded-lg w-full p-2.5"
          onChange={handleLocationChange}
        >
          <option value="all">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      {!isDataLoaded ? (
        <p>Loading...</p>
      ) : locations.length === 0 ? (
        <p>No locations available. Please add characters to locations.</p>
      ) : (
        <div>
          {Object.keys(filteredCharacters).map((location) => (
            <div key={location} className="flex flex-col gap-4">
              <p className="text-lg font-semibold">{location}</p>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredCharacters[location].map((character: Character) => (
                  <Card
                    key={character.id}
                    gender={character.gender}
                    id={character.id}
                    image={character.image}
                    location={character.location.name}
                    name={character.name}
                    species={character.species}
                    status={character.status}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
