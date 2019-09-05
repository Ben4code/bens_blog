import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby'
import Posts from '../components/Posts'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to Home Page</h1>
    <StaticQuery query={IndexQuery} render={ (data)=> (
      <div>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Posts key={node.id} post={node}/>
        ))}
      </div>
    )}/>
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
            path
            title
          }
          excerpt
          id
        }
      }
    }
  }
`

export default IndexPage
