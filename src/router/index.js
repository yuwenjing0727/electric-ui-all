import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/root'
import login from '@/components/content/struTable/login'


//系统管理
import homePage from '@/components/content/struTable/admin/homePage'
import user from '@/components/content/struTable/admin/user'
import menu from '@/components/content/struTable/admin/menu'
import role from '@/components/content/struTable/admin/role'
import dict from '@/components/content/struTable/admin/dict'
import org from '@/components/content/struTable/admin/org'
import route from '@/components/content/struTable/admin/route'
import client from '@/components/content/struTable/admin/client'
import job from '@/components/content/struTable/admin/job'
import jobplan from '@/components/content/struTable/admin/jobplan'
import sequence from '@/components/content/struTable/admin/sequence'



//系统管理>日志管理
import loginlog from '@/components/content/struTable/admin/log/loginlog'
import handlelog from '@/components/content/struTable/admin/log/handlelog'
import auditlog from '@/components/content/struTable/admin/log/auditlog'
import exceptionlog from '@/components/content/struTable/admin/log/exceptionlog'
import facelog from '@/components/content/struTable/admin/log/facelog'

//系统管理>接口api管理
import biz from '@/components/content/struTable/admin/fcapi/biz'
import datatype from '@/components/content/struTable/admin/fcapi/datatype'
import datatypeAdd from '@/components/content/struTable/admin/fcapi/datatype/indexAdd'
import datatypeEdit from '@/components/content/struTable/admin/fcapi/datatype/indexEdit'
import datatypeDetails from '@/components/content/struTable/admin/fcapi/datatype/indexDetails'
import project from '@/components/content/struTable/admin/fcapi/project/index.vue'
import details from '@/components/content/struTable/admin/fcapi/project/details.vue'
import addPage from '@/components/content/struTable/admin/fcapi/project/addPage.vue'
import editPage from '@/components/content/struTable/admin/fcapi/project/editPage.vue'
import testPage from '@/components/content/struTable/admin/fcapi/project/testPage.vue'
import interDetailsPage from '@/components/content/struTable/admin/fcapi/project/interDetailsPage.vue'
//系统管理>工作流管理
import flow from '@/components/content/struTable/admin/workflow/flow'
import track from '@/components/content/struTable/admin/workflow/track'
import flowlog from '@/components/content/struTable/admin/workflow/flowlog'

//基础数据管理
import marketmember from '@/components/content/struTable/basicdata/marketmember'
import tranchannel from '@/components/content/struTable/basicdata/tranchannel'
import tradepath from '@/components/content/struTable/basicdata/tradepath'

// //表计电量管理
// import internetmeter from '@/components/content/struTable/basicdata/internetmeter'
// import crewelectric from '@/components/content/struTable/basicdata/crewelectric'
// import puelectric from '@/components/content/struTable/basicdata/puelectric'
import schedupload from '@/components/content/struTable/basicdata/schedupload'
import linelossexport from '@/components/content/struTable/basicdata/linelossexport'



//参数配置管理
import settlementunit from '@/components/content/struTable/basicdata/settlementunit'
import meter from '@/components/content/struTable/basicdata/meter'
import settlementobj from '@/components/content/struTable/basicdata/settlementobj'
import mentercycle from '@/components/content/struTable/basicdata/mentercycle'
import formula from '@/components/content/struTable/basicdata/formula'
import stformula from '@/components/content/struTable/basicdata/stformula'
import strule from '@/components/content/struTable/basicdata/strule'

//现货市场管理
import pidca from '@/components/content/struTable/spotmarket/pidca'
import pdeq from '@/components/content/struTable/spotmarket/pdeq'
import ipcc from '@/components/content/struTable/spotmarket/ipcc'
import deoe from '@/components/content/struTable/spotmarket/deoe'

//电价管理
import spp from '@/components/content/struTable/spotmarket/spp'
import priceplan from '@/components/content/struTable/spotmarket/priceplan'


// 结算电量
import dams from '@/components/content/struTable/spotmarket/dams'
import rtms from '@/components/content/struTable/spotmarket/rtms'
import dsm from '@/components/content/struTable/spotmarket/dsm'
import dadts from '@/components/content/struTable/spotmarket/dadts'

