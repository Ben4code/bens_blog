
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import '../styles/index.scss'
import Footer from '../components/Footer'
import {Row, Col} from 'reactstrap'
import Sidebar from '../components/Sidebar'


const Layout = ({ children, pageTitle, author, authorImg }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
      <Header siteTitle={data.site.siteMetadata.title} /><br/><br/>
      <div className="container" id="content">
        <h1>{pageTitle}</h1>
        <Row>
          <Col md="8">
            <main>{children}</main>  
          </Col>
          <Col md="4">
            <Sidebar author={author} authorImg={authorImg}/>
          </Col>
        </Row>
        
      </div>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
