import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({
  title,
  description,
  image,
  pathname,
  article,
  breadcrumbs,
  datePublished,
  dateModified,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query SEOQuery {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            organization {
              name
              url
            }
          }
        }
      }
    `
  )

  const {
    title: defaultTitle,
    description: defaultDescription,
    author,
    siteUrl,
    organization,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? `${image}` : null,
    url: `${siteUrl}${pathname || '/'}`,
  }

  // Organization Schema (for all pages)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
  }

  // Website Schema (for homepage)
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultTitle,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/works/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${siteUrl}${crumb.path}`,
        })),
      }
    : null

  // Creative Work Schema (for portfolio items)
  const creativeWorkSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        headline: seo.title,
        description: seo.description,
        image: seo.image,
        url: seo.url,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Organization',
          name: organization.name,
        },
        publisher: {
          '@type': 'Organization',
          name: organization.name,
          url: organization.url,
        },
      }
    : null

  // Collection Page Schema (for works listing)
  const collectionSchema =
    pathname === '/works' || pathname === '/works/'
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Portfolio Works',
          description: 'Browse our complete collection of creative works and projects.',
          url: `${siteUrl}/works/`,
          mainEntity: {
            '@type': 'ItemList',
            name: 'Portfolio Items',
          },
        }
      : null

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:site_name" content={defaultTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      {author && <meta name="twitter:creator" content={author} />}

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - Website (homepage only) */}
      {pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* Structured Data - Breadcrumbs */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Structured Data - Creative Work (portfolio items) */}
      {creativeWorkSchema && (
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
      )}

      {/* Structured Data - Collection Page (works listing) */}
      {collectionSchema && (
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      )}
    </Helmet>
  )
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
  breadcrumbs: null,
  datePublished: null,
  dateModified: null,
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
}

export default SEO