// 结算单管理
import stm from '@/components/content/struTable/spotmarket/stm'
import ssg from '@/components/content/struTable/spotmarket/ssg'
import ssm from '@/components/content/struTable/spotmarket/ssm'
import ass from '@/components/content/struTable/spotmarket/ass'
import ssi from '@/components/content/struTable/spotmarket/ssi'
import sod from '@/components/content/struTable/spotmarket/sod'
import cfs from '@/components/content/struTable/spotmarket/cfs'
import sim from '@/components/content/struTable/spotmarket/sim'
import sheet from '@/components/content/struTable/spotmarket/sheet'
import sett from '@/components/content/struTable/spotmarket/sett'
import apply from '@/components/content/struTable/spotmarket/apply'
import task from '@/components/content/struTable/spotmarket/task'


//电费收支管理
import lmm from '@/components/content/struTable/spotmarket/lmm'
import erm from '@/components/content/struTable/spotmarket/erm'
import epm from '@/components/content/struTable/spotmarket/epm'
import psm from '@/components/content/struTable/spotmarket/psm'


//用户无权限也页面以及相关404界面
import noPermission from '@/components/errorPage/noPermission'
import error404 from '@/components/errorPage/error404'
import error500 from '@/components/errorPage/error500'

Vue.use(Router)

const routes = [
	{
		path : '/error404',
		meta: {
			requireAuth: true,
		},
		component : error404,
	},
	{
		path : '/error500',
		meta: {
			requireAuth: true,
		},
		component : error500,
	},
	{
		path : '/noPermission',
		meta: {
			requireAuth: true,
		},
		component : noPermission
	},
	{
		path : '/login',
		meta: {
			requireAuth: true,
		},
		component : login,
	},
	{
		path: '/',
		meta: {
			requireAuth: true,
		},
		component: Root,
		redirect: 'login',
		children: [
			{
				path: 'homePage',
				component: homePage
			},
			{
				path: 'user',
				component: user
			},
			{
				path: 'menu',
				component: menu
			},
			{
				path: 'role',
				component: role
			},
			{
				path: 'dict',
				component: dict
			},
			{
				path: 'org',
				component: org
			},
			{
				path: 'loginlog',
				component: loginlog
			},
			{
				path: 'handlelog',
				component: handlelog
			},
			{
				path: 'auditlog',
				component: auditlog
			},
			{
				path: 'sysexceptionlog',
				component: exceptionlog
			},
			{
				path: 'facelog',
				component:facelog
			},
			{
				path: 'job',
				component: job
			},
			{
				path: 'jobplan',
				component: jobplan
			},
			{
				path: 'sequence',
				component: sequence
			},
			{
				path: 'biz',
				component: biz
			},
			{
				path: 'datatype',
				component: datatype
			},
			{
				path: "datatypeAdd",
				component: datatypeAdd
			},
			{
				path: "datatypeEdit",
				component: datatypeEdit
			},
			{
				path: "datatypeDetails",
				component: datatypeDetails
			},
			{
				path: 'project',
				component: project
			},
			{
				path: 'details',
				component: details

			},
			{
				path: 'addPage',
				component: addPage

			},
			{
				path: 'editPage',
				component: editPage

			},
			{
				path: 'testPage',
				component: testPage

			},
			{
				path: 'interDetailsPage',
				component: interDetailsPage

			},
			{
				path: 'flow',
				component: flow
			},
			{
				path: 'track',
				component: track
			},
			{
				path: 'flowlog',
				component: flowlog
			},

			//系统监控下
			{
				path: 'client',
				component: client
			},
			{
				path: 'route',
				component: route
			},


			//基础数据管理
			{
				path: 'marketmember',
				component: marketmember
			},

			{
				path: 'tranchannel',
				component: tranchannel
			},
			{
				path: 'tradepath',
				component: tradepath
			},

			//参数配置管理
			{
				path: 'settlementunit',
				component: settlementunit
			},
			{
				path: 'meter',
				component: meter
			},
			{
				path: 'settlementobj',
				component: settlementobj
			},
			{
				path: 'mentercycle',
				component: mentercycle
			},
			{
				path: 'formula',
				component: formula
			},
			{
				path: 'stformula',
				component: stformula
			},
			{
				path: 'strule',
				component: strule
			},
			//表计电量管理
			{
				path: 'schedupload',
				component: schedupload
			},

			{
				path: 'linelossexport',
				component: linelossexport
			},


			//现货市场管理
			{
				path: 'pidca',
				component: pidca
			},

			{
				path: 'pdeq',
				component: pdeq
			},
			{
				path: 'ipcc',
				component: ipcc
			},
			{
				path: 'deoe',
				component: deoe
			},
			//电价管理
			{
				path: 'priceplan',
				component: priceplan
			},
			{
				path: 'spp',
				component: spp
			},
			//结算电量
			{
				path: 'dams',
				component: dams
			},

			{
				path: 'rtms',
				component: rtms
			},
			{
				path: 'dsm',
				component: dsm
			},
			{
				path: 'dadts',
				component: dadts
			},
			//结算单管理
			{
				path: 'stm',
				component: stm
			},
			{
				path: 'ssg', /*生成*/
				component: ssg
			},
			{
				path: 'ssm',  /*管理*/
				component: ssm
			},
			{
				path: 'apply',  /*申请结算单*/
				component: apply
			},
			{
				path: 'task',   /*待办结算单*/
				component: task
			},
			{
				path: 'ass',
				component: ass
			},
			{
				path: 'ssi', /*争议明细*/
				component: ssi
			},
			{
				path: 'sod', /*结果确认*/
				component: sod
			},
			{
				path: 'cfs',
				component: cfs
			},
			{
				path: 'sim',
				component: sim
			},
			{
				path: 'sheet',
				component: sheet
			},
			{
				path: 'sett',
				component: sett
			},


			//电费收支
			{
				path: 'lmm',
				component: lmm
			},

			{
				path: 'erm',
				component: erm
			},
			{
				path: 'epm',
				component: epm
			},
			{
				path: 'psm',
				component: psm
			},

		]
	}
];

