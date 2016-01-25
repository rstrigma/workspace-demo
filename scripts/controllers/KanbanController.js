/*Main Workspace Controller*/
/*global angular: false */

'use strict';

angular.module('demoApp').controller('KanbanController', ['$scope', 'BoardService', '$firebaseObject', function ($scope, BoardService, $firebaseObject) {


	/***************** Get the firebase bookmarks data and store it a temp variable********************************/
	
	var ref = new Firebase(appUrl);
	var getRef = ref.child("workspaceentires");
	var messages = $firebaseObject(getRef);
	
	
	messages.$loaded().then(function(){
		
		/* Define static array according to Bookmarks, Drafts and finalized entry */
		var setFirebaseArrBkmrks = []; var setFirebaseKeyArrBkmrks = [];
		var setFirebaseArrDrafts = []; var setFirebaseKeyArrDrafts = [];
		var setFirebaseArrFnlzd = []; var setFirebaseKeyArrFnlzd = [];
	   
	   
	   angular.forEach(messages, function(message, key) {
			console.log(message.workspace_id);
			
			/* Conditional Bookmarks array setup */
			if(message.workspace_id=='Bookmarks'){
				setFirebaseArrBkmrks.push({"title":message.url});
				setFirebaseKeyArrBkmrks.push({"firebaseid":key});
			}
			
			/* Conditional Drafts array setup */
			if(message.workspace_id=='Drafts'){
				setFirebaseArrDrafts.push({"title":message.url});
				setFirebaseKeyArrDrafts.push({"firebaseid":key});
			}
			
			/* Conditional Drafts array setup */
			if(message.workspace_id=='Finalized'){
				setFirebaseArrFnlzd.push({"title":message.url});
				setFirebaseKeyArrFnlzd.push({"firebaseid":key});
			}
			
        });
		
		/*** get the entries for bookmarks, drafts and finalized ***/
		$scope.bkmrks = {"columns":
			[
				{ "id": "1", "name": "Bookmarks", "cards": setFirebaseArrBkmrks, 'firebaseid':setFirebaseKeyArrBkmrks},
				{ "id": "2", "name": "Drafts", "cards": setFirebaseArrDrafts, 'firebaseid':setFirebaseKeyArrDrafts},
				{ "id": "3", "name": "Finalized", "cards": setFirebaseArrFnlzd, 'firebaseid':setFirebaseKeyArrFnlzd }
			]
		};
		
		/*** Push the dynamic array here ***/
		$scope.kanbanBoard = BoardService.kanbanBoard($scope.bkmrks);

	});
	

	/*** Remove the data ***/
	$scope.removeCard = function (column, card) {
		if (confirm('Are You sure to Delete?')) {
			var fredRef = new Firebase(workspaceRefUrl+card.details);
			fredRef.remove();
			BoardService.removeCard($scope.kanbanBoard, column, card);
		}
	};

	/*** Add the data ***/
	$scope.addNewCard = function (column) {
		BoardService.addNewCard($scope.kanbanBoard, column);
	};
	
	/*** Add the data ***/
	$scope.editCard = function (column, card) {
			BoardService.editCard(column,card);
	}
	
}]);
