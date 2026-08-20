import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AboutPage from '@/pages/AboutPage'

import { Layout } from '@/components/layout/Layout'

// ─────────────────────────────────────────────────────────────────────────────
// Lazy pages
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = lazy(() => import('@/pages/HomePage'))

const ProductsPage = lazy(() => import('@/pages/ProductsPage'))

const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage'),
)

const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage'),
)

// ─────────────────────────────────────────────────────────────────────────────
// Loading screen
// ─────────────────────────────────────────────────────────────────────────────

function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-2 border-primary-200 border-t-primary-700 animate-spin" />
    </div>
  )
}

function LazyPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/',
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },

      {
        path: '/products',
        element: (
          <LazyPage>
            <ProductsPage />
          </LazyPage>
        ),
      },

      {
        path: '/products/:id',
        element: (
          <LazyPage>
            <ProductDetailPage />
          </LazyPage>
        ),
      },

      {
        path: '*',
        element: (
          <LazyPage>
            <NotFoundPage />
          </LazyPage>
        ),
      },
    ],
  },
])