const router = new Router({
	routes
});

router.beforeEach((to, from, next) => {
	//请求树菜单后，获取按钮权限
	if(sessionStorage.buttons){
		var buttons = JSON.parse(sessionStorage.buttons);
		//获取到按钮权限
		for(var key in buttons){
			if(key == to.path){
				var buttonPermission = buttons[key];
				sessionStorage.setItem("buttonPermission",JSON.stringify(buttonPermission));
				break;
			}
		}
	}


	if (to.matched.some(r => r.meta.requireAuth)) {
		//之所以这样写，是因为login.vue中执行sessionStorage.setItem("token","aaa")较慢
		if(to.path == "/login"){
			if(to.query.token){
				next();
			}
		}
		//当跳转的是别的界面的时候，检测token
		if (sessionStorage.token) {
			if(to.path == "/login"){
				next();//重定向
			}else{
				//在登录的情况下，判断用户是否有权限看到相关界面
				if(sessionStorage.getItem("components")){
					var components = JSON.parse(sessionStorage.getItem("components"));
					if(components.indexOf(to.path) >= 0){
						next();
					}else{
						console.log("111111");
						if(to.path == "/noPermission"){
							next();
						}else{
							next({path:'/noPermission'});
						}

					}
				}

			}


		}
		else {
			/*next({
				path: 'http://192.168.100.119:9999/manage'
			})*/
			window.location.href=`${process.env.NODE_ENV}/`+window._signOut().loginout;
		}
	}
	else {
		next();
	}
})

export default router;

