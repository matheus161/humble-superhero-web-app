// src/components/HeroList.tsx
import React, { useEffect } from "react";
import { Hero } from "../interfaces/Hero";
import HeroCard from "./HeroCard";
import axios from "axios";

interface HeroListProps {
  heroes: Hero[];
  setHeroes: React.Dispatch<React.SetStateAction<Hero[]>>;
}

const HeroList: React.FC<HeroListProps> = ({ heroes, setHeroes }) => {
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/superheroes");
        setHeroes(response.data);
      } catch (error) {
        console.error("Error when searching superheroes:", error);
      }
    };

    fetchHeroes();
  }, [setHeroes]);

  return (
    <div className="hero-list">
      {heroes.map((hero, index) => (
        <HeroCard key={index} hero={hero} />
      ))}
    </div>
  );
};

export default HeroList;
