/**=========================================================
 * 
 * common controller
 * qureyController
 * 通用日历（有待优化）
 *
 =========================================================*/

App.controller('queryController',['$scope',function($scope){
  $scope.today = function() {
    $scope.dt1 = new Date();
    $scope.dt2 = new Date();
    $scope.dt1 = null;
    $scope.dt2 = null;
  };
  $scope.today();

  $scope.clear = function () {
    //$scope.dt = null;
    $scope.dt1 = null;
    $scope.dt2 = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.openStart= function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedStart = true;
  };
  $scope.openEnd= function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedEnd = true;
  };
  
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'yyyy-MM-dd';
}])



/**=========================================================
 * 
 * 用户信息
 *
 =========================================================*/

App.controller('LmUserInfo', ['$scope', '$timeout','$rootScope','ngDialog', function($scope, $timeout,$rootScope,ngDialog) {
  'use strict';

  $scope.queryData={
      oneData:'真实姓名：',
      twoData:'手机号码：',
      threeData:'证件号码：',
      state:'yes',
      calendar:'注册时间'
  }

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

  $scope.queryData={
      oneData:'真实姓名：',
      twoData:'手机号码：',
      selectOne:{
        text:'银行卡状态：',
        opinions:[
          {opt:'未认证'},
          {opt:'认证中'},
          {opt:'已认证'}       
        ]
      },
      selectTwo:{
        text:'紧急联系人状态：',
        opinions:[
            {opt:'未完善'},
            {opt:'完善中'},
            {opt:'已完善'}       
          ]
      },
      selectThree:{
        text:'身份证认证状态：',
        opinions:[
            {opt:'未认证'},
            {opt:'认证中'},
            {opt:'已认证'}       
          ]
      },
      selectFour:{
        text:'手机运营商认证状态:',
        opinions:[
            {opt:'未认证'},
            {opt:'认证中'},
            {opt:'已认证'}       
          ]
      },
      selectFive:{
        text:'芝麻授信状态:',
        opinions:[
            {opt:'未授信'},
            {opt:'授信中'},
            {opt:'已授信'}       
          ]
      }
  }

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
  $scope.queryData={
      // oneData:'真实姓名：',
      twoData:'手机号码：',
      state:'yes',
      calendar:'意见提交时间：'    
  }


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

  $scope.queryData={
      twoData:'手机号码：'   
  }

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

  $scope.queryData={
      twoData:'手机号码：'   
  }

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

  $scope.queryData={
      twoData:'手机号码：'   
  }

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

  $scope.queryData={
      twoData:'代理商(手机号码):'   
  }

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

  $scope.queryData={
      twoData:'手机号码：'   
  }

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


/**
 * 
 * 表字段维护
 * 
*/
App.controller('LmTablefieldController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
   
  $scope.queryData={
      oneData:'表名:',
      state:'yes'   
  }

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


  $scope.edit = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_field.html',
      controller: ModalInstanceCtrl,
      size: size
    });
  };
  
   $scope.addUser=function(size){
      var modalInstance = $modal.open({
        templateUrl: 'myModalContentId',
        controller: ModalInstanceCtrl,
        size: size
      });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.
  var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.fieldDetail = ['借款类型','审核状态','入网时间','身份认证状态','归属地','主键','审核结果描述'];
    $scope.multiple = {};
    $scope.multiple.selectData = ['借款类型','审核状态'];

    $scope.ok = function () {
      $modalInstance.close('closed');
      console.log('提交成功');
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance"];
 
}]);


/**
 * 
 * 规则配置
 * 
*/
App.controller('LmRuleConfigController', ['$scope', '$modal','$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $http,ngDialog, editableOptions, editableThemes,Notify) {
      
  $scope.queryData={
      oneData:'规则名称:',
      state:'yes'   
  } 
    
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_ruleConfig.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  $scope.className=true;
  $scope.enableState=function(){
    // var self = this;
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope       
      })
      .then(function(value){        
         // self.className =!pram;                  
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
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve:{
          msg:function(){
            return ;
          }
       } 
    });
  };
}]);


