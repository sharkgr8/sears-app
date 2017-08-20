(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('htImgProduct', htImgProduct);

    /* @ngInject */
    function htImgProduct (config) {
        //Usage:
        //<img ht-img-person="{{person.imageSource}}"/>
        var basePath = config.imageBasePath;
        var unknownImage = config.unknownProductImageSource;
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('htImgProduct', function (value) {
                value = value ||  (basePath + unknownImage);
                attrs.$set('src', value);
            });
        }
    }
})();
