import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap'
import {Link} from 'gatsby';
import Moment from 'moment'
import Img from 'gatsby-image'

export default function Posts({post}) {
    return (
        <Card>
            <Link to={post.frontmatter.path}>
                <Img className="card-image-top" fluid={post.frontmatter.image.childImageSharp.fluid}/>
            </Link>
            <CardBody>
                <CardTitle>
                    <Link to={post.frontmatter.path}>
                       <h2>{post.frontmatter.title}</h2> 
                    </Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{Moment(post.frontmatter.date).format("MMM Do YYYY")}</span> by{' '}
                    <span className="text-info">{post.frontmatter.author}</span>
                </CardSubtitle>
                <CardText>{post.excerpt}</CardText>
                <Link to={post.frontmatter.path} className="btn btn-outline-primary float-right">Read more</Link>
            </CardBody>
        </Card>
    )
}
