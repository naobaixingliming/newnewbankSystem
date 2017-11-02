/**=========================================================
 * Module: datepicker,js
 * DateTime Picker init
 * 
 * 用户信息
 *
 =========================================================*/

App.controller('LmUserInfo', ['$scope', '$timeout','$rootScope','ngDialog', function($scope, $timeout,$rootScope,ngDialog) {
  'use strict';
  // Define global instance we'll use to destroy later 
  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,  // Table pagination
        'ordering': false, // Column ordering 
        'info':     true,  // Bottom left status text
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_userInfo.json',
        aoColumns: [
          { mData: 'phoneNum' },
          { mData: 'realName' },
          { mData: 'idCard' },
          { mData: 'education' },
          { mData: 'regTime' },
          { mData: 'regClient' },
          { mData: 'regChannels' },
          { mData: 'state' },
          { mData: 'operatio' }
        ]
    });
  });  
  // When scope is destroyed we unload all DT instances 
  // Also ColVis requires special attention since it attaches
  // elements to body and will not be removed after unload DT
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });
  //添加黑名单 弹框
  $('.pretreat').delegate('#datatable4 .addBlacklist','click',function(){  
        var addBlacklist=$(this).html();
        ngDialog.openConfirm({
          template: 'modalDialogId',
          controller: ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.addBlacklist = addBlacklist;
        }],
          className: 'ngdialog-theme-default'
        }).then(function (value) {
          console.log('确认执行： ', value);
        }, function (reason) {
          console.log('取消执行: ', reason);
        });      
    });

}]);


/**
 * 
 * 用户认证信息
 * 
*/
App.controller('LmUserInfoAuthentice', ['$scope', '$timeout', '$rootScope',function($scope, $timeout,$rootScope) {
  'use strict';

  // Define global instance we'll use to destroy later 
  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,  // Table pagination
        'ordering': false,  // Column ordering 
        'info':     true,  // Bottom left status text
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_userInfoAuthentice.json',
        aoColumns: [
          { mData: 'realName' },
          { mData: 'phoneNum' },          
          { mData: 'bankCard' },
          { mData: 'urgentContact' },
          { mData: 'idState' },
          { mData: 'tellState' },
          { mData: 'creditState' }
        ]         
    });
  });  
  // When scope is destroyed we unload all DT instances 
  // Also ColVis requires special attention since it attaches
  // elements to body and will not be removed after unload DT
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

}]);

/**
 * 
 * 用户反馈列表
 * 
*/
App.controller('LmUserFeedbackList', ['$scope', '$timeout', '$rootScope','ngDialog',function($scope, $timeout,$rootScope,ngDialog) {
  'use strict';
  // Define global instance we'll use to destroy later 
  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,   // Table pagination
        'ordering': false,  // Column ordering 
        'info':     false,  // Bottom left status text
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_feedbackList.json',
        aoColumns: [
          { mData: 'realName' },
          { mData: 'phoneNum' },        
          { mData: 'opinion' },
          { mData: 'submissionTime' },
          { mData: 'state' },
          { mData: 'administrators' },
          { mData: 'feedback' },
          { mData: 'feedbackTime' },
          { mData: 'operatio' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });
 //数据处理 弹框
  $('.pretreat').delegate('#datatable4 .dealBtn','click',function(){
      ngDialog.openConfirm({      
            template: 'dialogWithNestedConfirmDialogId',
            className: 'ngdialog-theme-default',
            preCloseCallback: function(value) {
              var nestedConfirmDialog = ngDialog.openConfirm({
                template:
                    '<p>您确定要关闭对话框吗？</p>' +
                    '<div>' +
                      '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                      '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                    '</button></div>',
                plain: true,
                className: 'ngdialog-theme-default'
              });
              return nestedConfirmDialog;
            },
            scope: $scope,
          })
          .then(function(value){
             if(!value){
                 ngDialog.open({
                  template: '<h4>提交的数据不能为空</h4>',
                  className: 'ngdialog-theme-default',
                  plain: true,
                  overlay: true
             });
              }else{
                console.log('保存的数据:' + value);
              }          
          }, function(value){     
            console.log('取消执行:' + value);
        });
     });
}]);


