"use strict";

var ZeitApp = angular.module('ZeitApp', ['ngResource']).
    factory('Project', function($resource) {
        var Project = $resource('http://api.zeit.de/content?q=:' +
            '/angularjs/collections/projects/:id',
            { apiKey: '4f847ad3e4b08a2eed5f3b54',  }, {
                update: { method: 'GET' }
            }
        );

        Project.prototype.update = function(cb) {
            return Project.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Project.prototype.destroy = function(cb) {
            return Project.remove({id: this._id.$oid}, cb);
        };

        return Project;
    });


function ZeitCtrl($scope) {

}
