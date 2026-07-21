import type { ReactNode } from 'react'

// ─── Layout ──────────────────────────────────────────────────────────────────

export interface ChildrenProps {
  children: ReactNode
}

export interface ClassNameProps {
  className?: string
}

export interface BaseComponentProps extends ChildrenProps, ClassNameProps {}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SEOMeta {
  title:        string
  description?: string
  keywords?:    string[]
  ogImage?:     string
  canonical?:   string
  noIndex?:     boolean
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label:     string
  href:      string
  children?: NavLink[]
  external?: boolean
}

// ─── Media ───────────────────────────────────────────────────────────────────

export interface ImageAsset {
  src:    string
  alt:    string
  width?: number
  height?: number
}

// ─── CMS-ready content types ─────────────────────────────────────────────────

export interface ContentBlock {
  id:       string
  type:     string
  data:     Record<string, unknown>
  order?:   number
}

export interface Page {
  id:          string
  slug:        string
  title:       string
  description: string
  blocks:      ContentBlock[]
  seo:         SEOMeta
  publishedAt: string
  updatedAt:   string
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data:    T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page:       number
    pageSize:   number
    total:      number
    totalPages: number
  }
}
