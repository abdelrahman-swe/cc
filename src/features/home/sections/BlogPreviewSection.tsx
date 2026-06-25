import type { BlogPost, SectionCopy } from '@/features/home/types/home'

import { SectionHeader } from '../components/SectionHeader'

type BlogPreviewSectionProps = {
  copy: SectionCopy
  posts: BlogPost[]
}

const dateFormatter = new Intl.DateTimeFormat('ar', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

export function BlogPreviewSection({ copy, posts }: BlogPreviewSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="blog">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={copy.eyebrow} heading={copy.heading} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-[30px] border border-brand-line bg-white shadow-card"
            >
              {post.image ? (
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <div className="p-6">
                {post.publishedAt ? (
                  <time className="text-xs font-bold text-brand-orange" dateTime={post.publishedAt}>
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </time>
                ) : null}
                <h3 className="mt-4 text-xl font-extrabold leading-8 text-brand-ink">
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
