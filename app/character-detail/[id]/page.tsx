"use client";
import Image from "next/image";
import { Button, Input, Link, Snippet } from "@nextui-org/react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { useQuery, gql, ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

import { Character } from "@/types";
export const dynamic = "force-dynamic";

interface Response {
  character: Character;
}

export default function DetailPage({ params }: { params: { id: number } }) {
  const Detail_Query = gql`
    query {
      character(id: ${params.id}) {
        id
        name
        status
        species
        gender
        image
        location {
          name
        }
      }
    }
  `;

  const {
    loading,
    error,
    data,
  }: { loading: boolean; error?: ApolloError; data?: Response } =
    useQuery(Detail_Query);

  const character = data?.character;

  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const storedCharactersString = localStorage.getItem("characters");
    const storedCharacters = storedCharactersString
      ? (JSON.parse(storedCharactersString) as Record<string, Character[]>)
      : {};

    for (const [loc, characters] of Object.entries<Character[]>(
      storedCharacters
    )) {
      const characterFound = characters.find((char) => char.id === params.id);

      if (characterFound) {
        setLocation(loc);
        break;
      }
    }
  }, [params.id]);

  const handleAssign = () => {
    if (!newLocation) return;

    const storedLocationsString = localStorage.getItem("locations");
    const storedLocations = storedLocationsString
      ? JSON.parse(storedLocationsString)
      : [];
    const storedCharactersString = localStorage.getItem("characters");
    const storedCharacters: Record<string, Character[]> = storedCharactersString
      ? JSON.parse(storedCharactersString)
      : {};

    for (const [loc, characters] of Object.entries(storedCharacters)) {
      const characterIndex = characters.findIndex(
        (char) => char.id === params.id
      );

      if (characterIndex !== -1) {
        characters.splice(characterIndex, 1);
        if (characters.length === 0) {
          delete storedCharacters[loc];
        }
      }
    }

    if (!storedLocations.includes(newLocation)) {
      storedLocations.push(newLocation);
    }

    if (!storedCharacters[newLocation]) {
      storedCharacters[newLocation] = [];
    }
    if (data && data.character) {
      storedCharacters[newLocation].push(data.character);
    }
    localStorage.setItem("locations", JSON.stringify(storedLocations));
    localStorage.setItem("characters", JSON.stringify(storedCharacters));

    setLocation(newLocation);
    setNewLocation("");
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data)
    return <p>Error: {error ? error.message : "Data not available"}</p>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Character Detail</h1>
        <Snippet
          hideSymbol
          classNames={{
            content: "font-semibold",
          }}
          codeString={`https://rickandmortyapi.com/api/character/${character?.id}`}
          color="primary"
          size="sm"
          variant="solid"
        >
          Share Character API
        </Snippet>
      </div>
      <div className="flex flex-col w-full gap-4 px-4 py-6 mt-4 border border-gray-200 rounded-lg shadow-sm ">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 w-48 h-48">
            <Image
              alt="character-image"
              className="object-cover object-center w-48 h-48 rounded-md"
              height={0}
              sizes="100vw"
              src={character?.image ?? ""}
              width={0}
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <h1 className="text-sm">
                <Link
                  className="font-medium text-gray-700 hover:text-gray-800 dark:text-white"
                  href={`/details/${character?.id}`}
                >
                  {character?.name}
                </Link>
              </h1>
              <h1 className="text-sm tracking-widest text-gray-500 dark:text-white">
                {character?.species}
              </h1>
            </div>
            <div className="  p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500 ">
              {character?.gender === "Male" ? (
                <BsGenderMale />
              ) : (
                <BsGenderFemale />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-2 border-t border-gray-200 border-bg-gray-300">
          <div className="flex items-center justify-between text-sm">
            <h1>Location</h1>
            <div className="flex gap-2">
              <p className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5">
                {character?.location?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <h1>Status</h1>
            <p className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5 font-medium">
              {character?.status}
            </p>
          </div>
        </div>
        <div className="flex  gap-2">
          <Input
            label="Enter Location"
            size="sm"
            type="text"
            value={newLocation}
            variant="bordered"
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <Button
            className="w-full text-sm font-semibold"
            endContent={<IoIosAddCircleOutline />}
            radius="sm"
            size="lg"
            onClick={handleAssign}
            color="primary"
            variant="bordered"
          >
            Assign to Location
          </Button>
        </div>
      </div>
    </div>
  );
}
