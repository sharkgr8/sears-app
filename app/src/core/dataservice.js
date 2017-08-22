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
            ready: ready
        };

        return service;

        function getProduct(id) {
            return $http.get(config.productDBURL)
                .then(getProductComplete)
                .catch(getProductFailed);

            function getProductComplete(data, status, headers, config) {
                logger.info(data);
                return data.data.filter(function(item){ return item.id===id; });
            }

            function getProductFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getProduct')(e);
            }
        }

        function getProducts() {
            return $http.get(config.productDBURL)
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
