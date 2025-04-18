const Card = ({ icon, title, description }) => {
    return(
        <div className="contact-form max-w-sm p-8 rounded-xl text-white shadow-md min-h-100 myCard duration-300 hover:scale-105 hover:z-10">
            
            {/* Icon */}
            <div className="mb-4 flex flex-row">
                <div className="text-3xl w-16 h-16 flex items-center justify-center">
                    {icon}
                </div>
                <h2 className="text-3xl font-bold mb-5 h-[110px]">{title}</h2>
            </div>
            <p className="text-lg h-auto">{description}</p>
        </div>
    );
};

export default Card;