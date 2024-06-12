import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Character = {
  id: number | undefined;
  name: string | undefined;
  species: string | undefined;
  image: string | undefined;
  gender: "Male" | "Female";
  status: string | undefined;
  location: {
    name: string | undefined;
  };
  url: string | undefined;
};
