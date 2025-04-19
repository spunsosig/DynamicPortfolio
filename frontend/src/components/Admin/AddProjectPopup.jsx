import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const AddProjectPopup = ({ onClose }) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
        }
    }

    const inputStyle =
    "w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400";
  
    const buttonStyle = `w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3 text-white`;

    const fileInputStyle = `w-full p-6 mb-6 rounded-xl !bg-green-700 !hover:bg-green-600
        !transition-colors !border-2 !border-dashed !border-green-500
        !flex !flex-col !items-center !justify-center !gap-2
        !outline-none !text-white !cursor-pointer`;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <form action="POST" className="contact-form w-100 min-h-150 relative">
                <button 
                    type="button"
                    onClick={onClose}
                    className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full text-xl"
                >
                    ×
                </button>
                <input type="text" placeholder="Title" className={inputStyle} />
                <input type="text" placeholder="Description" className={inputStyle} />
                <textarea placeholder="Blog" className={inputStyle + " h-50"}></textarea>
                <label className={fileInputStyle}>
                    <MdCloudUpload className="w-8 h-8" />
                    <span className="max-w-full truncate">{selectedFile ? selectedFile.name : 'Click to upload image'}</span>
                    <span className="text-sm text-gray-300">
                        {selectedFile && `(${(selectedFile.size / 1024).toFixed(2)} KB)`}
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange}/>
                </label>
                <button type="submit" className={buttonStyle}>Submit</button>
            </form>
        </div>
    );
};

export default AddProjectPopup;