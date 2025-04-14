import React, { useRef, useEffect } from "react";
import ReactWebsiteImage from "../assets/react-website.png";
import PlaceHolderImage from "../assets/elementor-placeholder-image.webp";

const Projects = () => {
  const carouselRef = useRef(null);

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

    const onWheel = (e) => {
      const scrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft >= maxScrollLeft - 1; // -1 for float rounding

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Only intercept scroll if we're not at start/end
      if ((scrollingDown && !atEnd) || (scrollingUp && !atStart)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="projects"
      className="page-section py-16 pl-64 h-screen text-white flex flex-col justify-center"
    >
      <h2 className="section-heading text-4xl font-extrabold text-center mb-10">
        Projects
      </h2>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 px-10 py-10 snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[700px] h-[500px] bg-gray-800 text-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:z-10"
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
