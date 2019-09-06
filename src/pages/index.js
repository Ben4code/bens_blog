import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby'
import Posts from '../components/Posts'

const IndexPage = () => (
  <Layout pageTitle = "Welcome to Ben's blog">
    <SEO title="Home" />
        <StaticQuery query={IndexQuery} render={(data) => (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Posts key={node.id} post={node} />
            ))}
          </div>
        )} />
  </Layout>
)

const IndexQuery = graphql`
  query{
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}){
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
    }
  }
`

export default IndexPage
