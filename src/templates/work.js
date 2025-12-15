import React from 'react'
import { Link, graphql } from 'gatsby'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Breadcrumb from '../components/breadcrumb'

const Work = ({ data }) => {
  const work = data.datoCmsWork
  const relatedWorks = data.allDatoCmsWork.edges
    .filter(({ node }) => node.slug !== work.slug)
    .slice(0, 3)

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works/' },
    { name: work.title, path: `/works/${work.slug}/` },
  ]

  return (
    <Layout>
      <SEO
        title={`${work.title} | Creative Portfolio`}
        description={work.excerpt}
        pathname={`/works/${work.slug}/`}
        image={work.coverImage?.url}
        article={true}
        breadcrumbs={breadcrumbItems}
      />
      <HelmetDatoCms seo={work.seoMetaTags} />
      <article className="sheet">
        <Breadcrumb items={breadcrumbItems} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{work.title}</h1>
          <p className="sheet__lead">{work.excerpt}</p>
          <div className="sheet__slider">
            <Slider infinite={true} slidesToShow={2} arrows>
              {work.gallery.map(({ fluid }) => (
                <img alt={work.title} key={fluid.src} src={fluid.src} />
              ))}
            </Slider>
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: work.descriptionNode.childMarkdownRemark.html,
            }}
          />
          <div className="sheet__gallery">
            <Img fluid={work.coverImage.fluid} alt={work.title} />
          </div>
        </div>
      </article>

      {relatedWorks.length > 0 && (
        <section className="related-works">
          <h2 className="related-works__title">Related Works</h2>
          <div className="related-works__grid">
            {relatedWorks.map(({ node: relatedWork }) => (
              <Link
                key={relatedWork.id}
                to={`/works/${relatedWork.slug}`}
                className="related-works__item"
              >
                <div className="related-works__image">
                  <Img fluid={relatedWork.coverImage.fluid} alt={relatedWork.title} />
                </div>
                <h3 className="related-works__item-title">{relatedWork.title}</h3>
              </Link>
            ))}
          </div>
          <div className="related-works__cta">
            <Link to="/works/">← View All Works</Link>
          </div>
        </section>
      )}
    </Layout>
  )
}

export default Work

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          coverImage {
            fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
