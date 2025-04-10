import { Code } from "lucide-react"

const Card = (props) => {
    return(
        <div className="max-w-sm p-8 rounded-xl text-white shadow-md min-h-100 border-4 border-white bg-sky-500/100 myCard ">
            
            {/* Icon */}
            <div className="mb-4 flex flex-row">
                <Code className="w-10 h-10 text-white mr-5" />
                <h2 className="text-3xl font-bold mb-5 h-auto">{props.title}</h2>
            </div>
            <p className="text-lg h-auto">{props.description}</p>
        </div>
    );
};

export default Card;