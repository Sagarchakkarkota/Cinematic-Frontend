import { AboutHero } from './_components/AboutHero'
import { AboutStory } from './_components/AboutStory'
import { AboutValues } from './_components/AboutValues'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <AboutHero />
      <AboutStory />
      <AboutValues />
    </div>
  )
}
