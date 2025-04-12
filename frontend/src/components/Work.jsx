import { ChevronDown } from "lucide-react";

const Work = () => (
  <section id="work" className="page-section">
    <h2 className="font-extrabold section-heading">Work</h2>
    <div className="flex flex-col justify-center items-center">
      <div className="w-3/6 flex flex-col rounded-xl justify-center items-start px-10 space-y-5 pt-5 pb-5">
        <div className="work-dropdown">
          <span className="work-headings">Burger King</span>
          <span className="flex items-center gap-2">
            <span className="work-headings">2022–2025</span>
            <ChevronDown size={30} />
          </span>
        </div>
        <div className="work-dropdown">
          <span className="work-headings">Mcdonalds</span>
          <span className="flex items-center gap-2">
            <span className="work-headings">2020–2022</span>
            <ChevronDown size={30} />
          </span>
        </div>
        <div className="work-dropdown">
          <span className="work-headings">UFC Heavyweight Champion</span>
          <span className="flex items-center gap-2">
            <span className="work-headings">2018–2020</span>
            <ChevronDown size={30} />
          </span>
        </div>
        <div className="work-dropdown">
          <span className="work-headings">Meta</span>
          <span className="flex items-center gap-2">
            <span className="work-headings">2016–2018</span>
            <ChevronDown size={30} />
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default Work;
