import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

function ProductBreadcrumbs(props) {

    return (   
      <nav aria-label="Breadcrumb" className="ProductBreadcrumbsContainer">
        <Link className="BreadcrumbHomeLink" to="/">Home</Link>
        <span className="ProductBreadcrumbCurent" aria-current="page">{ props.itemName }</span>
      </nav>
    );
}

export default ProductBreadcrumbs;
