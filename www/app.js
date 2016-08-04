angular
    .module('myApp', ['ui.router', 'ngAnimate'])
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'pages/home/t_home.html',
            controller: "c_home"
        })
        .state('page', {
            url: '/page',
            views: {
                // ui-view to show additional section if optional state parameters were present
                'additionalInfo@page': {
                    templateUrl: 'pages/page/additional-info.html',
                    controller: function($scope, $stateParams) {
                        $scope.optnlPrm = $stateParams.optnlPrm;
                    }
                },

                // main view
                '': {
                    // dynamically set a template
                    templateUrl: function($stateParams) {
                        return 'pages/page/page' + $stateParams.pgNum + '/t_page' + $stateParams.pgNum + '.html';
                    },
                    // dynamically set a contoller
                    controllerProvider: function($stateParams) {
                        return 'c_page' + $stateParams.pgNum;
                    }
                }
            },
            params: {
                pgNum: null,
                optnlPrm: null //optional parameter
            }
        })
        .state('sharingData', {
            url: '/sharingData',
            templateUrl: 'pages/sharingData/t_sharingData.html',
            controller: "c_sharingData"
        });
}
