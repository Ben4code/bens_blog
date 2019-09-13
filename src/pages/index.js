import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby'
import Posts from '../components/Posts'
import PaginationBar from '../components/PaginationBar'

const IndexPage = () => {
  const postsPerPage = 2;
  let numberOfPages;
  return (
    <Layout pageTitle="Welcome to Ben's blog">
      <SEO title="Home" />
      <StaticQuery query={IndexQuery} render={(data) => (
        <div>
          {
            data.allMarkdownRemark.edges.map(({ node }) => {
              numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);
              return (
                <Posts key={node.id} post={node} />
              )
            })
          }
          <PaginationBar currentPage={1} numberOfPages={numberOfPages} />
        </div>
      )} />
    </Layout>
  )
}
const IndexQuery = graphql`
  query{
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 2){
      edges {
        node {
          frontmatter {
            author
            date
            title
            tags
            image {
              childImageSharp {
                fluid(quality: 85, maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
          id
          fields{
            slug
          }
        }
      }
      totalCount
    }
  }
`

export default IndexPage
