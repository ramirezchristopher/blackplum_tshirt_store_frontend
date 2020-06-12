import React, { Component, Suspense } from 'react';

/* Components */

import Loading from '../Loading/';

import './index.css';

/* Database */
import CatalogStore from '../../storage/CatalogStore/';
import ShoppingCartStore from '../../storage/ShoppingCartStore/';

/* Utility */
import storeUserInteraction from '../../utility/UserInteractionTracker/';

const ProductBreadcrumbs = React.lazy(() => import('../ProductBreadcrumbs/'));
const SizeChart = React.lazy(() => import('../SizeChart/'));

const PRODUCT_ATTRIBUTE = {

  size: "SIZE",
  color: "COLOR",
  quantity: "QUANTITY"
}

class ProductDetails extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      isLoading: false,
      catalogItem: {}, 
      userSelections: {
        size: "M", 
        color: "White", 
        quantity: 1
      },
      hasProductDetailsLoaded: false, 
      selectedThumbnail: 1,
      productImageViewportUrl: "", 
      overlayActive: false
    };

    this.sleep = this.sleep.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.setUserSelection = this.setUserSelection.bind(this);
    this.selectThumbnail = this.selectThumbnail.bind(this);
    this.isActiveElement = this.isActiveElement.bind(this);
    this.isActiveThumbnail = this.isActiveThumbnail.bind(this);
    this.showSuccessOverlay = this.showSuccessOverlay.bind(this);
    this.loadProductDetails = this.loadProductDetails.bind(this);
    this.getItemOptionsBySelectedColor = this.getItemOptionsBySelectedColor.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
    this.getExternalVariantId = this.getExternalVariantId.bind(this);
    this.zoomer = this.zoomer.bind(this);
    this.disableImageRightClick = this.disableImageRightClick.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    
    // Storage
    this.catalogStore = new CatalogStore();
    this.shoppingCartStore = new ShoppingCartStore();
  }

  componentDidMount() {
    
    window.scrollTo(0, 0);
    
    this.zoomer();
    this.disableImageRightClick();
    
    this.loadProductDetails()
      .then(() => {
    
        // catalog store may not have been loaded, retry
        this.sleep(1000)
          .then(() => {
            // First attempt
            return this.loadProductDetails();
          })
          .then(() => {
            // Retry 1
            this.sleep(2000)
              .then(() => {
                
                return this.loadProductDetails();
              })
              .then(() => {
                // Retry 2
                this.sleep(3000)
                  .then(() => {
                    
                    return this.loadProductDetails();
                  });
              });
          });
      });
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  disableImageRightClick() {
    
    let pictures = document.getElementsByTagName("picture");
    
    for(var i = 0; i < pictures.length; i++) {
      
      pictures[i].addEventListener('contextmenu', function(e) {
    
        e.preventDefault();
        return false;
      });
    }
  }
  
  loadProductDetails() {
    
    let { hasProductDetailsLoaded } = this.state;
    let {match: {params}} = this.props;

    if(!hasProductDetailsLoaded) {
      
      this.setIsLoading(true);
      
      let storedCatalogItemPromise = this.catalogStore.findItemById(`CATALOG-ITEM:${params.productId}`);

      return storedCatalogItemPromise
        .then(storedCatalogItem => {
  
          if(storedCatalogItem) {
  
            this.setState({
              isLoading: false, 
              catalogItem: storedCatalogItem,  
              hasProductDetailsLoaded: true, 
              productImageViewportUrl: storedCatalogItem.options[0].frontTeePreviewUrl
            });
            
            document.title = `Black Plum Apparel - ${storedCatalogItem.name}`;
          }
          
          return storedCatalogItem;
        })
        .then(catalogItem => {
        
          if(catalogItem) {
          
            storeUserInteraction("VIEW_ITEM", {name: catalogItem.name, id: catalogItem.id});
          }
        });
    }
  }

  addItemToCart(event) {

    let buttonElem = event.target;
    let { catalogItem, userSelections } = this.state;
    let { refreshShoppingCartItemCount } = this.props;
    let uid = `CART-ITEM:${catalogItem.id}-${userSelections.size}-${userSelections.color}`;

    this.showSuccessOverlay(buttonElem);

    buttonElem.disabled = true;
    buttonElem.innerHTML = "Added";

    this.shoppingCartStore.saveItem(uid, { 
        ...userSelections, 
        id: catalogItem.id, 
        externalVariantId: this.getExternalVariantId(), 
        name: catalogItem.name, 
        price: catalogItem.price, 
        imageUrl: this.getImageUrl(), 
        imageAltDescription: catalogItem.imageAltDescription
      })
      .then(() => {

        let interactionData = {
          name: catalogItem.name, 
          id: catalogItem.id, 
          size: userSelections.size, 
          color: userSelections.color, 
          quantity: userSelections.quantity
        }

        refreshShoppingCartItemCount();
        return storeUserInteraction("ADD_TO_CART", interactionData);
      });
  }
  
  getImageUrl() {
    
    let { catalogItem, userSelections } = this.state;
    
    return catalogItem.options
      .filter(item => item.color === userSelections.color)
      .map(size => size.frontTeeThumbnailUrl)[0];
  }
  
  getExternalVariantId() {
    
    let { catalogItem, userSelections } = this.state;
    
    return catalogItem.options
      .filter(item => item.color === userSelections.color)
      .map(item => item.sizes)[0]
      .filter(size => size.size === userSelections.size)
      .map(size => size.externalVariantId)[0];
  }

  showSuccessOverlay(buttonElem) {

    this.setState({overlayActive: true});

    setTimeout(function() {
      
      buttonElem.disabled = false;
      buttonElem.innerHTML = "Add To Cart";
      this.setState({overlayActive: false});
    }
    .bind(this), 2000, buttonElem);
  }

  setUserSelection(selectionType, value) {

    let { userSelections, catalogItem } = this.state;

    if(selectionType === PRODUCT_ATTRIBUTE.size) {

      this.setState({userSelections: {
        ...userSelections, 
        size: value
      }});
    }
    else if(selectionType === PRODUCT_ATTRIBUTE.color) {

      let selectedSize = catalogItem.options
        .filter(item => item.color === value.color)
        .map(item => item.sizes)[0]
        .filter(size => size.size === userSelections.size)
        .map(size => size.size)[0];
      
      let firstSize = catalogItem.options
        .filter(item => item.color === value.color)
        .map(item => item.sizes)[0][0].size;
    
      let bestGuessSize = selectedSize ? selectedSize : firstSize;
    
      this.setState({userSelections: {
          ...userSelections, 
          color: value.color, 
          size: bestGuessSize
        },
        productImageViewportUrl: value.productImageViewportUrl,
        selectedThumbnail: 1
      });
    }
    else if(selectionType === PRODUCT_ATTRIBUTE.quantity) {

      this.setState({userSelections: {
        ...userSelections, 
        quantity: value
      }});
    }
  }

  isActiveElement(productAttribute, value) {

    let { userSelections } = this.state;
    let isActive = false;

    if(productAttribute === PRODUCT_ATTRIBUTE.size) {

      isActive = userSelections.size === value;
    }
    else if(productAttribute === PRODUCT_ATTRIBUTE.color) {

      isActive = userSelections.color === value;
    }

    return isActive;
  }

  selectThumbnail(index, productImageViewportUrl) {

    this.setState({selectedThumbnail: index, productImageViewportUrl});
  }

  isActiveThumbnail(index) {

    let { selectedThumbnail } = this.state;

    return selectedThumbnail === index;
  }
  
  getItemOptionsBySelectedColor() {
    
    let { catalogItem, userSelections } = this.state;    
    let options = catalogItem.options;
    
    let option = options ? options.filter(option => option.color === userSelections.color)[0] : null
        
    return option;
  }
  
  zoomer() {
    
    document.getElementById('img-zoomer-box').addEventListener('mousemove', function(e) {

      var original = document.getElementById('NonZoomedImage'),
          magnified = document.getElementById('ZoomedImage'),
          style = magnified.style,
          x = e.pageX - this.offsetLeft,
          y = e.pageY - this.offsetTop,
          imgWidth = original.width,
          imgHeight = original.height,
          xperc = ((x/imgWidth) * 100),
          yperc = ((y/imgHeight) * 100);

      //lets user scroll past right edge of image
      if(x > (.01 * imgWidth)) {
        
        xperc += (.15 * xperc);
      };

      //lets user scroll past bottom edge of image
      if(y >= (.01 * imgHeight)) {
        
        yperc += (.15 * yperc);
      };

      style.backgroundPositionX = (xperc - 9) + '%';
      style.backgroundPositionY = (yperc - 9) + '%';

      style.left = (x - 180) + 'px';
      style.top = (y - 180) + 'px';

    }, false);
  }
  
  setIsLoading(value) {
    
    this.setState({isLoading: value});
  }

  render() {

    const { isLoading, catalogItem, userSelections, productImageViewportUrl, overlayActive } = this.state;
    
    let options = this.getItemOptionsBySelectedColor();
    
    let thumb1Src = options ? options.frontTeeThumbnailUrl : "";
    let preview1Src = options ? options.frontTeePreviewUrl : "";
    let thumb2Src = options ? options.backTeeThumbnailUrl : "";
    let preview2Src = options? options.backTeePreviewUrl : "";
    let thumb3Src = options ? options.artworkThumbnailUrl : "";
    let preview3Src = options ? options.artworkPreviewUrl : "";
    
    let price = catalogItem.price ? catalogItem.price.toFixed(2) : catalogItem.price;
    let zoomStyle = {
        background: 'url(' + productImageViewportUrl + ') no-repeat #FFF'
    }

    return (
        
      <React.Fragment>
        { 
          isLoading ?  
            
            <Loading />
          : null
        }
        
        <main className="ProductDetails">     

          <Suspense fallback={<div>Loading...</div>}>
              <ProductBreadcrumbs itemName={ catalogItem.name } />
          </Suspense>
        
          <div className="ProductThumbsContainer">
          <div className={this.isActiveThumbnail(1) ? "ActiveThumbOption ProductImageThumbContainer" : "ProductImageThumbContainer Bordered"}  onClick={() => this.selectThumbnail(1, preview1Src)}>
              <picture>
                <img src={ thumb1Src } alt="View tee shirt front side" id="MockupThumbnailPicture" className="ProductImageThumb" />
              </picture>
            </div>
              
            <div className={this.isActiveThumbnail(2) ? "ActiveThumbOption ProductImageThumbContainer" : "ProductImageThumbContainer Bordered"} onClick={() => this.selectThumbnail(2, preview2Src)}>
              <picture>
                <img src={ thumb2Src } alt="View tee shirt artwork only" id="ArtworkThumbnailPicture" className="ProductImageThumb" />
              </picture>
            </div>
            
            <div className={this.isActiveThumbnail(3) ? "ActiveThumbOption ProductImageThumbContainer" : "ProductImageThumbContainer Bordered"} onClick={() => this.selectThumbnail(3, preview3Src)}>
              <picture>
                <img src={ thumb3Src } alt="View tee shirt back side" className="ProductImageThumb" />
              </picture>
            </div>
          </div>
  
          <div className="ProductImageViewport Bordered" id="img-zoomer-box">
            <picture>
              <img src={ productImageViewportUrl } className="ProductImage" id="NonZoomedImage" />
            </picture>
            <div id="ZoomedImage" style={zoomStyle}></div>
          </div>
  
          <div className="ProductInfoContainer FormSection">
            <h1>{catalogItem.name}</h1>
            <div className="ProductCategory">UNISEX</div>
            <div className="ProductPrice">$ {price}</div>
          </div>
  
          <div className="ProductDescriptionContainer FormSection">
            <div className="ProductDescription">{catalogItem.description}</div>
          </div>
          <div className="MaterialsInfoContainer FormSection">
          
            <ul>
              {
                catalogItem.materialsInfo ? catalogItem.materialsInfo.map(info => {
                  
                  return (
                    <li>{info}</li>
                  )
                }) : null
              }
            </ul>
          </div>
          <div className="CareInstructionsContainer FormSection">
            Recommended Care:
            <div className="CareInstructions">{catalogItem.careInstructions}</div>
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
              <SizeChart categoryType={catalogItem.categoryType} />
          </Suspense>
  
          <div className="SizeSelectContainer FormSection">
            <label id="SizeOptionsLabel" className="FormLabel">Size:&nbsp;&nbsp;{userSelections.size}</label>
            
            {
              options ? options.sizes.map(sizeObj => {
                
                let isActiveSizeSelection = this.isActiveElement(PRODUCT_ATTRIBUTE.size, sizeObj.size);
                let label = "Size Option: " + sizeObj.size;
                
                return <button aria-label={label} className={isActiveSizeSelection ? "ActiveSizeOption SizeOption" : "SizeOption Bordered"} onClick={() => this.setUserSelection(PRODUCT_ATTRIBUTE.size, sizeObj.size)}>{sizeObj.size}</button>
              }) : null
            }
          </div>
          
          <div className="ColorSelectContainer FormSection">
            <label id="ColorOptionsLabel" className="FormLabel">Color:&nbsp;&nbsp;{userSelections.color}</label>
            
              {
                catalogItem.options ? catalogItem.options.map((option, idx) => {
                  
                  let isActiveColorOption = this.isActiveElement(PRODUCT_ATTRIBUTE.color, option.color);
                  let label = "Color Option: " + option.color;
    
                  return <button aria-label={label} className={isActiveColorOption ? `ColorOption Active ${option.styleClassName}` : `ColorOption Bordered ${option.styleClassName}`} title={option.color} onClick={() => this.setUserSelection(PRODUCT_ATTRIBUTE.color, {color: option.color, productImageViewportUrl: catalogItem.options[idx].frontTeePreviewUrl})}></button>
                }) : null
              }
            </div>
  
          <div className="AddToCartButtonContainer FormSection">
            <button className={overlayActive ? "LargeButton Active" : "LargeButton"} onClick={(event) => this.addItemToCart(event)}>Add To Cart</button>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
