import localforage from 'localforage';

class ShoppingCartStore {

    constructor() {

        this.store = localforage.createInstance({
            name: "shoppingcart"
        });
    }

    saveItem(uid, data) {

        var dataCopy = Object.assign({}, data);

        return this.findItemById(uid)
            .then(item => {

                if(item) {

                    dataCopy.quantity = dataCopy.quantity + item.quantity;
                }

                return this.store.setItem(uid, dataCopy)
                    .catch(err => console.log(err));
            });
    }

    findItemById(uid) {

        return this.store.getItem(uid)
            .then(value => {

                return value;
            })
            .catch(err => console.log(err));
    }

    findAll(uidPrefix) {

        let items = [];

        return this.store.iterate((value, key, iterationNumber) => {

                if(key.startsWith(uidPrefix)) {

                    items.push(value);
                }
            })
            .then(() => items)
            .catch(err => console.log(err));
    }

    getItemCount() {

        return this.findAll("CART-ITEM:")
            .then(arr => {

                if(arr) {

                    return arr.reduce((acc, curr) => {

                        return acc + curr.quantity;
                    }, 0);
                }
                else {
                    return 0;
                }
            });
    }

    deleteItem(uid) {

        return this.store.removeItem(uid)
            .then(() => {

                console.log(`Shopping Cart Store: ${uid} has been deleted from the store.`);
            })
            .catch((err) => {

                console.log(err);
            });
    }

    emptyAllItems() {

        return this.store.clear()
            .then(function() {

                console.log('Database is now empty.');
            })
            .catch(function(err) {

                console.log(err);
            });
    }

}

export default ShoppingCartStore;

