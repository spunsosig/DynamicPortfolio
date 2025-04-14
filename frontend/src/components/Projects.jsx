import React, { useRef, useEffect } from "react";
import ReactWebsiteImage from "../assets/react-website.png";
import PlaceHolderImage from "../assets/elementor-placeholder-image.webp";

const Projects = () => {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);

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
    const section = sectionRef.current;
    const carousel = carouselRef.current;

    console.log("Carousel element:", carousel);
    console.log("ScrollWidth:", carousel.scrollWidth);
    console.log("ClientWidth:", carousel.clientWidth);

    const onWheel = (e) => {
      // console.log("Scroll triggered", e.deltaY); // ← this will help debug

      const isScrollable = carousel.scrollWidth > carousel.clientWidth;
      // console.log("Is scrollable:", isScrollable); // ← this will help debug

      if (!isScrollable) return;

      const atStart = carousel.scrollLeft === 0;
      const atEnd =
        carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;

      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        console.log("Scrolling", e.deltaY); // ← this will help debug
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
        console.log(carousel.scrollLeft + " + " + e.deltaY); // ← this will help debug
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });

    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="page-section py-16 pl-64 h-screen flex flex-col justify-center"
    >
      <h2 className="section-heading text-4xl font-extrabold text-center text-white mb-10">
        Projects
      </h2>

      <div className="">
        <div
          ref={carouselRef}
          className="flex gap-6 px-10 py-10 overflow-x-scroll scroll-smooth snap-x snap-mandatory"
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
                <p className="text-white">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
