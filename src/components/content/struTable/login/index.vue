<template>
    <div class="mapbox">
        <div id="loginmap">

        </div>
        <div class="describev">

        </div>
    </div>
</template>

<script>
var chinaMap = require("@/../static/json/china.json");
export default {
    data() {
        return {
            mapjson: chinaMap,
            setting: {
                title: {
                    top: 40,
                    left: 30,
                    textStyle: {
                        fontSize: 24,
                        color: "#eee"
                    },
                    show: true,
                   /* text: "全国统一电力市场电费结算系统",
                    subtext: "进入首页",
                    sublink: "/#/homePage",
                    subtarget: "self",*/
                    itemGap: 20,
                    subtextStyle: {
                        fontSize: 16,
                        right: 0,
                        color: "#f40",
                        fontWeight:"bold"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} (万瓦)'
                },
                visualMap: {
                    min: 800,
                    max: 50000,
                    text:['高','低'],
                    calculable: true,
                    left:"100px",
                    bottom:"20px",
                    inRange: {
                        color: ['lightskyblue','yellow', 'orangered']
                    }
                },
                series: [
                   {
                        name: '地图',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        layoutCenter: ["70%", "70%"],
                        color:["#000"],
                        itemStyle: {
                                normal: {
                                    label:{show: true},
                                    textStyle: {
                                        color: "#fff",
                                        fontSize: 10
                                    }
                                },
                                emphasis: {
                                    label:{show: true},
                                    textStyle: {
                                        fontSize: 22,
                                        color: "#06D4CD"
                                    }
                                }
                        },
                        data:[
                            {name:"北京",value:40000},
                            {name:"天津",value:30000},
                            {name:"蒙东",value:800},
                            {name:"山西",value:20000},
                            {name:"河北",value:800},
                            {name:"辽宁",value:800},
                            {name:"吉林",value:800},
                            {name:"黑龙江",value:3600},
                            {name:"湖南",value:800},
                            {name:"湖北",value:800},
                            {name:"江西",value:800},
                            {name:"河南",value:800},
                            {name:"上海",value:800},
                            {name:"浙江",value:800},
                            {name:"江苏",value:800},
                            {name:"山东",value:800},
                            {name:"安徽",value:800},
                            {name:"福建",value:800},
                            {name:"甘肃",value:800},
                            {name:"陕西",value:800},
                            {name:"青海",value:800},
                            {name:"宁夏",value:800},
                            {name:"新疆",value:800},
                            {name:"西藏",value:800},
                            {name:"四川",value:800},
                            {name:"重庆",value:800},
                        ],
					   // 自定义名称映射
					   nameMap: {
						   '北京市': '北京',
						   '天津市': '天津',
						   '内蒙古自治区': '蒙东',
						   '山西省': '山西',
						   '河北省': '河北',
						   '辽宁省': '辽宁',
						   '吉林省': '吉林',
						   '黑龙江省': '黑龙江',
						   '湖南省': '湖南',
						   '湖北省': '湖北',
						   '江西省': '江西',
						   '河南省': '河南',
						   '上海市': '上海',
						   '浙江省': '浙江',
						   '江苏省': '江苏',
						   '山东省': '山东',
						   '安徽省': '安徽',
						   '福建省': '福建',
						   '甘肃省': '甘肃',
						   '陕西省': '陕西',
						   '青海省': '青海',
						   '宁夏回族自治区': '宁夏',
						   '新疆维吾尔自治区': '新疆',
						   '西藏自治区': '西藏',
						   '四川省': '四川',
						   '重庆市': '重庆'
					   }
                   },
                   /*{
                        name: 'pm2.5',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name:"河南省",value:800}
                        ]
                   }*/
                ],
                // geo: {
                //     regions: [
                //         {
                //             name: "北京市",
                //             itemStyle: {
                //                 areaColor: "red",
                //                 color: "yellow"
                //             }
                //         },
                //     ],
                //     layoutCenter: ["50%", "50%"],
                //     layoutSize: 800,
                //     map: "china",
                //     roam: true,
                //     itemStyle: {
                //         normal: {
                //             borderType: "solid",
                //             borderColor: "#fff",
                //             borderWidth: 2,
                //             areaColor: "#323c48"
                //         },
                //         emphasis: {
                //             areaColor: "#666"
                //         }
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             textStyle: {
                //                 color: "#fff",
                //                 fontSize: 10
                //             }
                //         },
                //         emphasis: {
                //             show: true,
                //             textStyle: {
                //                 fontSize: 12,
                //                 color: "#06D4CD"
                //             }
                //         }
                //     }
                // }
            },
			homePageFlag:false,
			components:[]
        };
    },
    mounted() {
        this.initmap(
            document.getElementById("loginmap"),
            this.mapjson,
            this.setting
        );
    },
    created(){
      this.settoken();
      this.getMenuTreeData();
    },
    methods: {
        settoken(){
          /*if(location.search){
              var strs = location.search.substr(1).split("=");
              sessionStorage.setItem(strs[0],strs[1])
            }*/
          if(location.href.indexOf("?") >=0){
			  var index = location.href.indexOf("?");
			  var strs = location.href.substring(index+1,location.href.length).split("=")
			  sessionStorage.setItem(strs[0],strs[1])
		  }
        },
		/*获取菜单树结构*/
		getMenuTreeData(){
			this.$http.get(`${process.env.NODE_ENV}/admin/menu/init`)
				.then((response) => {
					console.log(response);
					for(let i=0;i<response.data.data.menus.length;i++){
						if(response.data.data.menus[i].label == "首页"){
							response.data.data.menus.splice(i,1);
							this.homePageFlag = true;
							break;
						}
					}
					if(this.homePageFlag){
						response.data.data.components.push("/homePage");
					}
					sessionStorage.setItem("components",JSON.stringify(response.data.data.components));

				})
				.catch(function(error) {
					console.log(error);
				});


		},

        initmap(ele, map, sets) {
            var self=this;
            this.echarts.registerMap("china", map);//地图数据
            this.myChart = this.echarts.init(ele); // 地图容器
            this.myChart.setOption(sets);  //配置参数
            this.myChart.on("click", function(data) {
                console.log(data.data);
                if(data.data){
					self.$router.push({path:"/homePage",query:{areaName:data.data.name}});
				}

            });
            this.myChart.on("mouseover", function(data) {
                // console.log(data);
            });
        }
    }
};
</script>

<style lang="less" scoped >
.mapbox {
    display: flex;
    width: 100%;
    height: 100%;
    // background: url("../../../../../static/img/map.png") ;

    background: #404a59;
    background-image: linear-gradient(0deg,  rgba(97, 182, 130, 0.76),rgb(72, 107, 117))
    // background-size: 100% 100%;
}
#loginmap {
    width: 100%;
    height: 100%;
    user-select: none;
}
.describev{
    // width:26%;
    height:100%;
    // background: #38465a;
}
</style>
