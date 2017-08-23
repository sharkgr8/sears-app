(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, config, exception, logger) {
        /* jshint validthis:true */
        var readyPromise;

        var service = {
            getProduct: getProduct,
            getProducts: getProducts,
            getCustomers: getCustomers,
            addToCart: addToCart,
            getCartItems: getCartItems,
            ready: ready
        };

        return service;

        function getProduct(id) {
            return $http.get(config.dataURL + 'products.json')
                .then(getProductComplete)
                .catch(getProductFailed);

            function getProductComplete(data, status, headers, config) {
                return data.data.filter(function(item){ return item.id==id; })[0];
            }

            function getProductFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getProduct')(e);
            }
        }

        function getProducts() {
            return $http.get(config.dataURL + 'products.json')
                .then(getProductsComplete)
                .catch(getProductsFailed);

            function getProductsComplete(data, status, headers, config) {
                return data.data;
            }

            function getProductsFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getProducts')(e);
            }
        }

        function getCustomers() {
            return $http.get(config.dataURL + 'customers.json')
                .then(getCustomersComplete)
                .catch(getCustomersFailed);

            function getCustomersComplete(data, status, headers, config) {
                return data.data;
            }

            function getCustomersFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getCustomers')(e);
            }
        }

        function addToCart(product) {
            var myCart = config.cart;
            var found = false;
            for (var i = 0; i < myCart.length; i++) {
                if(myCart[i].id == product.id){
                    myCart[i].qty++;
                    myCart[i].totalPrice += myCart[i].unitPrice;
                    found = true;
                } 
            }

            if(!found) {
                myCart.push({
                    'id': product.id,
                    'name': product.name,
                    'qty': 1,
                    'unitPrice': product.price,
                    'totalPrice': product.price
                });
            }
            config.cart = myCart;
        }

        function getCartItems() {
            return config.cart;
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
