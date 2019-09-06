import React from 'react'
import Layout from '../components/layout'
import Sidebar from '../components/Sidebar'
import { graphql, Link } from 'gatsby'
import Moment from 'moment'
import SEO from '../components/seo'
import { Row, Col, Card, CardBody, CardSubtitle, Badge } from 'reactstrap'
import Img from 'gatsby-image'
import slugify from 'slugify'


const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter;
    return (
        <Layout>
            <SEO title={post.title} />
            <h1>{post.title}</h1>
            <Row>
                <Col md="8">
                    <Card>
                        <Img fluid={post.image.childImageSharp.fluid} />
                        <CardBody>
                            <CardSubtitle>
                                <span className="text-info">{Moment(post.date).format('MMM Do YYYY, h:mm:ss a')}</span> by{' '}
                                <span className="text-info">{post.author}</span>
                            </CardSubtitle>
                            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                            <ul className="posts-tags">
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
                </Col>

                <Col md="4">
                    <Sidebar />
                </Col>

            </Row>
        </Layout>
    )
}
export default SinglePost;


export const SinglePostQuery = graphql`
    query SinglePostQuery($slug: String!) {
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
    }
`
