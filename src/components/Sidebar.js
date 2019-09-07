import React from 'react'
import { Card, CardBody, CardTitle, Form, FormGroup, Input, CardText } from 'reactstrap'
import Ad from '../images/ad-placeholder.jpg'
import { graphql, StaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

export default function Sidebar({ author, authorImg }) {
    return (
        <div>
            {
                author && (
                    <Card>
                        <Img className="card-image-top" fluid={authorImg} />
                        <CardBody>
                            <CardTitle className="text-center text-uppercase mb-3">Author: {author.name}</CardTitle><hr />
                            <CardText> {author.bio}</CardText>
                            <div className="author-social-links text-center">
                                <ul className="social-links-list">
                                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="facebook fa-2x"><i className="fa fa-facebook-f"></i></a></li>
                                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="twitter fa-2x"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="instagram fa-2x"><i className="fa fa-instagram"></i></a></li>
                                    <li><a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="google fa-2x"><i className="fa fa-google"></i></a></li>
                                    <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin fa-2x"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                )
            }
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Newsletter</CardTitle>
                    <Form className="text-center">
                        <FormGroup>
                            <Input type="text" name="email" placeholder="Subscribe to our newsletter" />
                        </FormGroup>
                        <button className="btn btn-outline-primary text-uppercase">Subscribe</button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Advertisment</CardTitle>
                    <img src={Ad} alt="Advert" style={{ width: "100%" }} />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Recent Posts</CardTitle>
                    <StaticQuery query={SidebarQuery} render={(data) => (
                        <div>
                            {data.allMarkdownRemark.edges.map(({ node }) => (
                                <Card key={node.id}>
                                    <Link to={`/posts/${node.fields.slug}`}>
                                        <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid} />
                                    </Link>
                                    <CardBody>
                                        <CardTitle >
                                            <Link to={`/posts/${node.fields.slug}`}> {node.frontmatter.title} </Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )} />
                </CardBody>
            </Card>
        </div>
    )
}

const SidebarQuery = graphql`
    query SidebarQuery{
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
              node {
                frontmatter {
                  author
                  date
                  title
                  image {
                    childImageSharp {
                      fluid(quality: 85, maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                fields{
                    slug
                }
                id
              }
            }
        }
    }

`