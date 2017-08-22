(function() {
    
        'use strict';
    
        angular.module('app', [
            /* Shared modules */
            'app.core',
            'app.widgets',
    
            /* Feature areas */
            'app.products',
            'app.dashboard',
            'app.layout'
        ]);
    
})();