import React from "react";
import Header from "./components/Header";
import Expertise from "./components/Expertise";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Work from "./components/Work"


function App() {

  return(
    <>
      <Header/>

      <div class="sections">
        <Hero></Hero>
        <Expertise></Expertise>
        <Work></Work>
        <Projects></Projects>
        <Contact></Contact>
      </div>

    </>
  );
};

export default App
