
<template>
	<!--<el-color-picker size="small" class="theme-picker" popper-class="theme-picker-dropdown" v-model="themeVal"></el-color-picker>-->
	<div>
		<el-dropdown trigger="click" @command="handleCommand">
             <span class="el-dropdown-link">
            <i class="el-icon-menu"></i>
          </span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="(item,index) in list"  :key="index" :command=item.value>{{item.name}}</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>






	<!--	<el-dialog title="选择"
				   :visible.sync="box"
				   width="50%">
			<el-radio-group v-model="text">
				<el-radio v-for="(item,index) in list"
						  :key="index"
						  :label="item.value">{{item.name}}</el-radio>
			</el-radio-group>
		</el-dialog>
		<span>
      <i class="el-icon-menu"
		 @click="open"></i>
    </span>-->
	</div>



</template>



<script>
import theme from "@/mixins/theme";

import { mapGetters } from 'vuex';
import { setTheme } from '@/utils/validate'


export default {
  name: "topTheme",
  mixins: [theme()],
	computed: {
		...mapGetters(["themeName"])
	},
  data() {
    return {
      chalk: "",
		box: false,
		text: '',
		list: [
			/*{
				name: '默认主题',
				value: '',
			},*/
			{
				name: '国网绿',
				value: 'theme-green'
			},
			/*{
				name: '橙色',
				value: 'theme-organge'
			}, {
				name: '天蓝色',
				value: 'them-skyBlue'
			}
			,*/  {
				name: '炫彩主题',
				value: 'theme-star'
			},
		/*	{
				name: '黑色主题',
				value: 'theme-black'
			}, */
			{
				name: '渐变主题',
				value: 'theme-gradual'
			}
		]
    };
  },
	mounted () {
		this.text = this.themeName;
		if (!this.text) {
			this.text = '';
		}
		console.log(this.text )
	},

	methods: {
		open () {
			this.box = true;
		},

		handleCommand(command){
		    console.log(command)
			this.text = command;

		}
	},
	watch: {
		text: function (val) {
		    			this.$store.commit('SET_THEME_NAME', val);
			setTheme(val);
		}
	},

};
</script>

<style scoped>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
