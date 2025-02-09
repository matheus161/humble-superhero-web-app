// src/App.tsx
import React, { useState } from "react";
import { Hero } from "./interfaces/Hero";
import HeroList from "./components/HeroList";
import HeroForm from "./components/HeroForm";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  return (
    <div className="app">
      <h1>Superheroes List</h1>

      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cancel" : "Add Hero"}
      </button>

      {isFormVisible && (
        <HeroForm onSubmit={(newHero) => setHeroes([...heroes, newHero])} />
      )}

      <HeroList heroes={heroes} setHeroes={setHeroes} />

      <ToastContainer />
    </div>
  );
};

export default App;
