import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap'
import {Link} from 'gatsby';
import Moment from 'moment'


export default function Posts({post}) {
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <Link to={post.frontmatter.path}>
                        {post.frontmatter.title}
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
