(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('c_page1', Controller);

    function Controller($scope, $stateParams) {
        $scope.optnlPrm = $stateParams.optnlPrm;
    }

})();