/**
 * 
 * 规则类型绑定
 * 
*/
App.controller('LmRuleTypeBindController', ['$scope', '$modal','$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $http,ngDialog, editableOptions, editableThemes,Notify) {

  $scope.queryData={
      oneData:'借款类型:',
      twoData:'适用场景:'   
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_ruletypeBind.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  });
  //确认-- 弹框
  $scope.delate=function(){
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
      })
      .then(function(value){                        
          Notify.alert( 
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }
  
  //编辑规则树-- 弹框 
  $scope.editList = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_select_rule.html',
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

//查看规则树-- 弹框 
  $scope.lookList = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_lookRule.html',
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

  var ModalInstanceCtrl = function ($scope, $modalInstance) { 
    $scope.dataLoans = [
      {
        "text":"消费金融-手机贷",
        "arrData":[
            {id:'1',"ruleCogfig":"运营商信息--基础信息/入网时间>=2017-10-01"},
            {id:'2',"ruleCogfig":"运营商信息--基础信息/归属地<=2017-01-01"}]
      },{
        "text":"消费金融-百速贷",
        "arrData":[
            {id:'1',"ruleCogfig":"借款信息表/借款金额>1000"},
            {id:'2',"ruleCogfig":"运营商信息--基础信息/入网时间>=2017-01-02"},
            {id:'3',"ruleCogfig":"运营商信息--基础信息/归属地=杭州"} 
        ]},{
        "text":"蚂蚁风控审核",
        "arrData":[
            {id:'1',"ruleCogfig":"风控数据-蚂蚁请求结果/审核状态=4"},
            {id:'2',"ruleCogfig":"风控数据-蚂蚁请求结果/审核状态=2"},
            {id:'3',"ruleCogfig":"风控数据-蚂蚁请求结果/审核状态=3"} 
        ]},{
        "text":"芝麻分验证",
        "arrData":[
            {id:'1',"ruleCogfig":"芝麻信用/是否已绑定!=20"},
            {id:'2',"ruleCogfig":"芝麻信用/是否已绑定=20"},
            {id:'3',"ruleCogfig":"芝麻信用/芝麻分>500"}, 
            {id:'4',"ruleCogfig":"芝麻信用/芝麻分<=500"},
        ]},{
        "text":"用户认证信息",
        "arrData":[
            {id:'1',"ruleCogfig":"用户认证状态/身份认证状态=30"},
            {id:'2',"ruleCogfig":"用户认证状态/紧急联系人状态=30"},
            {id:'3',"ruleCogfig":"用户认证状态/银行卡状态=30"}, 
            {id:'4',"ruleCogfig":"用户认证状态/手机运营商认证状态=30"},
            {id:'5',"ruleCogfig":"用户认证状态/芝麻授信状态=30"}
        ]},
    ];
   
    $scope.ok = function () {
      $modalInstance.close('closed');
      console.log('提交成功12');
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance"];
}]);

 
/**
 * 
 * 待机审订单
 * 
*/
App.controller('LmPendingOrdersController', ['$scope', '$http', 'editableOptions', 'editableThemes',
  function($scope,$http, editableOptions, editableThemes) {

   $scope.queryData={
      oneData:'订单号:',
      twoData:'姓名:',   
      threeData:'手机号码:',   
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_pendingOrders.json'
  }).then(function(res){
      console.log(res);
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 机审通过订单
 * 
*/
App.controller('LmThroughOrderController', ['$scope', '$http', 'editableOptions', 'editableThemes',function($scope,$http, editableOptions, editableThemes) { 

  $scope.queryData={
      oneData:'订单号:',
      twoData:'姓名:',   
      threeData:'手机号码:',   
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 

}]);

/**
 * 
 * 机审拒绝订单
 * 
*/
App.controller('LmRejectOrderController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'订单号:',
      twoData:'姓名:',   
      threeData:'手机号码:',   
  } 

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 蚂蚁请求记录
 * 
*/
App.controller('LmRequestRecordController', ['$scope', '$http',function($scope,$http) {  

  $scope.queryData={
      oneData:'订单号:',
      twoData:'姓名:',   
      threeData:'手机号码:', 
      calendar:'创建时间:' 
  } 

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 人工复审
 * 
*/    
App.controller('LmManualReviewController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'订单号:',
      twoData:'姓名:',   
      threeData:'手机号码:'   
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);



/**
 * 
 * 借款订单
 * 
*/    
App.controller('LmloanOrderController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'真实姓名:',
      twoData:'手机号码:',   
      threeData:'订单号:',
      calendar:'订单生成时间:',
      selectSix:{
        text:'订单状态:',
        opinions:[
          {opt:'申请成功待审核'},
          {opt:'自动审核通过'},
          {opt:'自动审核不通过'}, 
          {opt:'自动审核未决待人工复审'},
          {opt:'人工复审通过'},      
          {opt:'人工复审不通过'},
          {opt:'放款成功'},
          {opt:'放款失败'},
          {opt:'还款成功'},
          {opt:'还款成功-金额减免'},
          {opt:'逾期'},
          {opt:'坏账'}    
        ]
      }     
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 借款进度
 * 
*/    
App.controller('LmborrowProgressController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'真实姓名:',
      twoData:'手机号码:',   
      threeData:'订单号:',
      selectSix:{
        text:'状态:',
        opinions:[
          {opt:'申请成功待审核'},
          {opt:'自动审核通过'},
          {opt:'自动审核不通过'}, 
          {opt:'自动审核未决待人工复审'},
          {opt:'人工复审通过'},      
          {opt:'人工复审不通过'},
          {opt:'放款成功'},
          {opt:'放款失败'},
          {opt:'还款成功'},
          {opt:'还款成功-金额减免'},
          {opt:'逾期'},
          {opt:'坏账'}         
        ]
      }     
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);


/**
 * 
 * 放款订单
 * 
*/    
App.controller('LmcreditOrderController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'真实姓名:',
      twoData:'手机号码:',   
      threeData:'订单号:',
      selectSix:{
        text:'状态:',
        opinions:[
          {opt:'申请成功待审核'},
          {opt:'自动审核通过'},
          {opt:'自动审核不通过'}, 
          {opt:'自动审核未决待人工复审'},
          {opt:'人工复审通过'},      
          {opt:'人工复审不通过'},
          {opt:'放款成功'},
          {opt:'放款失败'},
          {opt:'还款成功'},
          {opt:'还款成功-金额减免'},
          {opt:'逾期'},
          {opt:'坏账'}           
        ]
      }     
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);




/**
 * 
 * 支付记录
 * 
*/    
App.controller('LmpaymentRecordController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'收款人姓名:',
      twoData:'手机号码:',   
      threeData:'订单号:',
      calendar:'打款时间:',
      selectOne:{
        text:'状态:',
        opinions:[
          {opt:'全部'},
          {opt:'待支付'},
          {opt:'支付成功'}, 
          {opt:'支付失败'},
          {opt:'审核通过'},      
          {opt:'审核不通过'},
          {opt:'待审核'}         
        ]
      },
      selectTwo:{
        text:'业务:',
        opinions:[
          {opt:'全部'},
          {opt:'放款'},
          {opt:'奖励'}, 
          {opt:'退还'},
          {opt:'还款'},      
          {opt:'补扣'}        
        ]
      }     
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 支付审核
 * 
*/    
App.controller('LmpaymentAuditController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'收款人姓名:',
      twoData:'手机号码:',
      calendar:'打款时间:'
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 支付对账记录
 * 
*/    
App.controller('LmpaymentReconRecordController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'处理结果:',
      calendar:'对账时间:',
      selectOne:{
        text:'状态:',
        opinions:[
          {opt:'全部'},
          {opt:'未处理'},
          {opt:'已处理'}         
        ]
      },
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);


/**
 * 
 * 催回率统计
 * 
*/    
App.controller('LmrecallRateStatisController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      calendar:'日期:'      
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 催收订单统计
 * 
*/    
App.controller('LmcollecteOrderStatisController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      calendar:'日期:'      
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 催收员每日统计
 * 
*/    
App.controller('LmdailyStatisticsCollController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'催收员姓名:',
      calendar:'日期:'      
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);


/**
 * 
 * 第三方征信接口 2017-11-20
 * 
**/
App.controller('LmInfoInterfaceController', ['$scope', '$modal','$filter', '$http','$location','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,$location,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'第三方名称:',
      state:'yes'
  }
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_creditInfoInterface.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })

  //编辑--弹框
  $scope.editBtn=function(data,size){
      if(data==''){
        var webData='';
      }else{
        var webData={
                message1:data.thirdPartyName,
                message2:data.thirdPartyIdenty,
                message3:data.keyValue,
                selectMes1:data.encryptSelect
            };
      }  
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_inputBox.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:webData,
              frontText:{"oneField":"第三方名称:","twoField":"第三方标识:","threeField":"加密方式:", "selectField1":"key:"},
              additional:{"oneField":"商户号:","twoField":"扩展字段:"},
              addSelect:[{"option":"RSA"},{"option":"MD5"}]
            };
          }
        }
      });
  };
   

 // 禁用--弹框 
  $scope.forbidBtn=function(data){
    $scope.data=data.stateOn;
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
    })
    .then(function(value){                        
        Notify.alert(
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

}]);

/**
 * 
 * 场景与接口关系维护 2017-11-20
 * 
**/
App.controller('LmSiRelateMainteController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_siRelateMainte.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })

  //编辑--弹框
  $scope.editBtn=function(data,size){
      if(data==''){
        var webData='';
      }else{
        var webData=data;
      }  
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_selectBox.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:webData,
              frontText:{"selectField1":"场景:","selectField2":"接口选择:","selectField3":"第三方:",
                         "selectField4":"接口:","selectField5":"数据获取方式:","selectField6":"间隔时间（天）:"},
              multiSelect:{
                            "one":[{"option":"贷前"}],
                            "two":[{"option":"第三方","tag":"yes"},{"option":"系统"}],
                            "three":[{"option":"蚂蚁风控"}],
                            "four":[{"option":"蚂蚁风控"}],
                            "five":[{"option":"获取一次"},{"option":"每次获取"},{"option":"固定周期获取","tag":"yes"}],

              }           
            };
          }
        }
      });
  };
   
  // 禁用--提示框 
  $scope.forbidBtn=function(){    
    Notify.alert(
          '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>操作成功', 
          {status: 'info',timeout :2000}
        );                      
  }
}]);

