import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { withRouter, Switch, Redirect } from 'react-router'

/* Components */
import TabMenu from '../TabMenu/';
import MerchandiseCard from '../MerchandiseCard/';
import ShoppingCart from '../checkout/ShoppingCart/';
import { HeaderSection } from '../Header/';
import Footer from '../Footer/';
import ProductDetails from '../ProductDetails/';
import WelcomeBanner from '../WelcomeBanner/';
import { CompanyInfoComponent } from '../info/CompanyInfo/';
import OrderStatus from '../OrderStatus/';

/* Database */
import CatalogStore from '../../storage/CatalogStore/';
import ShoppingCartStore from '../../storage/ShoppingCartStore/';

/* Utility */
import RESTHelper from '../../utility/RESTHelper/';
import storeUserInteraction, { UserInfo } from '../../utility/UserInteractionTracker/';

/* Style */
import './index.css';

const tabs = [
  {
    name: "ABSTRACT",
    displayName: "Abstract Tees"
  },
  {
    name: "ANIMAL",
    displayName: "Animal Tees"
  },
  {
    name: "FOOD",
    displayName: "Food Tees"
  },
  {
    name: "FUNNY",
    displayName: "Funny Tees"
  },
  {
    name: "HOBBY",
    displayName: "Hobby Tees"
  },
  {
    name: "INSPIRING",
    displayName: "Inspiring Tees"
  },
  {
    name: "SCIFI",
    displayName: "Science Fiction Tees"
  }
];

const flowers = [
  "Achillea",
  "Adamsneedle",
  "AfricanBoxwood",
  "AfricanLily"
]

