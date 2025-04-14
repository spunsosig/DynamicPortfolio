import ReactWebsiteImage from "../assets/react-website.png";
import { useState, useRef, useEffect } from "react";

const Projects = () => {
  const projects = [
    {
      title: "React Portfolio",
      description: "The portfolio website you are currently viewing.",
      image: ReactWebsiteImage,
    },
    // {
    //   title: "Project 2",
    //   description: "Description for project 2",
    //   image:
    //     "https://www.radicalstart.com/blog/content/images/size/w1075h650/2023/11/Importance-of-mobile-apps.jpg",
    // },
    // { title: "Project 3", description: "Description for project 3" },
    // { title: "Project 4", description: "Description for project 4" },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="projects" className="page-section">
      <h2 className="section-heading font-extrabold text-center">Projects</h2>
      <div className="flex justify-center mx-35">
        <div className="carousel-container overflow-x-auto scroll-smooth flex snap-x snap-mandatory">
          {projects.map((project, index) => (
            <div
              key={index}
              className="carousel-item w-[1200px] h-[700px] bg-gray-800 text-white m-2 p-4 rounded-lg flex flex-col items-center justify-center snap-center"
            >
              <h3 className="font-bold text-center text">{project.title}</h3>
              <p className="text-center">{project.description}</p>
              <img
                src={project.image}
                className="w-full h-full object-cover rounded-lg mt-4"
                alt={`Image for ${project.title}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
