import React from 'react'
import { Card, CardBody, CardTitle, Form, FormGroup, Input } from 'reactstrap'
import Ad from '../images/ad-placeholder.jpg'
import {graphql, StaticQuery, Link} from 'gatsby'
import Img from 'gatsby-image'

export default function Sidebar() {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Newsletter</CardTitle>
                    <Form className="text-center">
                        <FormGroup>
                            <Input type="text" name="email" placeholder="Subscribe to our newsletter"/>
                        </FormGroup>
                        <button className="btn btn-outline-primary text-uppercase">Subscribe</button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
            <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Advertisment</CardTitle>
                    <img src={Ad} alt="Advert" style={{width: "100%"}}/>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Recent Posts</CardTitle>
                    <StaticQuery query={SidebarQuery} render={(data)=> (
                        <div>
                            {data.allMarkdownRemark.edges.map(({node})=>(
                                <Card key={node.id}>
                                    <Link to={`/posts/${node.fields.slug}`}>
                                        <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid}/>
                                    </Link>
                                    <CardBody>
                                        <CardTitle >
                                            <Link to={`/posts/${node.fields.slug}`}> {node.frontmatter.title} </Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}/>
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