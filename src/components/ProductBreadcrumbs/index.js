import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class ProductBreadcrumbs extends Component {
  
  render() {
    
    let { itemName } = this.props;

    return (   

      <nav aria-label="Breadcrumb" className="ProductBreadcrumbsContainer">
        <Link className="BreadcrumbHomeLink" to="/">Home</Link>
        <span className="ProductBreadcrumbCurent" aria-current="page">{ itemName }</span>
      </nav>

    );
  }
}

export default ProductBreadcrumbs;
