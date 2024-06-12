"use client";
import React from "react";
import { Image } from "@nextui-org/image";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

import { Button, Link } from "@nextui-org/react";

export type CardProps = {
  id: number | undefined;
  name: string | undefined;
  species: string | undefined;
  image: string | undefined;
  gender: "Male" | "Female";
  status: string | undefined;
  location: string | undefined;
};

export const Card: React.FC<CardProps> = ({
  id,
  name,
  species,
  image,
  gender,
  status,
  location,
}) => {
  return (
    <div className="flex flex-col justify-between w-full gap-4 p-6 bg-white shadow-2xl rounded-xl bg-clip-border">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          {image ? (
            <Image
              isZoomed
              alt="character-image"
              className="object-cover w-72 h-72"
              src={image}
            />
          ) : (
            <Image
              isZoomed
              alt="character-image"
              src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=2718&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="block font-sans antialiased font-medium leading-snug tracking-normal sm:text-xl dark:text-black">
                {name}
              </h1>
              <h1 className="block font-sans antialiased font-medium leading-snug tracking-normal sm:text-xl dark:text-black">
                {species}
              </h1>
            </div>
            <span className="text-xl dark:text-black">
              {gender == "Male" ? <BsGenderMale /> : <BsGenderFemale />}
            </span>
          </div>
          <div className="flex gap-2">
            <p className="px-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-md py-0.5">
              {status}
            </p>
          </div>

          <p className="block font-sans antialiased font-light leading-relaxed text-gray-700 dark:text-black">
            <span className="font-semibold">Location : </span> {location}
          </p>
        </div>
      </div>
      <Button
        as={Link}
        className="text-sm font-semibold"
        color="primary"
        fullWidth
        href={`/character-detail/${id}`}
        radius="sm"
        type="button"
      >
        Details
      </Button>
    </div>
  );
};
