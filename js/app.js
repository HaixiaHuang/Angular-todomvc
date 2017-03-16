// 主模块，用来调度所有其他模块
(function (window) {
	'use strict';

	angular
		// 创建模块
		.module('todoApp', [
			'todoApp.controller',
			'todoApp.DataSrv',
		]);

})(window);
