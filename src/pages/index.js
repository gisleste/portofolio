import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Creative Portfolio | Design & Development Work"
      description="Welcome to our creative portfolio. Explore our latest projects in web design, branding, and digital experiences."
      pathname="/"
    />
    <div className="home-intro">
      <h1 className="home-intro__title">Creative Portfolio</h1>
      <p className="home-intro__subtitle">
        Showcasing our best work in design and development
      </p>
    </div>
    <section className="featured-works">
      <header className="featured-works__header">
        <h2 className="featured-works__title">Featured Works</h2>
        <Link to="/works/" className="featured-works__link">
          View All Works →
        </Link>
      </header>
      <Masonry className="showcase">
        {data.allDatoCmsWork.edges.slice(0, 6).map(({ node: work }) => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <Link to={`/works/${work.slug}`} className="card__image">
                <Img fluid={work.coverImage.fluid} alt={work.title} />
              </Link>
              <figcaption className="card__caption">
                <h3 className="card__title">
                  <Link to={`/works/${work.slug}`}>{work.title}</Link>
                </h3>
                <div className="card__description">
                  <p>{work.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
      {data.allDatoCmsWork.edges.length > 6 && (
        <footer className="featured-works__footer">
          <Link to="/works/" className="featured-works__cta">
            Explore All {data.allDatoCmsWork.edges.length} Projects
          </Link>
        </footer>
      )}
    </section>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
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
