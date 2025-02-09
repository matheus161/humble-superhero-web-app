// src/components/HeroForm.tsx
import React, { useState } from "react";
import { Hero } from "../interfaces/Hero";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeroFormProps {
  onSubmit: (hero: Hero) => void;
}

const HeroForm: React.FC<HeroFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [superpower, setSuperpower] = useState<string>("");
  const [humilityScore, setHumilityScore] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!name || !superpower) {
      toast.error("Name and Superpower cannot be empty");
      return;
    }

    const humilityScoreNumber = Number(humilityScore);
    if (
      isNaN(humilityScoreNumber) ||
      humilityScoreNumber < 1 ||
      humilityScoreNumber > 10
    ) {
      toast.error("Humility must be a number between 1 and 10.");
      return;
    }

    const newHero: Hero = {
      name,
      superpower,
      humilityScore: humilityScoreNumber,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/superheroes",
        newHero
      );
      onSubmit(response.data);
      setName("");
      setSuperpower("");
      setHumilityScore("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage =
          "An unexpected error occurred while adding the hero.";
        const { message } = error.response?.data || {};
        if (message) {
          errorMessage = message;
        }
        
        toast.error(errorMessage);
      } else {
        toast.error("Error adding hero. Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Superpower"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Humility Score (1-10)"
        value={humilityScore}
        onChange={(e) => setHumilityScore(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Hero"}
      </button>
    </form>
  );
};

export default HeroForm;
