import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import Posts from '../components/Posts'

const TagsPage = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  return (
    <Layout pageTitle={`${props.pageContext.tagTitle} Posts`} >
      <SEO title="Tags" keywords={["tags", "topics"]} />
      <div>
        {posts.map(({ node }) => (
          <Posts key={node.id} post={node} />
        ))}
      </div>
    </Layout>
  )
}


export const TagsQuery = graphql`
  query TagsQuery($tagTitle: String!) {
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tagTitle}}}){
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


export default TagsPage