/**
 * 
 * 每日通过率
 * 
*/
App.controller('LmdailyPassRateController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'处理结果:',
      calendar:'对账时间:',
      selectOne:{
        text:'状态:',
        opinions:[
          {opt:'全部'},
          {opt:'未处理'},
          {opt:'已处理'}         
        ]
      },
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);


/**
 * 
 * 平台数据日报
 *
*/
App.controller('LmplatformDataDailyController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      calendar:'日期:'
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_controlDataDaily.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);



/**
 * 
 * 每日未还本金
 * 
*/
App.controller('LmpaymentReconRecordController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'处理结果:',
      calendar:'对账时间:',
      selectOne:{
        text:'状态:',
        opinions:[
          {opt:'全部'},
          {opt:'未处理'},
          {opt:'已处理'}         
        ]
      },
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);

/**
 * 
 * 每日放款收支数据
 * 
*/
App.controller('LmpaymentReconRecordController', ['$scope', '$http',function($scope,$http) { 

  $scope.queryData={
      oneData:'处理结果:',
      calendar:'对账时间:',
      selectOne:{
        text:'状态:',
        opinions:[
          {opt:'全部'},
          {opt:'未处理'},
          {opt:'已处理'}         
        ]
      },
  }

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_throughOrder.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  }) 
}]);




