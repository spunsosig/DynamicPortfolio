import { useState } from "react";
import { ChevronDown } from "lucide-react";

const workExperience = [
  {
    title: "Burger King",
    years: "2022–2025",
    details:
      "Worked on flame-grilled algorithms. Managed ketchup distribution at scale Worked on flame-grilled algorithms. Managed ketchup distribution at scale. Worked on flame-grilled algorithms. Managed ketchup distribution at scale. Worked on flame-grilled algorithms. Managed ketchup distribution at scale. Worked on flame-grilled algorithms. Managed ketchup distribution at scale..",
  },
  {
    title: "Mcdonalds",
    years: "2020–2022",
    details: "Optimized fry crispiness. Led Big Mac innovation pipeline.",
  },
  {
    title: "UFC Heavyweight Champion",
    years: "2018–2020",
    details:
      "Won title with 1 punch. Managed a side hustle in jiu-jitsu automation.",
  },
  {
    title: "Meta",
    years: "2016–2018",
    details: "Built VR memes. Accidentally launched the metaverse.",
  },
];

const Work = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="work" className="page-section">
      <h2 className="font-extrabold section-heading">Work</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="w-3/6 flex flex-col rounded-xl justify-center items-start px-10 space-y-5 pt-5 pb-5">
          {workExperience.map((job, index) => (
            <div key={index} className="w-full">
              <div
                className="work-dropdown cursor-pointer transition-all duration-200 hover:bg-red-800 hover:scale-[1.02]"
                onClick={() => toggleSection(index)}
              >
                <span className="work-headings">{job.title}</span>
                <span className="flex items-center gap-2">
                  <span className="work-headings">{job.years}</span>
                  <ChevronDown
                    size={30}
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </div>

              {/* Animated Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-gray-200 px-10 py-5 bg-[#301616] rounded-md">
                  {job.details}
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
