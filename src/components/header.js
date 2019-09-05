import React, { Component } from 'react'
import { Link } from "gatsby"
import PropTypes from "prop-types"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';



export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar fixed="top" light expand="sm">
          <div className="container">
            <Link className="navbar-brand" to='/'>{this.props.siteTitle}</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link className="nav-link" to="/about">About</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/team">Team</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/tags">Tags</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}



Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


