const slugify = require('slugify');
const path = require('path')

exports.onCreateNode = ({node, actions}) => {
    const {createNodeField} = actions;
    
    if(node.internal.type === 'MarkdownRemark'){
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = ({actions, graphql}) => {
    const {createPage } = actions;
    const singlePastTemplate = path.resolve('./src/templates/SinglePost.js');

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
    `).then( res=> {
        if(res.errors){
            return res.errors;
        }

        const posts = res.data.allMarkdownRemark.edges;

        posts.forEach(({node})=>{
            createPage({
                path: `/posts/${node.fields.slug}`,
                component: singlePastTemplate,
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}