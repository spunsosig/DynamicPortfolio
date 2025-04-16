const Hero = () => {
    return (
        <section id="home" className="page-section title-section">
            <video autoPlay muted loop className="background-video">
                <source src="assets/background.mp4" type="video/mp4" />
            </video>
            <p className="main-subtitle">Software Engineer, Full stack developer</p>
        </section>
    );
};

export default Hero;