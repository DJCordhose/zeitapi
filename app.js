"use strict";

var ZeitApp = angular.module('ZeitApp', []);

ZeitApp.config(
    ['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'views/select.html',   controller: ZeitCtrl});
    }
])

function ZeitCtrl($scope) {

    $scope.articleFind = function() {
      console.log( "ping" )
    }
}