/*export default new Router({
	routes: [
		{
			path : '/login',
			meta: {
				requireAuth: true,
	    	},
			component : login,
		},
		{
			path: '/',
			meta: {
				requireAuth: true,
			},
			component: Root,
			redirect: 'login',
			children: [
				{
					path: 'homePage',
					component: homePage
				},
				{
					path: 'user',
					component: user
				},
				{
					path: 'menu',
					component: menu
				},
				{
					path: 'menu',
					component: menu
				},
				{
					path: 'role',
					component: role
				},
				{
					path: 'dict',
					component: dict
				},
				{
					path: 'org',
					component: org
				},
				{
					path: 'loginlog',
					component: loginlog
				},
				{
					path: 'handlelog',
					component: handlelog
				},
				{
					path: 'auditlog',
					component: auditlog
				},
				{
					path: 'exceptionlog',
					component: exceptionlog
				},
				{
					path: 'facelog',
					component:facelog
				},
				{
					path: 'job',
					component: job
				},
				{
					path: 'jobplan',
					component: jobplan
				},
				{
					path: 'sequence',
					component: sequence
				},
				{
					path: 'biz',
					component: biz
				},
				{
					path: 'datatype',
					component: datatype
                },
                {
                    path: "datatypeAdd",
                    component: datatypeAdd
                },
                {
                    path: "datatypeEdit",
                    component: datatypeEdit
                },
                {
                    path: "datatypeDetails",
                    component: datatypeDetails
                },
				{
					path: 'project',
					component: project
				},
				{
					path: 'details',
					component: details

				},
				{
					path: 'addPage',
					component: addPage

				},
				{
					path: 'editPage',
					component: editPage

				},
				{
					path: 'testPage',
					component: testPage

				},
				{
					path: 'interDetailsPage',
					component: interDetailsPage

				},
				{
					path: 'flow',
					component: flow
				},
				{
					path: 'track',
					component: track
				},
				{
					path: 'flowlog',
					component: flowlog
				},

				//系统监控下
				{
					path: 'client',
					component: client
				},
				{
					path: 'route',
					component: route
				},


				//基础数据管理
				{
					path: 'marketmember',
					component: marketmember
				},

				{
					path: 'tranchannel',
					component: tranchannel
				},
				{
					path: 'tradepath',
					component: tradepath
				},

				//参数配置管理
				{
					path: 'settlementunit',
					component: settlementunit
				},
				{
					path: 'meter',
					component: meter
				},
				{
					path: 'settlementobj',
					component: settlementobj
				},
				{
					path: 'mentercycle',
					component: mentercycle
				},
				{
					path: 'formula',
					component: formula
				},
				{
					path: 'stformula',
					component: stformula
				},
				{
					path: 'strule',
					component: strule
				},
				//表计电量管理
				{
					path: 'schedupload',
					component: schedupload
				},

				{
					path: 'linelossexport',
					component: linelossexport
				},


				//现货市场管理
				{
					path: 'pidca',
					component: pidca
				},

				{
					path: 'pdeq',
					component: pdeq
				},
				{
					path: 'ipcc',
					component: ipcc
				},
				{
					path: 'deoe',
					component: deoe
				},
				//电价管理
				{
					path: 'priceplan',
					component: priceplan
				},
				{
					path: 'spp',
					component: spp
				},
				//结算电量
				{
					path: 'dams',
					component: dams
				},

				{
					path: 'rtms',
					component: rtms
				},
				{
					path: 'dsm',
					component: dsm
				},
				{
					path: 'dadts',
					component: dadts
				},
				//结算单管理
				{
					path: 'stm',
					component: stm
				},
				{
					path: 'ssg', /!*生成*!/
					component: ssg
				},
				{
					path: 'ssm',  /!*管理*!/
					component: ssm
				},
				{
					path: 'apply',  /!*申请结算单*!/
					component: apply
				},
				{
					path: 'task',   /!*待办结算单*!/
					component: task
				},
				{
					path: 'ass',
					component: ass
				},
				{
					path: 'ssi', /!*争议明细*!/
					component: ssi
				},
				{
					path: 'sod', /!*结果确认*!/
					component: sod
				},
				{
					path: 'cfs',
					component: cfs
				},
				{
					path: 'sim',
					component: sim
				},
				{
					path: 'sheet',
					component: sheet
				},
				{
					path: 'sett',
					component: sett
				},


				//电费收支
				{
					path: 'lmm',
					component: lmm
				},

				{
					path: 'erm',
					component: erm
				},
				{
					path: 'epm',
					component: epm
				},
				{
					path: 'psm',
					component: psm
				},

			]
		}
	]
})*/
