import Card from './Card';

const Expertise = () => (
    <section id="expertise" className="page-section h-full">
        <h2 className="section-heading font-extrabold">Expertise</h2>
        <div className='flex flex-col pl-32 md:flex-row justify-center items-start gap-6'>
          <Card title="Software Development" description="Experienced in both functional and OOP: Dart, Python, Java, JavaScript, TypeScript."></Card>
          <Card title="Frontend Dev React, NextJS" description="Passionate about UI/UX. Over 5 years of development experience in HTML, CSS, JS, React and NextJS frameworks."></Card>
          <Card title="Flutter Dev Android, iOS" description="Skilled in developing hybrid mobile apps and cross-platform solutions using the Flutter framework."></Card>
        </div>
    </section>
);

export default Expertise; 