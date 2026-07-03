import {
  Gift,
  Users,
  Rocket,
  HandHeart,
  Award,
  TrendingUp,
} from 'lucide-react'
import useReveal from '../hooks/useReveal'

const features = [
  {
    icon: Gift,
    title: '100% Free Bootcamp',
    description: 'No tuition, no hidden fees - every resource is provided at no cost to students.',
  },
  {
    icon: Users,
    title: 'Experienced Mentors',
    description: 'Learn from industry professionals who guide you through real technical challenges.',
  },
  {
    icon: Rocket,
    title: 'Real Project Experience',
    description: 'Build portfolio-ready projects that reflect real-world development workflows.',
  },
  {
    icon: HandHeart,
    title: 'Collaborative Learning',
    description: 'Work alongside passionate teammates in a supportive, team-driven environment.',
  },
  {
    icon: Award,
    title: 'Certificate of Completion',
    description: 'Earn a certificate that showcases your commitment and newly built skills.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth Opportunities',
    description: 'Open doors to internships, networking, and future roles in the tech industry.',
  },
]

export default function WhyJoin() {
  const headerRef = useReveal()

  return (
    <section id="why-join" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headerRef} className="reveal text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Students Choose ISHub
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, delay }) {
  const ref = useReveal()
  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className="reveal group flex gap-4 p-6 rounded-xl2 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/40 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shrink-0 w-12 h-12 rounded-xl2 bg-blue-50 grid place-items-center group-hover:bg-primary transition-colors duration-300">
        <Icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2} />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  )
}
