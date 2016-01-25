/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


angular.module('demoApp').controller('EditCardController', ['$scope', '$modalInstance', 'column', '$firebaseObject',  function ($scope, $modalInstance, column, $firebaseObject) {

	function initScope(scope) {
		scope.columnName = column.name;
		scope.column = column;
		scope.title = '';
		scope.details = '';
		
		firebase_id = column[0].firebase_id;
		var workspaceObj = new Firebase(appUrl+"workspaceentires/"+firebase_id);
		scope.workspaceArr = $firebaseObject(workspaceObj);
		
	}
	
	$scope.updateworkspace = function(workspace){
		firebase_id = workspace.$id;
		var workspaceObj = new Firebase(appUrl+"workspaceentires/"+firebase_id);
		workspaceObj.update({  url: workspace.url, description: workspace.description});
		window.location = '';		
	}
	

	$scope.close = function () {
		$modalInstance.close();
	};

  initScope($scope);

}]);

