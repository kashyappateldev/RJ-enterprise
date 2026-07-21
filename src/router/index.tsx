import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout'

const HomePage     = lazy(() => import('@/pages/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />
  </div>
)

const wrap = (Page: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: wrap(HomePage) },
      // { path: 'about',    element: wrap(AboutPage) },
      // { path: 'products', element: wrap(ProductsPage) },
      // { path: 'services', element: wrap(ServicesPage) },
      // { path: 'blog',     element: wrap(BlogPage) },
      // { path: 'contact',  element: wrap(ContactPage) },
      { path: '*', element: wrap(NotFoundPage) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
