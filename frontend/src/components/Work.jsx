import { useState } from "react";
import { ChevronDown } from "lucide-react";
import workData from "../data/workData"; // Assuming you have a workData.js file with the work experience data

const Work = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ^ABOVE IS THE SAME THING AS:
  //
  // const toggleSection = (index) => {
  //   if (openIndex === index) {
  //     setOpenIndex(null); // If it's already open, close it
  //   } else {
  //     setOpenIndex(index); // If it's not open, open it
  //   }
  // };

  return (
    <section id="work" className="page-section">
      <h2 className="font-extrabold section-heading">Work</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="w-3/6 flex flex-col rounded-xl justify-center items-start px-10 space-y-5 pt-5 pb-5">
          {workData.map((job, index) => (
            <div key={index} className="w-full">
              <div
                className="work-dropdown cursor-pointer transition-all duration-200 hover:bg-red-800 hover:scale-[1.02]"
                onClick={() => toggleSection(index)}
              >
                <span className="work-headings truncate flex-1 mr-4">{job.title}</span>
                <span className="flex items-center gap-2">
                  <span className="work-headings">{job.years}</span>
                  <ChevronDown
                    size={30}
                    className={`transition-transform duration-300 
                      ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </span>
              </div>

              {/* Animated Content */}
              <div
                className={`overflow-hidden h-full transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-[40vh] md:max-h-full opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-gray-200 px-10 py-5 bg-[#301616] rounded-md overflow-hidden">
                  <p className="line-clamp-5 md:line-clamp-none">
                    {job.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
