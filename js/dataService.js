// 提供数据服务的模块
(function(angular) {

angular
	.module('todoApp.DataSrv', [])
	.service('DataService', ['$window', function($window) {
		// 数据服务模块

		// 获取数据
		var localStorage = $window.localStorage;
		var dataStr = localStorage.getItem('todo');
		var taskList = JSON.parse( dataStr ) || [];
		this.taskList = taskList;

		// 1 获取数据的方法
		this.getData = function() {
			return this.taskList;
		};

		// 2 添加数据
		this.setData = function( name ) {
			var id, len = this.taskList.length;
			if( len === 0 ) {
				id = 1;
			} else {
				id = this.taskList[len - 1].id + 1;
			}

			// 添加任务, 并且默认任务状态为: 未完成
			this.taskList.push({id: id, name: name, isCompleted: false});
			// 存储数据
			this.save();
		};

		// 抽离保存数据到 localStorage 中的方法
		this.save = function() {
			localStorage.setItem('todo', JSON.stringify( this.taskList ));
		};

		// 3 删除数据方法
		this.remove = function( id ) {
			for(var i = 0; i < this.taskList.length; i++) {
				if(this.taskList[i].id === id) {
					this.taskList.splice(i, 1);
				}
			}

			this.save();
		};

		// 5 切换任务选中状态
		this.checkAll = function( allChecked ) {
			this.taskList.forEach(function( task ) {
				task.isCompleted = allChecked;
			});

			this.save();
		};

		// 控制全选按钮的状态
		this.allChecked = function() {
			var checked = true;
			
			(this.taskList.length === 0) && (checked = false);

			this.taskList.forEach(function( task ) {
				if( !task.isCompleted ) {
					checked = false;
				}
			});

			return checked;
		};

		// 6 清除已完成任务
		this.clearAll = function() {
			var temp = [];
			for(var i = 0; i < this.taskList.length; i++) {
				if( !this.taskList[i].isCompleted ) {
					temp.push( this.taskList[i] );
				}
			}
			// this.taskList = temp;
			this.taskList.length = 0;
			[].push.apply(this.taskList, temp);

			this.save();
		};

		this.isShow = function() {
			var temp = false;

			for(var i = 0; i < this.taskList.length; i++) {
				if( this.taskList[i].isCompleted ) {
					temp = true;
					break;
				}
			}

			return temp;
		};

		// 7 显示未完成任务数
		this.getUnCompleted = function() {
			var count = 0;

			this.taskList.forEach(function( task ) {
				if( !task.isCompleted ) {
					count++;
				}
			});

			return count;
		};

	}])

})(angular)