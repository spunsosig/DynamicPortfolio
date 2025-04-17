const Hero = () => {
    return (
        <section id="home" className="page-section title-section relative min-h-screen flex items-center justify-center">
            <video autoPlay muted loop className="background-video">
                <source src="assets/background.mp4" type="video/mp4" />
            </video>
            <p className="main-subtitle">Software Engineer, Full stack developer</p>
            <div className="hero-bottom-gradient" />
        </section>
    );
};

export default Hero;