/**
 * 
 * 访问码管理
 * 
*/
App.controller('LmAccessCodeManageController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'用户名：',
      twoData:'用户姓名：',
      state:'yes',
      calendar:'创建时间:'
  }
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_accessCodeManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  $scope.forbiBtn=function(data){
    $scope.data=data;
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
    })
    .then(function(value){                        
        Notify.alert(
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }
  //新增--弹框
   $scope.addBtn = function (size) { 
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_inputThreeCol_oneLine.html',
      controller: 'ModalInstanceCtrl',
      size:size,
      resolve:{
        msg:function(){
          return ;
        }
      }
    });
  };
}]);

/**
 * 
 * 用户管理
 * 
*/
App.controller('LmUserManageController', ['$scope', '$modal','$filter', '$http','$location','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,$location,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'工号：',
      twoData:'真实姓名：',
      state:'yes'
  }
  $scope.url=$location.url();
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_systemUserManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  //查看--弹框 
  $scope.addBtn=function(data,size){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_field_2.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:data,
              optionData:["系统管理员","财务人员","代理商","运营人员","催收管理员","催收专员","客服人员","风控人员","委外催收管理员","演示版本"]
            };
          }
        }
      });
  };
}]);

/**
 * 
 * 角色管理
 * 
*/
App.controller('LmRoleManageController', ['$scope', '$modal','$filter', '$http','$location','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,$location,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'工号：',
      twoData:'真实姓名：'
  }
  $scope.url=$location.url();
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_systemRoleManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  //查看--弹框 
  $scope.addBtn=function(data,size){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_inputTwoCol_twoLine_s.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:data
              // optionData:["系统管理员","财务人员","代理商","运营人员","催收管理员","催收专员","客服人员","风控人员","委外催收管理员","演示版本"]
            };
          }
        }
      });
  };

 //删除--弹框 
  $scope.delete=function(){
    $scope.data="删除这项内容";
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
    })
    .then(function(value){                        
        Notify.alert(
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

}]);



