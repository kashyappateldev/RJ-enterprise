import { Link } from 'react-router-dom'
import { SEO } from '@/components/common'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Page Not Found" noIndex />
      <section className="min-h-[80vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-8xl font-display font-bold text-primary-100">404</p>
          <h1 className="text-3xl font-display font-semibold text-neutral-800 mt-4 mb-2">
            Page Not Found
          </h1>
          <p className="text-neutral-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  )
}
