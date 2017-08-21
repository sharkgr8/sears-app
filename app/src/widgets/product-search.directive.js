(function () {
    'use strict';

    angular
        .module('app.widgets',  ["ui.bootstrap"])
        .directive('htProductSearch', htProductSearch);

    /* @ngInject */
    function htProductSearch ($timeout) {
        //Usage:
        //<ht-product-search/>
       
        var directive = {
            restrict: 'E',
            scope: {
                items: '=',
                prompt: '@',
                name: '@',
                model: '=',
                onSelect: '&'
            },
            template: `<input type="text" ng-model="model" placeholder="Search" uib-typeahead="item as item.name for item in items | filter:{name:$viewValue}" typeahead-template-url="src/widgets/product-search.template.html" class="form-control" typeahead-show-hint="true" typeahead-min-length="2">`,
            link: function(scope, elem, attrs) {
                scope.handleSelection = function(selectedItem) {
                    scope.model = selectedItem;
                    scope.current = 0;
                    scope.selected = true;
                    $timeout(function() {
                      scope.onSelect();
                    }, 200);
                  };
                  scope.current = 0;
                  scope.selected = true; // hides the list initially
                  scope.isCurrent = function(index) {
                    return scope.current == index;
                  };
                  scope.setCurrent = function(index) {
                    scope.current = index;
                  };
            }
        };
        return directive;
    }
})();