import { ChevronDown } from "lucide-react"

const Work = () => (
    <section id="work" className="page-section">
        <h2 className="font-extrabold section-heading">Work</h2>
        <div className="flex flex-col justify-center items-center">
          <div className="w-3/6 flex flex-col rounded-xl justify-center items-start px-10 space-y-5 pt-5 pb-5">
            <div className="work-dropdown">
              <h1 className="work-headings">Burger King</h1>
              <ChevronDown size={50}/>
            </div>
            <div className="work-dropdown">
              <h1 className="work-headings">Mcdonalds</h1>
              <ChevronDown size={50}/>
            </div>
            <div className="work-dropdown">
              <h1 className="work-headings">Meta</h1>
              <ChevronDown size={50}/>
            </div>
          </div>
        </div>
    </section>
)

export default Work;