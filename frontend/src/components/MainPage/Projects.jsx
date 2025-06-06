import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../utils/api";
import { toast } from "react-hot-toast";

const Projects = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigateToProjects = (projectId) => {
    navigate(`/projects?id=${projectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        toast.error('Failed to load projects');
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    const section = sectionRef.current;
    const heading = headingRef.current;
    let lastScrollTime = 0;
    const scrollCooldown = 250;
  
    const onWheel = (e) => {
      const currentTime = performance.now();
      
      const sectionRect = section.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
  
      const isInView =
        headingRect.top <= window.innerHeight * 0.2 &&
        sectionRect.bottom >= window.innerHeight * 0.6 &&
        headingRect.bottom >= 0;
  
      if (!isInView) return;
  
      const scrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScrollLeft - 5;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
  
      if ((atStart && scrollingUp) || (atEnd && scrollingDown)) {
        return;
      }
  
      if (currentTime - lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }
  
      const scrollAmount = e.deltaY > 0 ? 350 : -350;
      const newScrollLeft = scrollLeft + scrollAmount;
  
      if ((scrollingDown && !atEnd) || (scrollingUp && !atStart)) {
        e.preventDefault();
        el.scrollTo({
          left: Math.max(0, Math.min(newScrollLeft, maxScrollLeft)),
          behavior: "smooth",
        });
        lastScrollTime = currentTime;
      }
    };
  
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const getImageUrl = (imageUrls) => {
    try {
      return imageUrls && imageUrls.length > 0 
        ? `${import.meta.env.VITE_API_URL}/assets/${imageUrls[0]}`
        : '';
    } catch (error) {
      console.error('Error with image URL:', error);
      return '';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>;
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="page-section py-16 text-white flex flex-col justify-center"
    >
      <h2 className="section-heading text-4xl font-extrabold text-center mb-10" ref={headingRef}>
        Projects
      </h2>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 px-10 py-10 ml-0 sm:ml-24"
        style={{ 
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => navigateToProjects(project.id)}
            className="shrink-0 w-[700px] h-[500px] bg-gray-800 text-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer"
          >
            {project.image_urls && (
              <img
                src={getImageUrl(project.image_urls)}
                alt={project.title}
                className="w-full h-3/5 object-cover rounded-t-2xl"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project?.tech_stack && (
                  project.tech_stack.includes(',')
                    ? project.tech_stack
                        .split(',')
                        .map(tech => tech.trim())
                        .filter(tech => tech.length > 0)
                        .map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 
                                     rounded-full text-xs font-medium tracking-wider
                                     transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))
                    : <span className="px-3 py-1 bg-purple-600 hover:bg-purple-700 
                                     rounded-full text-xs font-medium tracking-wider
                                     transition-colors duration-200">
                        {project.tech_stack.trim()}
                      </span>
                )}
              </div>
              <p className="text-gray-300 line-clamp-3">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;