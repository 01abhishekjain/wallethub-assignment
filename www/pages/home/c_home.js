(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('c_home', Controller)
        .directive('formatCurrency', currencyDirective)
        .directive('formatPhone', phoneDirective);

    function Controller($scope, sharedDataFactory, itemsArrFactory) {
        console.log("home");

        $scope.itemsArr = itemsArrFactory.items;

        $scope.data = {
            number1: 0,
            number2: 0,
            number3: 0,
            number4: 0
        };
        $scope.addNumbers = function() {
            var n1 = parseInt($scope.data.number1),
                n2 = parseInt($scope.data.number2),
                n3 = parseInt($scope.data.number3);
            $scope.data.number4 = n1 + n2 + n3;
        }
        $scope.spreadNums = function() {
            $scope.data.number1 = $scope.data.number2 = $scope.data.number3 = $scope.data.number4 / 3;
        }

        function move(e) {
            console.log('e ', e);
        }

        $scope.updateFactoryData = function() {
            sharedDataFactory.inputText = $scope.inputText;
        }

        var container = document.getElementsByClassName("container")[0];
        container.onkeyup = function(e) {
            var target = e.srcElement;
            var maxLength = parseInt(target.attributes["maxlength"].value, 10);
            var myLength = target.value.length;
            if (myLength >= maxLength) {
                var next = target;
                while (next = next.nextElementSibling) {
                    if (next == null)
                        break;
                    if (next.tagName.toLowerCase() == "input") {
                        next.focus();
                        break;
                    }
                }
            }
            else if(myLength==0){
            	var next = target;
            	while (next = next.previousElementSibling) {
            	    if (next == null)
            	        break;
            	    if (next.tagName.toLowerCase() == "input") {
            	        next.focus();
            	        break;
            	    }
            	}
            }
        }
    }

    function currencyDirective($parse) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {

                    if (typeof inputValue != 'undefined') {
                        inputValue = inputValue.toString();
                        // remove all commas and non digits
                        inputValue = inputValue.replace(/[^\d]/g, '');

                        if (inputValue.length > 3) {

                            var arr = inputValue.split("").reverse();
                            for (var i = 3; i < arr.length; i += 4) {
                                arr.splice(i, 0, ",");
                            }
                            formatted = arr.reverse().join("");

                        } else {
                            var formatted = inputValue;
                        }
                        modelCtrl.$viewValue = '$' + formatted;
                        modelCtrl.$render();

                    }
                }
                var model = $parse(attrs.ngModel);
                modelCtrl.$parsers.push(capitalize);
                capitalize(model(scope));
            }
        };
    }

    function phoneDirective($parse) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {

                    if (typeof inputValue != 'undefined') {
                        inputValue = inputValue.toString();
                        // remove all commas and non digits
                        inputValue = inputValue.replace(/[^\d()-]/g, '');

                        switch (inputValue.length) {
                            case 1:
                                inputValue = '(' + inputValue;
                                break;
                            case 4:
                                inputValue = inputValue + ')';
                                break;
                            case 8:
                                inputValue = inputValue + '-';
                                break;
                        }
                        if (inputValue.length > 13) {
                            inputValue = inputValue.slice(0, 13);
                        }
                        modelCtrl.$viewValue = inputValue;
                        modelCtrl.$render();
                    }
                }
                var model = $parse(attrs.ngModel);
                modelCtrl.$parsers.push(capitalize);
                capitalize(model(scope));
            }
        };
    }

})();
