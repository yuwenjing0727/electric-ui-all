<template>
    <div class="left-tree" :style='{width:boxstyle.routetreestyle}'>

        <el-tree v-show="!boxstyle.show" :style='{overflow:defaultauto}' ref="tree" :data="data" :props="defaultProps" :default-expanded-keys="[current]" :highlight-current="true" accordion @node-click="handleNodeClick" node-key="id">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                    <i class="iconfont" :class="node.icon"></i> {{ node.label }}
                </span>
            </span>
        </el-tree>
        <!-- <el-menu unique-opened  class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" background-color="#00142a" text-color="hsla(0,0%,100%,.65)" active-text-color="#409eff" :collapse="isCollapse">
            <slidertree :menu="data" :isCollapse="isCollapse"></slidertree>
        </el-menu> -->

       <!-- <span @click="togglemenu()">
            <i class="el-icon-d-arrow-left" style="line-height: 50px;" title="收起" v-if="!boxstyle.show"></i>
            <i class="el-icon-d-arrow-right" style="line-height: 50px;" title="展开" v-if="boxstyle.show"></i>
        </span>-->
		<div :class="!boxstyle.show? 'dislpayArrowClose' : 'dislpayArrowOpen'" @click="togglemenu()">
			<a class="closed" href="javascript:void(0)" title="收起" v-if="!boxstyle.show"></a>
			<a class="opened" href="javascript:void(0)" title="展开" v-if="boxstyle.show"></a>
		</div>
    </div>
</template>
<script>
import Bus from "@/eventBus.js";
/*var treedata=require("./tree.json")*/
export default {
    name: "trees",
    data() {
        return {
            isCollapse: true,
            data:[],
            defaultProps: {
                children: "children",
                label: "label"
            },
            defaultauto: "auto",
            show: false,
			buttons:{},
			homePageFlag:false,
			components:[],
			buttonPermission:{}
        };
    },
    props: {
        boxstyle: {
            type: Object,
            requre: true
        }
    },
    computed: {
        current() {
            // 设置默认展开的状态
            var tree = sessionStorage.currentTree;
            if (tree) {
                return tree;
            }
            return "-1";
        }
    },
	created(){

    	this.getMenuTreeData();
	},
    mounted() {
        /*this.setCurrentKey();*/
        Bus.$on("setroute", currentroute => {
        	if(this.$refs.tree){
				this.$refs.tree.setCurrentKey(currentroute.id);
			}

        });
    },
    methods: {
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
					this.data = response.data.data.menus;
					this.buttons = response.data.data.buttons;
					if(this.homePageFlag){
						response.data.data.components.push("/homePage");
					}
					this.components = response.data.data.components;
					sessionStorage.setItem("buttons",JSON.stringify(this.buttons));
					sessionStorage.setItem("components",JSON.stringify(this.components));

				})
				.catch(function(error) {
					console.log(error);
				});


		},
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        togglemenu() {
            if (this.boxstyle.show) {
                this.$set(this.boxstyle, "show", false);
                this.$set(this.boxstyle, "routetreestyle", "15%");
                this.$set(this.boxstyle, "rightbox", "85%");
                this.defaultauto = "auto";
            } else {
                this.$set(this.boxstyle, "show", true);
                this.$set(this.boxstyle, "routetreestyle", "0%");
                this.$set(this.boxstyle, "rightbox", "100%");
                this.defaultauto = "hidden";
            }
        },
        setCurrentKey() {
            var tree = sessionStorage.currentTree;
            var currentroute = this.$route.path;
            // 设置目录树的状态

            if (tree) {
                this.$refs.tree.setCurrentKey(tree);
            } else {
                this.$refs.tree.setCurrentKey("3");
            }
        },
        handleNodeClick(data) {
            console.log(this.$route.path);
            console.log(data.url)
            if (data.url) {
                if (data.Relative == false) {
                    location.href = data.url;
                } else {
                    Bus.$emit("treeData", data);

                    /*//获取到要跳转的界面的按钮权限
					for(var key in this.buttons){
						if(key == data.url){
							this.buttonPermission = this.buttons[key];
							break;
						}
					}
					//将按钮权限传递到要路由的界面
					Bus.$emit("buttonPermission",this.buttonPermission);*/
                    this.$router.push({
                        path: data.url
                    });
                }

                this.getCurrentKey();
                // this.$set(this.boxstyle,"fadeshow",true)
            }
        },
        getCurrentKey() {
            var tree = this.$refs.tree.getCurrentKey();
            if (tree) {
                sessionStorage.setItem("currentTree", tree);
            } else {
                sessionStorage.setItem("currentTree", "3");
            }
        }
    },
	watch:{
		/*$route(to,from){
			console.log("路由变化");
			console.log(to.path);
			//获取到要跳转的界面的按钮权限
			for(var key in this.buttons){
				if(key == to.path){
					this.buttonPermission = this.buttons[key];
					break;
				}
			}
			//将按钮权限传递到要路由的界面
			Bus.$emit("buttonPermission",this.buttonPermission);


		}*/
	},
    components: {}
};
</script>
<style lang="less" scoped>
	.dislpayArrowClose{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 206px;
		width: 15px;
		height: 100%;
		z-index: 10;
		transition: all 0.2s ease 0s;
	}
	.dislpayArrowOpen{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 15px;
		height: 100%;
		z-index: 10;
		transition: all 0.2s ease 0s;
	}
	.dislpayArrowClose a.closed {
		background: url(../../../static/img/icon_arrow.png) no-repeat 0 0;
		position: absolute;
		display: block;
		width: 17px;
		height: 61px;
		top: 50%;
		margin-top: -30px;
		outline: none;
	 }
	.dislpayArrowOpen a.opened {
		background: url(../../../static/img/icon_arrow.png) no-repeat 0 0;
		background-position: 0 -61px;
		position: absolute;
		display: block;
		width: 17px;
		height: 61px;
		top: 50%;
		margin-top: -30px;
		outline: none;
	}

.left-tree {
    /*background-color: #002140;*/
    width: 18%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s;
    & > span {
        width: 20px;
        height: 50px;
        position: absolute;
        z-index: 1;
        right: -10px;
        top: 50%;
        transform: translate(50%, -50%);
      /*  background: #ddd6d6;*/
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
        i {
            width: 100%;
            font-size: 20px;
            font-weight: 500;
        }
    }
}
</style>

