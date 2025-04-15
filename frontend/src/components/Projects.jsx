import React, { useRef, useEffect } from "react";
import ReactWebsiteImage from "../assets/react-website.png";
import PlaceHolderImage from "../assets/elementor-placeholder-image.webp";

const Projects = () => {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null); // 🆕 section ref

  const projects = [
    {
      title: "React Portfolio",
      description: "The portfolio website you are currently viewing.",
      image: ReactWebsiteImage,
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      image: PlaceHolderImage,
    },
    {
      title: "Project 3",
      description: "Description for project 3",
      image: PlaceHolderImage,
    },
    {
      title: "Project 4",
      description: "Description for project 4",
      image: PlaceHolderImage,
    },
  ];

  useEffect(() => {
    const el = carouselRef.current;
    const section = sectionRef.current;

    const onWheel = (e) => {

      const sectionRect = section.getBoundingClientRect();
      const isInView =
      sectionRect.top <= window.innerHeight * 0.2 && // Only when 20% or less of the viewport height is above the section
      sectionRect.bottom >= window.innerHeight * 0.8; // And when 80% or more of the section is visible

      if (!isInView) return;

      const scrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      // Adjust scroll sensitivity and direction
      const scrollAmount = e.deltaY > 0 ? 350 : -350; // Fixed scroll amount
      const newScrollLeft = scrollLeft + scrollAmount;

      // Check boundaries
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScrollLeft - 5;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atEnd) || (scrollingUp && !atStart)) {
        e.preventDefault();
        el.scrollTo({
          left: Math.max(0, Math.min(newScrollLeft, maxScrollLeft)),
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="page-section py-16 pl-64 h-screen text-white flex flex-col justify-center"
    >
      <h2 className="section-heading text-4xl font-extrabold text-center mb-10">
        Projects
      </h2>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 px-10 py-10" //snap-x snap-mandatory
        style={{ scrollBehavior: "smooth" }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="shrink-0 w-[700px] h-[500px] bg-gray-800 text-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:z-10" //snap-center
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-3/5 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
