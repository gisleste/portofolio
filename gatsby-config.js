require('dotenv').config()

const siteUrl = process.env.SITE_URL || 'https://example.com'

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
    description: `A creative portfolio showcasing design and development work. Explore projects in web design, branding, and digital experiences.`,
    author: `@portfolio`,
    siteUrl: siteUrl,
    organization: {
      name: `Creative Portfolio`,
      url: siteUrl,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map(node => {
            const path = node.path
            let priority = 0.5
            let changefreq = 'monthly'

            // Silo structure priorities
            if (path === '/') {
              priority = 1.0
              changefreq = 'weekly'
            } else if (path === '/works/' || path === '/works') {
              priority = 0.9
              changefreq = 'weekly'
            } else if (path.startsWith('/works/')) {
              priority = 0.8
              changefreq = 'monthly'
            } else if (path === '/about/' || path === '/about') {
              priority = 0.7
              changefreq = 'monthly'
            }

            return {
              url: `${site.siteMetadata.siteUrl}${path}`,
              changefreq,
              priority,
            }
          }),
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
  ],
}