/**
 * 
 * 用户代理等级
 * 
*/
App.controller('LmUserAgentRank', ['$scope', '$timeout', '$rootScope','ngDialog',function($scope, $timeout,$rootScope,ngDialog) {
  'use strict';
  // Define global instance we'll use to destroy later 
  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,   // Table pagination
        'ordering': false,  // Column ordering 
        'info':     false,  // Bottom left status text
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_userAgentRank.json',
        aoColumns: [
          { mData: 'phoneNum' },       
          { mData: 'agentRank' },
          { mData: 'registerTime' },
          { mData: 'operatio' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

   //设为一级代理 弹框
  $('.pretreat').delegate('#datatable4 .setOneGreadeBtn','click',function(){ 
        var setOneGrade=$(this).html(); 
        ngDialog.openConfirm({
          template: 'modalDialogId',
          className: 'ngdialog-theme-default',
          controller:['$scope',function($scope){
              $scope.setOneGrade = setOneGrade;
          }]
        }).then(function (value) {
          console.log('确认执行： ', value);
        }, function (reason) {
          console.log('取消执行: ', reason);
        });      
    });
}]);


/**
 * 
 * 代理商列表
 * 
*/
App.controller('LmAgentList', ['$scope', '$timeout', '$rootScope','ngDialog',function($scope, $timeout,$rootScope,ngDialog) {
  'use strict';

  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,   
        'ordering': false,  
        'info':     false,  
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_agentList.json',
        aoColumns: [
          { mData: 'phoneNum' },       
          { mData: 'agentRank' },
          { mData: 'profitRate' },
          { mData: 'addTime' },
          { mData: 'updateTime' },
          { mData: 'operatio' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

   //取消一级代理 弹框
  $('.pretreat').delegate('#datatable4 .cancelOneGreadeBtn','click',function(){  
       var cancelOneGrade=$(this).html();
        ngDialog.openConfirm({
          template: 'modalDialogId',
          className: 'ngdialog-theme-default',
          controller: ['$scope',  function ($scope) {
            $scope.cancelOneGrade = cancelOneGrade;
        }],
        }).then(function (value) {
          console.log('确认执行： ', value);
        }, function (reason) {
          console.log('取消执行: ', reason);
        });      
    });
}]);



/**
 * 
 * 奖励资金账户
 * 
*/
App.controller('LmBonusFundAccount', ['$scope', '$timeout', '$rootScope',function($scope, $timeout,$rootScope) {
  'use strict';

  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   true,   
        'ordering': false,  
        'info':     false,  
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_bonusFundAccount.json',
        aoColumns: [
          { mData: 'phoneNum' },       
          { mData: 'userName' },
          { mData: 'totalAward' },
          { mData: 'pendPayment' },
          { mData: 'alreadyHitMoney' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

}]);


/**
 * 
 * 奖励获得记录
 * 
*/
App.controller('LmAwardsGetRecords', ['$scope', '$timeout', '$rootScope',function($scope, $timeout,$rootScope) {
  'use strict';

  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   false,   
        'ordering': false,  
        'info':     false,  
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_awardsGetRecords.json',
        aoColumns: [
          { mData: 'AgentphoneNum' },       
          { mData: 'BorrowerphoneNum' },
          { mData: 'LoanAmount' },
          { mData: 'ComprehensiveCost' },
          { mData: 'AwardAmount' },
          { mData: 'RepaymentTime' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

}]);


/**
 * 
 * 奖励打款记录
 * 
*/
App.controller('LmBonusRecord', ['$scope', '$timeout', '$rootScope',function($scope, $timeout,$rootScope) {
  'use strict';

  var dtInstance4;
  $timeout(function(){
    if ( ! $.fn.dataTable ) return;
    dtInstance4 = $('#datatable4').dataTable({
        'paging':   false,   
        'ordering': false,  
        'info':     false,  
        'language':$rootScope.chineseJson,
        sAjaxSource: 'server/lmServer/lm_bonusRecord.json',
        aoColumns: [
          { mData: 'phoneNum' },       
          { mData: 'MakePayment' },
          { mData: 'DepositTime' }
        ]         
    });
  });  
  $scope.$on('$destroy', function(){
    dtInstance4.fnDestroy();
    $('[class*=ColVis]').remove();
  });

}]);


App.controller('LmTablefieldController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
   
  // $scope.dataList = [
  //   {id: 1, name: 'arc_borrow_rule',   status: '借款规则管理', group: '借款类型', groupName: '启用'},
  //   {id: 2, name: 'cl_mayi_req_log',   status: '借款规则管理', group: '审核状态,审核结果描述', groupName: '启用'},
  //   {id: 3, name: 'cl_user_base_info', status: '用户详情表',   group: '是否已绑定,芝麻分',groupName: '启用'}
  // ];
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_tablefield.json'
  }).then(function(res){
      $scope.dataList=res.data;

  },function(error){
      console.log('error');
  })
  
  $scope.className=true;
  $scope.enableState=function(pram){
    var self = this;
    ngDialog.openConfirm({      
        template: 'dialogWithNestedConfirmDialogId',
        className: 'ngdialog-theme-default',
        scope: $scope
      })
      .then(function(value){        
         self.className =!pram;                  
          Notify.alert( 
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }


  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_field.html',
      controller: ModalInstanceCtrl,
      size: size
    });
    var state = $('#modal-state');
    modalInstance.result.then(function () {
      state.text('Modal dismissed with OK status');
    }, function () {
      state.text('Modal dismissed with Cancel status');
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.
  var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close('closed');
      console.log('提交成功');
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance"];


  $scope.addUser=function(size){
      var modalInstance = $modal.open({
        templateUrl: 'myModalContentId',
        controller: ModalInstanceCtrl,
        size: size
      });
      var state = $('#modal-state');
      modalInstance.result.then(function () {
        state.text('Modal dismissed with OK status');
      }, function () {
        state.text('Modal dismissed with Cancel status');
      });
  };

 

}]);


