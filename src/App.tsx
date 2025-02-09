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
      <h1>Humble Superheroes List</h1>

      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cancel" : "Add Hero"}
      </button>

      {isFormVisible && (
        <HeroForm onSubmit={(newHero) => setHeroes([...heroes, newHero])} />
      )}

      <HeroList heroes={heroes} setHeroes={setHeroes} />

      <ToastContainer
        closeButton={<span style={{ fontSize: "14px", color: "#333" }}>✖</span>}
        autoClose={3000}
        closeOnClick={true}
      />
    </div>
  );
};

export default App;
