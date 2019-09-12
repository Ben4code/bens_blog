const slugify = require('slugify');
const path = require('path');
const authors = require('./src/util/authors');

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title);
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const singlePostTemplate = path.resolve('./src/templates/singlePost.js');
    const tagsPageTemplate = path.resolve('./src/templates/tagsPage.js');

    return graphql(`
    
        {
            allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
                edges {
                  node {
                    frontmatter {
                      author
                      tags
                    }
                    fields{
                        slug
                    }
                  }
                }
            }
        }
    `).then(res => {
        if (res.errors) {
            return res.errors;
        }

        const posts = res.data.allMarkdownRemark.edges;

        posts.forEach(({ node }) => {
            createPage({
                path: `/posts/${node.fields.slug}`,
                component: singlePostTemplate,
                context: {
                    slug: node.fields.slug,
                    imgUrl: authors.find(author => author.name === node.frontmatter.author).imgUrl
                }
            })
        })


        // ------- Tags page -------------

        let tags = [];
        posts.forEach(({ node }) => {
            if (node.frontmatter.tags.length > 0) {
                tags.push(...node.frontmatter.tags);
            }
        })

        if (tags) {
            let filteredTags;
            filteredTags = tags.reduce((accumTag, currentTag) => {
                accumTag[currentTag] ? accumTag[currentTag] = accumTag[currentTag] + 1 : accumTag[currentTag] = 1;
                return accumTag;
            }, {})
            let filteredTagsArr = Object.entries(filteredTags);
            filteredTagsArr.forEach((tag) => {
                let tagSlug = slugify(tag[0], { lower: true });
                console.log(tagSlug, tag[0], tag[1])
                createPage({
                    path: `/tags/${tagSlug}`,
                    component: tagsPageTemplate,
                    context: {
                        tagTitle: tag[0]
                    }
                })
            })

        }



    })
}