/**
 * 
 * 菜单管理
 * 
*/
App.controller('LmMeunManageController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes) {
  // $scope.queryData={
  //     oneData:'工号：',
  //     twoData:'真实姓名：'
  // }

  $scope.myNestable = {};
  $scope.myNestable2 = {};

  $scope.myNestable.onchange = function() {
    console.log('Nestable changed..');
  };
  $scope.myNestable2.onchange = function() {
    $scope.serialized = $scope.myNestable2.serialize();
  };

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_systemMeunManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
      //console.log(res.data);
  },function(error){
      console.log('error');
  })
  
  //查看--弹框 
  $scope.addBtn=function(data,size){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_inputTwoCol_twoLine_s.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:data
            };
          }
        }
      });
  };
}]);


/**
 * 
 * 字典管理
 * 
*/
App.controller('LmDictionaryManageController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'字典类型：',
      twoData:'类型代码：'
  }
  $scope.dataList = [];
  $scope.myData={list:[]};
  $http({
      method: 'get',
      url:'server/lmServer/lm_systemDictionaryManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  //查看--弹框 
  $scope.addBtn=function(data,size){
      var webData={
                message1:data.dicType,
                message2:data.typeCode,
                message3:data.remarks,
                message4:data.sort
            };
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_inputTwoCol_twoLine.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            return {
              infoData:webData,
              outText:{"firstT":"字典类型:","secondT":"类型代码:","fourthT":"排序:","thridT":"备注:"}
            };
          }
        }
      });
  };

 //删除--弹框 
  $scope.delete=function(){
    $scope.data="删除这项内容";
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
    })
    .then(function(value){                        
        Notify.alert(
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

}]);

