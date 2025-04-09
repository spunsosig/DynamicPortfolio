const Contact = () => {
    const validateForm = (e) =>{
        e.preventDefault();
        console.log("Validating form...");
        return true;
    }

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
};

export default Contact;