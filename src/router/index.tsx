import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-loaded pages
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = lazy(() => import('@/pages/HomePage'))

const ProductsPage = lazy(() => import('@/pages/ProductsPage'))

const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// ─────────────────────────────────────────────────────────────────────────────
// Loading screen
// ─────────────────────────────────────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            w-10 h-10
            rounded-full
            border-2 border-white/10
            border-t-accent-400
            animate-spin
          "
        />

        <p className="text-sm text-white/50">
          Loading...
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Suspense wrapper
// ─────────────────────────────────────────────────────────────────────────────

function LazyPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <LazyPage />
      </>
    ),

    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/products',
        element: <ProductsPage />,
      },

      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router