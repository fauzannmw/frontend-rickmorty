"use client";
import { useQuery, gql, ApolloError } from "@apollo/client";

import { Card } from "@/components/card";

import { Character } from "@/types";

const Character_Query = gql`
  query {
    characters {
      results {
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
  }
`;

interface Response {
  characters: { results: Character[] };
}

export default function Home() {
  const {
    loading,
    error,
    data,
  }: { loading: boolean; error?: ApolloError; data?: Response } =
    useQuery(Character_Query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Rick and Morty Character</h1>
      <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {data?.characters.results.map((character: Character) => (
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
  );
}
