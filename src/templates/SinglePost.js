import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import Moment from 'moment'
import SEO from '../components/seo'
import { Card, CardBody, CardSubtitle, Badge } from 'reactstrap'
import Img from 'gatsby-image'
import slugify from 'slugify'
import authors from '../util/authors'
import {DiscussionEmbed} from 'disqus-react'

const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter;
    const authorObj = authors.find(author => author.name === post.author)
    const baseUrl ="https://gatsbysite.com/"
    const slug = data.markdownRemark.fields.slug;
    const disqusShortName = "http-www-devmigrant-com"
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + slug
    }
    console.log(data);
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
            <h3 className="text-center">
                Share this post
            </h3>
            <div className="social-share-links text-center">
                <ul className="social-links-list">
                    <li><a href={`https://www.facebook.com/sharer.php?u=${baseUrl}${slug}`} target="_blank" rel="noopener noreferrer" className="facebook fa-2x"><i className="fa fa-facebook-f"></i></a></li>

                    <li><a href={`https://www.twitter.com/share?url=${baseUrl}${slug}&text=${post.title}&via`} target="_blank" rel="noopener noreferrer" className="twitter fa-2x"><i className="fa fa-twitter"></i></a></li>
                    
                    <li><a href={`https://plus.google.com/share?url=${baseUrl}${slug}`} target="_blank" rel="noopener noreferrer" className="google fa-2x"><i className="fa fa-google"></i></a></li>
                    
                    <li><a href={`https://www.linkedin.com/shareArticle?url=${baseUrl}${slug}`} target="_blank" rel="noopener noreferrer" className="linkedin fa-2x"><i className="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
            
            <DiscussionEmbed  shortname={disqusShortName} config={disqusConfig}/> 
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
