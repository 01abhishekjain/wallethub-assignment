// factory to share data between two controllers
angular
    .module('myApp')
    .factory('sharedDataFactory', function() {

    var data = {
        inputText: ""
    };

    return data;
});
