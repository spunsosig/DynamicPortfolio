const ConfirmationPopup = ({ message, onConfirm, onCancel, confirmText, confirmButtonClass }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-xl max-w-sm w-full mx-4">
                <h2 className="text-xl text-white mb-4">{message}</h2>
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 ${confirmButtonClass} bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
