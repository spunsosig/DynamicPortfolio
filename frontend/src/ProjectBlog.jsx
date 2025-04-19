import { useSearchParams } from "react-router-dom";
import projectsData from "./data/ProjectsData";

const ProjectBlog = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('id');
    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0b263a] text-white flex items-center justify-center">
                <h1 className="text-4xl">Project not found</h1>
            </div>
        );
    }

    const images = project.images || [project.image];

    return(
        <div className="min-h-screen bg-[#0b263a] text-white p-8">
            <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {images.map((image, index) => (
                    <img 
                        key={index}
                        src={image} 
                        alt={`${project.title} - View ${index + 1}`}
                        className="w-full rounded-3xl shadow-lg object-cover h-[500px] border border-white border-2"
                    />
                ))}
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 px-2">Technologies Used</h2>
                <div className="flex flex-wrap gap-3 px-2 pb-4">
                    {project.technologies?.map((tech, index) => (
                        <span 
                            key={index}
                            className="px-4 py-2 bg-purple-600 rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="max-w-full min-h-[200px] bg-gray-800">
                <p className="text-xl mb-4 pt-4 px-4">{project.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectBlog;