(function () {
    'use strict';

    angular
        .module('app.dashboard',["ui.bootstrap.typeahead", "ui.bootstrap.tpls"])
        .controller('Dashboard', Dashboard);

    function Dashboard($state, dataservice, loginservice, logger) {
        var vm = this;
        vm.products = [];
        vm.title = 'Dashboard';
        vm.productSelected = ''; // This will hold the selected item from searchbox
        vm.carouselProducts = []; // to hold dashboard carousel products
        vm.gotoProduct = gotoProduct; // View product detail page
        vm.addToCart = addToCart;
        vm.buynow = buynow;
        activate();

        function activate() {
            return getProducts().then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getProducts() {
            return dataservice.getProducts().then(function (data) {
                vm.products = data;
                vm.carouselProducts = data.slice(0,5);
                return vm.products;
            });
        }

        function gotoProduct(p) {
            $state.go('product.detail', {
                id: p.id
            });
        }

        function addToCart(product) {
            dataservice.addToCart(product);
        }

        function buynow(product) {
            vm.addToCart(product);
            loginservice.checkAndRedirect('checkout');
        }
    }
})();