class App extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      menu: {
        isVisible: false
      },
      navigation: {
        clickedTabName: null
      },
      items: [], 
      shoppingCartItemCount: 0,
      isSearching: false
    };

    this.catalogStore = new CatalogStore();
    this.shoppingCartStore = new ShoppingCartStore();

    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);
    
    this.setClickedTabName = this.setClickedTabName.bind(this);
    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    this.refreshShoppingCartItemCount = this.refreshShoppingCartItemCount.bind(this);
    this.storeCatalog = this.storeCatalog.bind(this);
    this.getAllCatalogItems = this.getAllCatalogItems.bind(this);
    this.getCatalogItemsByCategory = this.getCatalogItemsByCategory.bind(this);
    this.getCatalogItemsBySearchTerm = this.getCatalogItemsBySearchTerm.bind(this);
    this.getTabDisplayName = this.getTabDisplayName.bind(this);
    this.clearClickedTabName = this.clearClickedTabName.bind(this);
    this.resetHamburgerMenuOnWindowResize = this.resetHamburgerMenuOnWindowResize.bind(this);
    this.generateRandomId = this.generateRandomId.bind(this);
  }

  componentDidMount() {
    
    let { items } = this.state;
    
    this.resetHamburgerMenuOnWindowResize();
    
    this.storeCatalog()
      .then(() => {
        
        if(items === undefined || items.length === 0) {
          
          this.getAllCatalogItems();
        }
      });
    
    this.refreshShoppingCartItemCount();
    UserInfo.id = this.generateRandomId();
  }
  
  generateRandomId() {
    
    let flower = flowers[Math.floor(Math.random() * flowers.length)];
    let number = Math.floor(Math.random() * 9999);
    
    return `${flower}-${number}`;
  }
  
  storeCatalog() {

    let categoryName = "ALL";
    let url = `${this.RESTHelper.getBaseUrl()}/v1/catalog?category=${categoryName}`;

    return axios(url)
      .then(result => {

        let items = result.data;
        
        if(items) {
          
          this.setState({items: items});
          
          return this.catalogStore.emptyAllItems()
              .then(() => {
  
                return Promise.all(
                
                    items.map(item => {
        
                      let uid = `CATALOG-ITEM:${item.id}`;
                      return this.catalogStore.saveItem(uid, item);
                    })
                )
              });
        }
      })
      .catch(error => console.log(error))
  }
  
  clearClickedTabName(resetCatalog) {
    
    let  { menu } = this.state;
    let menuRef = document.getElementById("HamburgerMenuButton");
    
    if(menuRef) {
      
      menuRef.classList.remove("change");
    }
    
    if(menu.isVisible) {
      
      this.setState({menu: {
        isVisible: false
      }});
    }
    
    this.setState({navigation: {clickedTabName: null}});
    
    if(resetCatalog) {
    
      this.getAllCatalogItems();
    }
  }

  setClickedTabName(tab) {
    
    let { navigation } = this.state;
    let menuRef = document.getElementById("HamburgerMenuButton");
    
    if(navigation.clickedTabName !== tab.name) {
      
      this.setState({navigation: {

        clickedTabName: tab.name
      }});
      
      this.getCatalogItemsByCategory(tab.name);
    }
    
    menuRef.classList.remove("change");
    
    this.setState({menu: {
      isVisible: false
    }});
  }
  
  getTabDisplayName(tabs, name) {
    
    let foundTab = tabs.filter(tab => tab.name === name);
    
    if(!foundTab[0]) {
      
      this.clearClickedTabName(false);
    }
    
    return foundTab[0] ? foundTab[0].displayName : null;
  }
  
  getAllCatalogItems() {
    
    let itemsPromise = this.catalogStore.findAll("CATALOG-ITEM:");
    
    itemsPromise.then(foundItems => {
      
      if(foundItems) {

        this.setState({items: foundItems});
      }
    });
  }
  
  getCatalogItemsByCategory(category) {

    let categoryType = category.toUpperCase();
    let itemsPromise = this.catalogStore.findAll("CATALOG-ITEM:");
    
    itemsPromise.then(catalogItems => {
      
      if(catalogItems) {
        
        let matchedItems = catalogItems.filter(item => item.categoryType === categoryType);
        this.setState({items: matchedItems, isSearching: false});
      }
    });
  }

  getCatalogItemsBySearchTerm(searchTerms) {
    
    let { history } = this.props;

    history.push('/');
    
    if(searchTerms) {

      let itemsPromise = this.catalogStore.findAll("CATALOG-ITEM:");
      
      itemsPromise.then(catalogItems => {
        
        if(catalogItems) {
          
          let searchMatches = catalogItems.filter(item => item.searchTerms.some(term => searchTerms.indexOf(term) >= 0));
          
          this.setState({items: searchMatches, isSearching: true});
          this.clearClickedTabName(false);
          
          return searchMatches;
        }
      })
      .then(searchMatches => {

        storeUserInteraction("SEARCH", {terms: searchTerms.join(","), matches: searchMatches.length});
      });
    }
  }
  
  resetHamburgerMenuOnWindowResize() {
    
    window.addEventListener('resize', function(e) {
        
      if(window.matchMedia("(min-width: 42em)").matches) {
        
        this.setState({menu: {
          isVisible: true
        }});
      }
      else {
        
        let menuRef = document.getElementById("HamburgerMenuButton");
        
        if(menuRef) {
          
          menuRef.classList.remove("change");
          
          this.setState({menu: {
            isVisible: false
          }});
        }
      }
      
    }.bind(this), false);
  }
  
  toggleHamburgerMenu(menuRef) {

    let {menu} = this.state;

    menuRef.classList.toggle("change");

    this.setState({menu: {
      isVisible: !menu.isVisible
    }});
  }

  refreshShoppingCartItemCount() {

    let countPromise = this.shoppingCartStore.getItemCount();

    return countPromise.then(count => {

      this.setState({shoppingCartItemCount: count});
    });
  }
  
  render() {
    
    let {menu, navigation, items, shoppingCartItemCount, isSearching} = this.state;
    
    return(
        <div className="GridContainer">
          
          <HeaderSection 
            clearClickedTabName={this.clearClickedTabName} 
            toggleHamburgerMenu={this.toggleHamburgerMenu} 
            shoppingCartItemCount={shoppingCartItemCount} 
            getCatalogItemsBySearchTerm={this.getCatalogItemsBySearchTerm} />

          <Switch>
            <Route path="/" render={() => (
              <React.Fragment>
  
                <TabMenu doOnNavClick={this.setClickedTabName} tabs={tabs} clickedTabName={navigation.clickedTabName} menu={menu} />

                { !isSearching ? 
                    
                    <WelcomeBanner navigation={navigation} />
                  
                  : <div className="SearchResultsTitle">Search Results</div>
                }
                
                <div className="PageNameContainer">
                  {
                    navigation.clickedTabName ? 
                        
                      <h1 className="PageName">{ this.getTabDisplayName(tabs, navigation.clickedTabName) }</h1>
                      : null
                  }
                </div>
  
                <main className="ContentContainer">
                {
                  navigation.clickedTabName ? 
                      
                    items.map(item => {
                      
                      return <MerchandiseCard key={item.id} item={item} />
                    })
                    
                    : 
                    
                    <React.Fragment>
                      { /* List all items */
                        items.map(item => {
                      
                          return <MerchandiseCard key={item.id} item={item} />
                        })
                      }
                    </React.Fragment>
                }
                </main>
                
              </React.Fragment>
  
            )} exact />

            <Route path="/details/:productId" render={(props) => (

              <ProductDetails {...props} refreshShoppingCartItemCount={this.refreshShoppingCartItemCount} />
            )} exact />

                
            <Route path="/info" render={(props) => (
              <CompanyInfoComponent {...props} setClickedTabName={this.setClickedTabName} clickedTabName={navigation.clickedTabName} getTabDisplayName={this.getTabDisplayName} menu={menu} />
            )} />
            
            <Route path="/cart" render={(props) => (
                
              <ShoppingCart {...props} refreshShoppingCartItemCount={this.refreshShoppingCartItemCount} />
            )} exact />
            
            <Route path="/order/:transactionId" render={(props) => (
                <OrderStatus {...props} />
             )} />
            
            {/* fallback to homepage */}
            <Redirect to="/" />
            
          </Switch>

          <Footer clearClickedTabName={this.clearClickedTabName}  />

        </div>
    );
  }
}

export const AppComponent = withRouter(App);

