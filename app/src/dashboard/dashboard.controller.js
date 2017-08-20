(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard($state, dataservice, logger) {
        var vm = this;
        vm.products = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            return getProducts().then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getProducts() {
            return dataservice.getProducts().then(function (data) {
                vm.products = data;
                return vm.products;
            });
        }
    }
})();
