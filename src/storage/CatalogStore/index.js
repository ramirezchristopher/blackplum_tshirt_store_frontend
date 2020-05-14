import localforage from 'localforage';

class CatalogStore {

    constructor() {

        this.store = localforage.createInstance({
            name: "catalog"
        });

        this.saveItem = this.saveItem.bind(this);
    }

    saveItem(uid, data) {

        var dataCopy = Object.assign({}, data);

        return this.store.setItem(uid, dataCopy)
            .then(persistedData => persistedData)
            .catch(err => console.log(err));
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

export default CatalogStore;
