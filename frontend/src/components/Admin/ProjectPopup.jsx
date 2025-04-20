import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from 'react-hot-toast';
import api from "../../utils/api";

const ProjectPopup = ({ project, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        techStack: project?.tech_stack || '',
        blogContent: project?.blog_content || '',
        imageFiles: [],
        keepExistingImages: true
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataObj = new FormData();
            formDataObj.append('title', formData.title);
            formDataObj.append('description', formData.description);
            formDataObj.append('techStack', formData.techStack);
            formDataObj.append('blogContent', formData.blogContent || '');
            formDataObj.append('keepExistingImages', formData.keepExistingImages);

            formData.imageFiles.forEach(file => {
                formDataObj.append('images', file);
            });

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            if (project) {
                await api.put(`/api/admin/projects/${project.id}`, formDataObj, config);
                toast.success('Project updated successfully');
            } else {
                await api.post('/api/admin/projects', formDataObj, config);
                toast.success('Project added successfully');
            }
            
            onSuccess?.();
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${project ? 'update' : 'add'} project`);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = "w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400";
    const fileInputStyle = `w-full p-6 mb-6 rounded-xl bg-green-700 hover:bg-green-600
        transition-colors border-2 border-dashed border-green-500
        flex flex-col items-center justify-center gap-2
        outline-none text-white cursor-pointer`;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0b263a] p-8 rounded-lg w-full max-w-md relative">
                <button 
                    type="button"
                    onClick={onClose}
                    className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full text-xl"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">
                    {project ? 'Edit Project' : 'Add Project'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Input */}
                    <input
                        type="text"
                        value={formData.title}
                        placeholder="Project Title"
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            title: e.target.value
                        }))}
                        className={inputStyle}
                        required
                    />

                    {/* Tech Stack Input */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">
                            Tech Stack *
                        </label>
                        <input
                            type="text"
                            value={formData.techStack}
                            placeholder="React, Node.js, MySQL, etc."
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                techStack: e.target.value
                            }))}
                            className={inputStyle}
                            required
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">
                            Short Description * (Shown on cards)
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            maxLength={255}
                            placeholder="Brief project overview..."
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            className={inputStyle}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            {formData.description.length}/255 characters
                        </p>
                    </div>

                    {/* Blog Content */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">
                            Detailed Content (Optional)
                        </label>
                        <textarea
                            value={formData.blogContent}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                blogContent: e.target.value
                            }))}
                            placeholder="Full project description, challenges, solutions..."
                            className={`${inputStyle} h-32`}
                            rows={6}
                        />
                    </div>

                    {/* Keep Existing Images Checkbox */}
                    {project && (
                        <div className="mb-4">
                            <label className="flex items-center space-x-3 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.keepExistingImages}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        keepExistingImages: e.target.checked
                                    }))}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span>Keep existing images</span>
                            </label>
                        </div>
                    )}

                    {/* Image Upload */}
                    <div>
                        <label className={fileInputStyle}>
                            <MdCloudUpload className="w-8 h-8" />
                            <span className="max-w-full truncate">
                                {formData.imageFiles.length > 0 
                                    ? `Selected: ${formData.imageFiles.map(file => file.name).join(', ')}` 
                                    : `Click to ${project ? 'add or replace' : 'upload'} images (max 5)`}
                            </span>
                            {formData.imageFiles.length > 0 && (
                                <span className="text-sm text-gray-300">
                                    {formData.imageFiles.map(file => 
                                        `(${(file.size / 1024).toFixed(2)} KB)`
                                    ).join(', ')}
                                </span>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    if (files.length > 5) {
                                        toast.error('Maximum 5 images allowed');
                                        return;
                                    }
                                    setFormData(prev => ({
                                        ...prev,
                                        imageFiles: files
                                    }));
                                }}
                                required={!project}
                            />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-3 rounded-xl font-semibold text-white
                            ${isLoading 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-purple-600 hover:bg-purple-700'} 
                            transition-colors`}
                    >
                        {isLoading ? (project ? 'Updating...' : 'Adding...') : (project ? 'Update Project' : 'Add Project')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectPopup;