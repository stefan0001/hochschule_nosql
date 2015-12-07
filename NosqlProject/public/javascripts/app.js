var app = angular.module('searchApp', ['naif.base64']);

app.controller('SearchController', searchController);
app.controller('DocumentController', documentController);


function searchController($scope, $http) {
    $scope.documents = [];
    $scope.search = search;
    $scope.searchtext = "";
    $scope.search();
    function search() {
        $http({
            method: 'GET',
            url: '/documents/search/' + encodeURI($scope.searchtext)
        }).then(function (response) {
            $scope.documents = response.data.documents;
        });
    }
}

function documentController($scope, $http) {
    $scope.newDocument = {};
    $scope.createDocument = createDocument;
    $scope.deleteDocument = deleteDocument;
    $scope.file = null;
    
    function deleteDocument(id) {

    }

    function createDocument() {
        console.log(JSON.stringify($scope.newDocument));
        
        $http({
            method: 'POST',
            url: '/documents',
            data: {
                title: $scope.newDocument.title,
                filename: $scope.newDocument.file.filename,
                type : $scope.newDocument.file.filetype,
                file: $scope.newDocument.file.base64
            }
        });
    }
}
