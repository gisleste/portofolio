import React from 'react'
import { Link, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Breadcrumb from '../components/breadcrumb'

const About = ({ data: { about } }) => {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ]

  return (
    <Layout>
      <SEO
        title={`${about.title} | Creative Portfolio`}
        description={about.subtitle}
        pathname="/about/"
        breadcrumbs={breadcrumbItems}
        image={about.photo?.fluid?.src}
      />
      <HelmetDatoCms seo={about.seoMetaTags} />
      <article className="sheet">
        <Breadcrumb items={breadcrumbItems} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{about.title}</h1>
          <p className="sheet__lead">{about.subtitle}</p>
          <div className="sheet__gallery">
            <Img fluid={about.photo.fluid} alt={about.title} />
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
          <div className="sheet__cta">
            <p>
              Interested in our work?{' '}
              <Link to="/works/">Browse our portfolio</Link>
            </p>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default About

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
          src
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