/**
 * 
 * 系统参数设置
 * 
*/
App.controller('LmParamSetController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.queryData={
      oneData:'字典类型：',
      twoData:'类型代码：'
  }
  $scope.dataList = [];
  $scope.myData={list:[]};
  $http({
      method: 'get',
      url:'server/lmServer/lm_systemParamSet.json'
  }).then(function(res){
      $scope.dataList=res.data;
      //console.log(res.data);
  },function(error){
      console.log('error');
  })
  
  //查看--弹框 
  $scope.editBtn=function(data,size){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/common/popup_inputBox_lg.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve:{
          msg:function(){
            var webData={
                message1:data.pramNum,
                message2:data.pramName,
                message3:data.pramValue,
                message4:data.pramType
            };
            return {
              infoData:webData,
              outText:{"firstT":"参数编号:","secondT":"参数名称:","fourthT":"参数值:","thridT":"参数类型:","thridT":"备注:"}
            };
          }
        }
      });
  };

 //禁用--弹框 
  $scope.delete=function(){
    $scope.data="确认";
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
    })
    .then(function(value){                        
        Notify.alert(
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

}]);




/**
 * 
 * 任务列表
 * 
*/
App.controller('LmTastListController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.themeData={
    channelCode:'任务名:'
  }
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_tastList.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  $scope.forbiBtn=function(){
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
      })
      .then(function(value){                        
          Notify.alert( 
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

  $scope.editBtn = function (data) { 
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_inputBox_lg.html',
      controller: 'ModalInstanceCtrl',
      resolve:{
        msg:function(){
          return data;
        }
      }
    }); 
  };
}]);

/**
 * 
 *执行记录
 * 
*/
App.controller('LmExecuteRecordController', ['$scope', '$modal','$filter', '$http','editableOptions', 'editableThemes',function($scope, $modal, $filter, $http,editableOptions, editableThemes) {

  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_executeRecord.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })

}]);



/**
 * 
 * 渠道管理
 * 
*/
App.controller('LmChannelManageController', ['$scope', '$modal','$filter', '$http','ngDialog', 'editableOptions', 'editableThemes','Notify',
  function($scope, $modal, $filter, $http,ngDialog, editableOptions, editableThemes,Notify) {
  $scope.themeData={
      channelCode:'渠道编码:',
      contacts:'联系人姓名:',
      channelName:'渠道名称:',
      contactType:'联系方式:'
  }
  $scope.dataList = [];
  $http({
      method: 'get',
      url:'server/lmServer/lm_channelManage.json'
  }).then(function(res){
      $scope.dataList=res.data;
  },function(error){
      console.log('error');
  })
  
  $scope.forbiBtn=function(pram){
    ngDialog.openConfirm({      
        templateUrl: 'app/views/common/dialogWithNestedConfirm.html',
        className: 'ngdialog-theme-default',
        scope: $scope
      })
      .then(function(value){                          
          Notify.alert( 
              '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>修改成功', 
              {status: 'info',timeout :1000}
            );                 
      }, function(value){     
          return;
    });
  }

  $scope.editBtn = function (data) {   
    var modalInstance = $modal.open({
      templateUrl: 'app/views/common/popup_inputBox.html',
      controller: 'ModalInstanceCtrl',
      resolve:{
        msg:function(){
          return data;
        }
      }
    });    
  };

}]);

//公用弹框--控制器
App.controller('ModalInstanceCtrl',['$scope','$modalInstance','$timeout','msg','Notify',function($scope, $modalInstance,$timeout,msg,Notify){
    $scope.data=msg;
    //console.log(msg.infoData=="");
    $scope.ok = function () {
      if(false){
          Notify.alert( 
              '<i class="fa fa-warning font_32 color_fff mar-right-10 float_left"></i>数据不能为空', 
              {status: 'warning',timeout :1500}
          ); 
          console.log('提交失败');   
          return;  
      }else{
        $modalInstance.close('closed');
        $timeout(function() {
            Notify.alert( 
                '<i class="fa fa-check-circle font_32 color_fff mar-right-10 float_left"></i>提交成功', 
                {status: 'info',timeout :1000}
            );
            console.log('提交成功');
        }, 500);   
      }
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
