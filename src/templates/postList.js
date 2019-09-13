import React from 'react'
import Layout from '../components/layout'
import Posts from '../components/Posts'
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import PaginationBar from '../components/PaginationBar'

const PostList = (props) => {
    const posts = props.data.allMarkdownRemark.edges;
    const {currentPage, numberOfPages} = props.pageContext
    return (
      <Layout pageTitle={`Page ${props.pageContext.currentPage}`} >
        <SEO title="Blog posts" keywords={["tags", "topics"]} />
        <div>
          {posts.map(({ node }) => (
            <Posts key={node.id} post={node} />
          ))}
          <PaginationBar currentPage={currentPage} numberOfPages={numberOfPages}/>
        </div>
      </Layout>
    )
  }
export default PostList;


export const postListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!){
        allMarkdownRemark(
            sort: {fields: frontmatter___date, order: DESC}, 
            limit: $limit, 
            skip: $skip
        ){
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