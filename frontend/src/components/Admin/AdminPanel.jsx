import projectsData from "../../data/ProjectsData";
import AddProjectPopup from "./AddProjectPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { MdDelete, MdArchive } from "react-icons/md";
import { useState } from 'react';

const AdminPanel = () => {

    const buttonStyle = "bg-red-500 p-2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer absolute top-2"
    const [showPopup, setShowPopup] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [archiveClicked, setArchiveClicked] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleDelete = (project) => {
        setSelectedProject(project);
        setDeleteClicked(true);
    };

    const handleArchive = (project) => {
        setSelectedProject(project);
        setArchiveClicked(true);
    };

    return (
        <div className="min-h-screen text-white">
            <h1 className="text-5xl font-bold ml-12 py-12">Admin Panel</h1>
            <button onClick={() => setShowPopup(true)} className="absolute top-12 right-12 text-3xl bg-[#428332] p-5 rounded-lg">Add Project</button>
            
            {showPopup && <AddProjectPopup onClose={() => setShowPopup(false)} />}

            <div className="flex flex-wrap gap-4 p-6">
                {projectsData.map((project, index) => (
                    <div className="bg-slate-700/50 w-64 h-48 rounded-lg
                                relative group
                                flex justify-center items-center
                                transition-all duration-500 ease-in-out
                                hover:bg-slate-600/50 hover:scale-[1.02]">
                        <button onClick={() => setDeleteClicked(true)} className={buttonStyle + " right-2"}>
                            <MdDelete></MdDelete>
                        </button>
                        <button onClick={() => setArchiveClicked(true)} className={buttonStyle + " right-12"}>
                            <MdArchive></MdArchive>
                        </button>
                        <h1 className="text-xl font-medium">{project.title}</h1>
                    </div>
                ))}
            </div>
            {deleteClicked && (
                <ConfirmationPopup
                    message={`Are you sure you want to delete ${selectedProject?.title}?`}
                    onConfirm={() => setDeleteClicked(false)}
                    onCancel={() => setDeleteClicked(false)}
                    confirmText="Delete"
                    confirmButtonClass="bg-red-600 hover:bg-red-500"
                />
            )}

            {archiveClicked && (
                <ConfirmationPopup
                    message={`Are you sure you want to archive ${selectedProject?.title}?`}
                    onConfirm={() => setArchiveClicked(false)}
                    onCancel={() => setArchiveClicked(false)}
                    confirmText="Archive"
                    confirmButtonClass="bg-yellow-600 hover:bg-yellow-500"
                />
            )}
        </div>
    );
}

export default AdminPanel

// main admin page which shows projects