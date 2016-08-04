(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('c_page3', Controller);

    function Controller($scope, $stateParams) {
        $scope.optnlPrm = $stateParams.optnlPrm;
    }

})();
