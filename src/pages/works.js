import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Breadcrumb from '../components/breadcrumb'

const WorksPage = ({ data }) => {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works/' },
  ]

  return (
    <Layout>
      <SEO
        title="Portfolio Works | Creative Portfolio"
        description="Browse our complete collection of creative works including web design, branding, and digital experiences. View all portfolio projects."
        pathname="/works/"
        breadcrumbs={breadcrumbItems}
      />
      <div className="works-hub">
        <Breadcrumb items={breadcrumbItems} />
        <header className="works-hub__header">
          <h1 className="works-hub__title">Portfolio Works</h1>
          <p className="works-hub__description">
            Explore our collection of creative projects spanning web design, branding,
            and digital experiences.
          </p>
        </header>
        <Masonry className="showcase">
          {data.allDatoCmsWork.edges.map(({ node: work }) => (
            <div key={work.id} className="showcase__item">
              <figure className="card">
                <Link to={`/works/${work.slug}`} className="card__image">
                  <Img fluid={work.coverImage.fluid} alt={work.title} />
                </Link>
                <figcaption className="card__caption">
                  <h2 className="card__title">
                    <Link to={`/works/${work.slug}`}>{work.title}</Link>
                  </h2>
                  <div className="card__description">
                    <p>{work.excerpt}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </Masonry>
        <footer className="works-hub__footer">
          <p className="works-hub__cta">
            Interested in working together?{' '}
            <Link to="/about">Learn more about us</Link>
          </p>
        </footer>
      </div>
    </Layout>
  )
}

export default WorksPage

export const query = graphql`
  query WorksQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
