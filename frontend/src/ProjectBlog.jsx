import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./utils/api";
import { toast } from "react-hot-toast";

const ProjectBlog = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('id');
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get('/api/projects');
                const selectedProject = response.data.find(p => p.id === parseInt(projectId));
                if (selectedProject) {
                    setProject(selectedProject);
                }
            } catch (error) {
                toast.error('Failed to load project');
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0b263a] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0b263a] text-white flex items-center justify-center">
                <h1 className="text-4xl">Project not found</h1>
            </div>
        );
    }

    const getImageUrl = (imageUrl) => {
        return `${import.meta.env.VITE_API_URL}/assets/${imageUrl}`;
    };

    return(
        <div className="min-h-screen bg-[#0b263a] text-white p-8">
            <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.image_urls && project.image_urls.map((imageUrl, index) => (
                    <img 
                        key={index}
                        src={getImageUrl(imageUrl)} 
                        alt={`${project.title} - View ${index + 1}`}
                        className="w-full rounded-3xl shadow-lg object-cover h-[500px] border border-white border-2"
                    />
                ))}
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 px-2">Technologies Used</h2>
                <div className="flex flex-wrap gap-3 px-2 pb-4">
                    {project?.tech_stack && (
                        project.tech_stack.includes(',')
                            ? project.tech_stack
                                .split(',')
                                .map(tech => tech.trim())
                                .filter(tech => tech.length > 0)
                                .map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="px-4 py-2 bg-purple-600 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))
                            : // Single technology case
                            <span className="px-4 py-2 bg-purple-600 rounded-full text-sm">
                                {project.tech_stack.trim()}
                            </span>
                    )}
                </div>
                    {project.blog_content && (
                        <div className="mt-8 px-4 pb-4">
                            <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                            <p className="text-lg">{project.blog_content}</p>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default ProjectBlog;