import { Handshake, FlaskConical, PackageCheck, Send } from 'lucide-react'

export interface ProcessStep {
  Icon:        React.ElementType
  step:        number
  title:       string
  description: string
}

export const BUSINESS_PROCESS: ProcessStep[] = [
  {
    Icon:        Handshake,
    step:        1,
    title:       'Farmer Sourcing',
    description: 'We build direct relationships with trusted farmers to secure authentic, high-quality agricultural produce at the source.',
  },
  {
    Icon:        FlaskConical,
    step:        2,
    title:       'Quality Inspection',
    description: 'Every batch undergoes careful inspection to verify freshness, grade and compliance with our premium quality standards.',
  },
  {
    Icon:        PackageCheck,
    step:        3,
    title:       'Packaging & Grading',
    description: 'Products are graded, sorted and packed to preserve quality during transit and meet customer specifications.',
  },
  {
    Icon:        Send,
    step:        4,
    title:       'Business Delivery',
    description: 'Reliable dispatch to businesses across India with consistent timelines and full supply chain transparency.',
  },
]
