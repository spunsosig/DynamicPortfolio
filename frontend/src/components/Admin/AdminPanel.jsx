import projectsData from "../../data/ProjectsData";
import { MdDelete, MdArchive } from "react-icons/md";

const AdminPanel = () => {

    const buttonStyle = "bg-red-500 p-2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer absolute top-2"

    return (
        <div className="min-h-screen text-white">
            <h1 className="text-5xl font-bold ml-12 py-12">Admin Panel</h1>
            <button className="absolute top-12 right-12 text-3xl bg-[#428332] p-5 rounded-lg">Add Project</button>
            <div className="flex flex-wrap gap-4 p-6">
            {projectsData.map((project, index) => (
                <div className="bg-slate-700/50 w-64 h-48 rounded-lg
                            relative group
                            flex justify-center items-center
                            transition-all duration-500 ease-in-out
                            hover:bg-slate-600/50 hover:scale-[1.02]">
                    <button className={buttonStyle + " right-2"}>
                        <MdDelete></MdDelete>
                    </button>
                    <button className={buttonStyle + " right-12"}>
                        <MdArchive></MdArchive>
                    </button>
                    <h1 className="text-xl font-medium">{project.title}</h1>
                </div>
            ))}
            </div>
        </div>
    );
}

export default AdminPanel