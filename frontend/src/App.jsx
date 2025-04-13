import React, { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import Expertise from "./components/Expertise";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Work from "./components/Work";
import SideNav from "./components/sideNav";

function App() {
  const homePageRef = useRef();
  const [isHomePageVisible, setIsHomePageVisible] = useState();
  console.log("is visible: ", isHomePageVisible);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsHomePageVisible(entry.isIntersecting);
    });
    if (homePageRef.current) {
      observer.observe(homePageRef.current);
    }

    // Cleanup function to disconnect the observer
    return () => {
      if (homePageRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div ref={homePageRef} className="flex flex-col justify-center">
        <Header />
        <Hero />
        <SideNav visible={!isHomePageVisible} />
      </div>
      <div className="sections">
        <Expertise />
        <Work />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
