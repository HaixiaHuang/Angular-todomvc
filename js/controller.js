// todomvc业务（功能）逻辑模块

(function(angular) {

angular
	.module('todoApp.controller', [])
	.controller('TodoController', ['$scope', '$location', 'DataService', TodoController]);

	// 控制器函数
	function TodoController($scope, $location, DataService) {
		var vm = $scope;

		// 1 展示任务列表
		vm.taskList = DataService.getData();

		// 2 添加任务
		vm.newTask = '';
		vm.add = function() {
			if(vm.newTask.trim() === '') {
				return;
			}

			// 调用保存数据的方法
			DataService.setData( vm.newTask );

			// 清空文本框内容
			vm.newTask = '';
			vm.allChecked = false;
		};

		// 3 删除一条任务
		vm.remove = function( id ) {
			DataService.remove( id );
		};

		// 4 修改任务
		vm.editId = 0;
		vm.edit = function( id ) {
			vm.editId = id;
		};
		// 保存内容
		vm.update = function() {
			vm.editId = 0;

			// 保存数据
			DataService.save();
		};

		// 5 切换任务选中状态(单个或批量)
		vm.toggleItem = function() {
			vm.allChecked = DataService.allChecked();
			DataService.save();
		};
		vm.allChecked = DataService.allChecked();

		// 通过全选按钮控制所有任务项的选中状态
		vm.checkAll = function() {
			DataService.checkAll( vm.allChecked );
		};

		// 6 清除已完成任务
		vm.clearAll = function() {
			DataService.clearAll();
		};
		vm.isShow = function() {
			return DataService.isShow();
		};


		// 7 显示未完成任务数
		vm.getUnCompleted = function() {
			return DataService.getUnCompleted();
		};
		
		// 8 显示不同状态的任务
		vm.selectedStatus = { isCompleted: undefined };
		vm.location = $location;
		vm.$watch('location.url()', function(newValue, oldValue) {
			switch( newValue ) {
				case '/':
					vm.selectedStatus = { isCompleted: undefined };
					break;
				case '/active':
					vm.selectedStatus = { isCompleted: false };
					break;
				case '/completed':
					vm.selectedStatus = { isCompleted: true };
					break;
			}

		});}
})(angular);