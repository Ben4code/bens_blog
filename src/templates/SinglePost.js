import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import Moment from 'moment'
import SEO from '../components/seo'
import {Card, CardBody, CardSubtitle, Badge } from 'reactstrap'
import Img from 'gatsby-image'
import slugify from 'slugify'
import authors from '../util/authors'

const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter;
    const authorObj = authors.find(author => author.name === post.author)
    console.log(authorObj);
    return (
        <Layout pageTitle={post.title} author={authorObj} authorImg={data.file.childImageSharp.fluid}>
            <SEO title={post.title} />
            <Card>
                <Img fluid={post.image.childImageSharp.fluid} />
                <CardBody>
                    <CardSubtitle>
                        <span className="text-info">{Moment(post.date).format('MMM Do YYYY, h:mm:ss a')}</span> by{' '}
                        <span className="text-info">{post.author}</span>
                    </CardSubtitle>
                    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                    <ul className="post-tags">
                        {post.tags.map((tag, i) => (
                            <li key={i}>
                                <Link to={`/tags/${slugify(tag, { lower: true })}`}>
                                    <Badge color="primary text-uppercase">{tag}</Badge>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </Layout>
    )
}
export default SinglePost;


export const SinglePostQuery = graphql`
    query SinglePostQuery($slug: String!, $imgUrl: String!) {

        markdownRemark(fields: {slug: {eq: $slug}}){
            id
            html
            frontmatter{
                title
                author
                tags
                date
                image{
                    childImageSharp{
                        fluid(maxWidth: 700, quality: 85){
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            fields{
                slug
            }
        }

        file(relativePath: {eq: $imgUrl}){
            childImageSharp {
                fluid(maxWidth: 300, quality: 85){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`
