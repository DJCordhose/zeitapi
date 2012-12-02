"use strict";

var ZeitApp = angular.module('ZeitApp', ['ng']).config(['$httpProvider', function (http) {
        delete http.defaults.headers.common['X-Requested-With'];
    }]).factory('Content', function ($http) {
        var Content = {
            get:function (params, cb) {
                var url = 'http://api.zeit.de/content?q=*' + params.id.toLowerCase() + '*&limit=10';
                $http.get(url, {
                    headers:{'X-Authorization':'b56eb8f8068394f30c303747f837e46f6bf265c18b80d8dc0743'}
                }).success(function(data, status, headers, config) {
                        cb(data);
                    }).error(function(data, status, headers, config) {
                        cb(data);
                    });
            }
        };

        return Content;
    }).factory('Details', function ($http) {
        var Details = {
            get:function (uri, cb) {
                $http.get(uri, {
                    headers:{'X-Authorization':'b56eb8f8068394f30c303747f837e46f6bf265c18b80d8dc0743'}
                }).success(function(data, status, headers, config) {
                        cb(data);
                    }).error(function(data, status, headers, config) {
                        cb(data);
                    });
            }
        };

        return Details;
    });

ZeitApp.config(
    ['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl:'views/select.html', controller:ZeitCtrl})
            .when( '/articles', {templateUrl: "views/articles.html", controller:ZeitCtrl})
            .when( '/article/details', {templateUrl: "views/details.html", controller: ZeitCtrl});
    }
    ])


function ZeitCtrl($scope, Content, Details, $location) {
    $scope.articleFind = function (keyword) {
      $scope.searchPerformed = true;
      Content.get({id: keyword}, function(articleList) {
          $scope.$parent.articles = articleList.matches;
          if ($scope.itemsFound()) {
              $location.path('/articles');
          }
      });
    }

    $scope.itemsFound = function () {
        return !$scope.searchPerformed || ($scope.$parent.articles && $scope.$parent.articles.length != 0);
    }

    $scope.details = function(article) {
        var uri = article.uri;
        Details.get(uri, function(details) {
            $scope.$parent.details = details;
            $location.path('/article/details');
        });
    }
}

function ArticlesCtrl ($scope) {
}


function DetailsCtrl ($scope) {
}