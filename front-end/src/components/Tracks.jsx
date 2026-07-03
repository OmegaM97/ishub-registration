import { Code2, Server, Brain, Smartphone } from "lucide-react";
import useReveal from "../hooks/useReveal";

const tracks = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Git, responsive design, APIs, and modern web development.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Learn server-side development, REST APIs, databases, authentication, application architecture, and backend programming concepts.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Learn the fundamentals of AI, machine learning, Python, data preprocessing, model development, and practical AI applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Learn to build cross-platform mobile applications using React Native, Expo, JavaScript, navigation, APIs, and mobile UI design.",
  },
];

export default function Tracks() {
  const headerRef = useReveal();

  return (
    <section id="tracks" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headerRef}
          className="reveal text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Choose Your Learning Track
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Select the specialization that matches your interests and begin your
            journey toward becoming a skilled technology professional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, i) => (
            <TrackCard key={track.title} track={track} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackCard({ track, delay }) {
  const ref = useReveal();
  const Icon = track.icon;

  return (
    <div
      ref={ref}
      className="reveal group bg-white rounded-xl2 p-8 shadow-soft hover:shadow-softHover transition-all duration-300 hover:-translate-y-1.5 border border-slate-100"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-xl2 bg-gradient-to-br from-primary to-primary-dark grid place-items-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
        <Icon size={26} className="text-white" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{track.title}</h3>
      <p className="text-slate-600 leading-relaxed">{track.description}</p>
    </div>
  );
}
