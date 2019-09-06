import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Badge} from 'reactstrap'
import {Link} from 'gatsby';
import Moment from 'moment'
import Img from 'gatsby-image'
import slugify from 'slugify';

export default function Posts({post}) {
    return (
        <Card>
            <Link to={`/posts/${post.fields.slug}`}>
                <Img className="card-image-top" fluid={post.frontmatter.image.childImageSharp.fluid}/>
            </Link>
            <CardBody>
                <CardTitle>
                    <Link to={`/posts/${post.fields.slug}`}>
                       <h2>{post.frontmatter.title}</h2> 
                    </Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{Moment(post.frontmatter.date).format('MMM Do YYYY, h:mm:ss a')}</span> by{' '}
                    <span className="text-info">{post.frontmatter.author}</span>
                </CardSubtitle>
                <CardText>{post.excerpt}</CardText>
                <ul className="post-tags">
                    {post.frontmatter.tags.map((tag, i)=> (
                        <li key={i}>
                            <Link to={`/tags/${slugify(tag, {lower: true})}`}>
                                <Badge color="primary text-uppercase">{tag}</Badge>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/posts/${post.fields.slug}`} className="btn btn-outline-primary float-right">Read more</Link>
            </CardBody>
        </Card>
    )
}
