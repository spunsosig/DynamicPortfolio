import React from "react";
import Header from "./components/Header";
import Expertise from "./components/Expertise";
import Hero from "./components/Hero";
import Hero from "./components/Hero";
import Hero from "./components/Hero";


function App() {

  const validateForm = (e) =>{
    e.preventDefault();
    console.log("Validating form...");
    return true;
  }

  return(
    <>
      <Header/>

      <div class="sections">

      </div>

      <section id="home" className="page-section main-page-section">
        <div className="main">
          <h1 className="main-name-heading">TEST</h1>
          <p className="main-subtitle">Software Engineer, Full stack developer</p>
        </div>
      </section>

      <section id="expertise" className="page-section">
        <h2 className="section-heading">Expertise</h2>
        <p>
          Lorem ipsum dolor sit amet...
        </p>
      </section>

      <section id="work" className="page-section">
        <h2 className="section-heading">Work</h2>
        <p>
          Lorem ipsum dolor sit amet...
        </p>
      </section>

      <section id="projects" className="page-section">
        <h2 className="section-heading">Projects</h2>
        <p>
          Lorem ipsum dolor sit amet...
        </p>
      </section>

      <section id="contact" className="page-section">
        <h2 className="section-heading">Contact</h2>
        <form action="/contact" method="POST" onSubmit={validateForm}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="messageInput">Message:</label>
            <textarea id="messageInput" name="message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  );
};

export default App
