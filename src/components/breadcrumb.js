import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={item.path}
              className="breadcrumb__item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span itemProp="name" className="breadcrumb__current">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} itemProp="item" className="breadcrumb__link">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <span className="breadcrumb__separator" aria-hidden="true">
                    /
                  </span>
                </>
              )}
              <meta itemProp="position" content={index + 1} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Breadcrumb
