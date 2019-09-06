import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby'
import Posts from '../components/Posts'
import { Row, Col } from 'reactstrap'
import Sidebar from '../components/Sidebar'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to Home Page</h1>
    <Row>
      <Col md="8">
        <StaticQuery query={IndexQuery} render={(data) => (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Posts key={node.id} post={node} />
            ))}
          </div>
        )} />
      </Col>
      <Col md="4">
        <Sidebar/>
      </Col>
    </Row>
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
