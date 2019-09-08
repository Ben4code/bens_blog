import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TagsPage = ({ pageContext }) => (
  <Layout pageTitle="List of tags">
    <SEO title="Tags" keywords={["tags", "topics"]}/>
  </Layout>
)

export default TagsPage
