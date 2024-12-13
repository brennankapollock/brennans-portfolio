export default function About() {
  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Who Am I?</h1>
        <div className="space-y-6 text-lg">
          <p>
            I'm a multidisciplinary creator working at the intersection of
            technology and art. I write code, compose poetry, create music, and
            pen essays.
          </p>
          <p>
            My work explores the relationship between digital and analog forms
            of expression, finding beauty in both structured logic and creative
            chaos.
          </p>
        </div>
      </div>
    </div>
  );
}
