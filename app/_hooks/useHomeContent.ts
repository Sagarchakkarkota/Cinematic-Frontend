import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface HomeStep {
  number: string
  title: string
  description: string
}

export interface HomeContent {
  eyebrow?: string
  heroTitle?: string
  heroAccent?: string
  heroDescription?: string
  heroMeta?: string[]
  manifestoKicker?: string
  manifestoTitle?: string
  manifestoAccent?: string
  manifestoDescription?: string
  imageCaption?: string[]
  processKicker?: string
  processTitle?: string
  processAccent?: string
  processDescription?: string
  processSteps?: HomeStep[]
  workKicker?: string
  workLinkLabel?: string
  quote?: string
  quoteAuthor?: string
  ctaKicker?: string
  ctaTitle?: string
  ctaAccent?: string
  ctaLabel?: string
}

export const defaultHomeContent: Required<HomeContent> = {
  eyebrow: 'Utsavam / visual stories',
  heroTitle: 'Frames that',
  heroAccent: 'feel like memory.',
  heroDescription: 'A cinematography studio for weddings, people and the quiet, electric moments between them.',
  heroMeta: ['24° 35\' N', '74° 39\' E'],
  manifestoKicker: '01 — our point of view',
  manifestoTitle: 'Not just what',
  manifestoAccent: 'happened.',
  manifestoDescription: 'We look for the in-between: a hand finding another, a breath before the music, the light that stays on a face for one second longer.',
  imageCaption: ['A little bit of', 'ordinary magic.'],
  processKicker: '02 — how we work',
  processTitle: 'Made with',
  processAccent: 'intention.',
  processDescription: 'From first hello to final cut, every detail has a reason to be there.',
  processSteps: [{ number: '01', title: 'The feeling', description: 'We begin with a conversation, not a checklist. Your story sets the rhythm.' }, { number: '02', title: 'The frame', description: 'Light, texture and movement come together to make something unmistakably yours.' }, { number: '03', title: 'The keepsake', description: 'A considered film that brings you back to the day, exactly as it felt.' }],
  workKicker: '03 — selected work',
  workLinkLabel: 'View all films',
  quote: 'The best stories are the ones that still feel alive when the screen goes dark.',
  quoteAuthor: '— Utsavam studio notes',
  ctaKicker: '04 — make it yours',
  ctaTitle: 'Your day,',
  ctaAccent: 'in motion.',
  ctaLabel: 'Tell us your story',
}

export function useHomeContent() {
  const endpoint = process.env.NEXT_PUBLIC_HOME_CONTENT_ENDPOINT
  return useQuery<HomeContent>({
    queryKey: ['home-content'],
    queryFn: async () => (await api.get(endpoint || '/home-content')).data.data,
    enabled: Boolean(endpoint),
    retry: false,
    placeholderData: defaultHomeContent,
  })
}
