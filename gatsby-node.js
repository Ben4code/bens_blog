const slugify = require('slugify');
const path = require('path');
const authors = require('./src/util/authors');

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
    const singlePastTemplate = path.resolve('./src/templates/singlePost.js');

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
                    slug: node.fields.slug,
                    imgUrl: authors.find( author => author.name === node.frontmatter.author).imgUrl
                }
            })
        })

        // let tags = [];
        // posts.forEach(({node})=> {
        //     if(node.frontmatter.tags.length > 0){
        //          tags.push(...node.frontmatter.tags);
        //     }
        //     return tags;
        // })
        // console.log("---------------",tags, "---------------");
        // if(tags){
        //    const vals = tags.reduce((accumTag, currentTag)=>{               
        //     accumTag[currentTag] ? accumTag[currentTag] = accumTag[currentTag] + 1 : accumTag[currentTag] = 1;
        //     return accumTag;
        //     }, {})
        //     console.log(vals);
        // }
        
    })
}