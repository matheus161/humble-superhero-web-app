// src/components/HeroCard.tsx
import React from "react";
import { Hero } from "../interfaces/Hero";

interface HeroCardProps {
  hero: Hero;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero }) => {
  return (
    <div className="hero-card">
      <h3>{hero.name}</h3>
      <p>
        <strong>Superpower:</strong> {hero.superpower}
      </p>
      <p>
        <strong>Humility Score:</strong> {hero.humilityScore}
      </p>
    </div>
  );
};

export default HeroCard;
