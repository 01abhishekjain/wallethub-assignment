(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('c_sharingData', Controller);

    function Controller($scope, sharedDataFactory) {
    	$scope.data = sharedDataFactory.inputText;
    }

})();
