<template>
		<div  id="all">
			<div class="btnBox" style="text-align: right" >
				<el-button type="primary"  size="small"  @click="routerback()" >返回</el-button>


			</div>
			<div  class="tableBox" >
				<div class="title" style='border-bottom: 1px  solid  #000'>
					<h3>北京电力交易中心有限公司交易结算单</h3>
				</div>
				<div class="top">
					<p style="font-size: 14px">通道名称: <span>{{transChannelName}}</span> </p>
					<p style="font-size: 14px">区间类型: <span>{{areaType}}</span></p>
					<p style="font-size: 12px">结算类型: <span>{{settlementType}}</span></p>
				</div>

				<div class="tableList" v-for="item in tableData">
					<div class="title">
						<h3>{{item.name}}</h3>
					</div>
					<div class="top">
						<span  style="text-align: left">账单期间:2018年8月</span>
						<span  style="text-align: right">单位:兆瓦时、元/兆瓦时(含税)、元</span>
					</div>
					<el-table :data="item.data" style="width: 100%">
						<el-table-column prop="transactionDetails" label="交易明细" align="center">
						</el-table-column>
						<el-table-column label="当月" align="center">
						<el-table-column
								prop="monthElectricQuantity"
								label="电量"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="monthElectricPrice"
								label="电价"
								align="center"
							>
							</el-table-column>
							<el-table-column
								prop="monthElectricFees"
								label="电费"
								align="center"
							>
							</el-table-column>

						</el-table-column>
						<el-table-column
							label="年累计"
							align="center"
						>
							<el-table-column
								prop="yearElectricQuantity"
								label="电量"
								align="center"
							>
							</el-table-column>
							<el-table-column
								prop="yearElectricFees"
								label="电费"
								align="center"
							>
							</el-table-column>


						</el-table-column>
						<el-table-column
							prop="remark"
							label="备注"
							align="center"
						>
						</el-table-column>
					</el-table>
				</div>

			</div>

		</div>
</template>
<style lang="less" scoped>
	.tableBox{
		padding: 0 20px !important;
		.title{
			h3{
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				font-weight: 700;
				text-align: center;
			}
		}
		.top{
			p{
				height: 30px;
				line-height: 30px;
			}


		}
		.tableList{
			margin-top: 20px;
			/*.title{
				h3{
					height: 30px;
					line-height: 30px;
					font-size: 18px;
					font-weight: 700;
					text-align: center;
				}
			}*/
			.top{
				span{
					display: inline-block;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					width: 49%;
				}

			}
		}

	}

</style>
<script>
    export default{
        data(){
			return {
				msg: 'hello vue',
				tableData: [],

				tableData1: [
					{   name:"qqq",
						data: [
						{
							"monthElectricQuantity": "4.0",
							"monthElectricPrice": "0.0",
							"monthElectricFees": "0.0",
							"yearElectricQuantity": "年度电量",
							"yearElectricFees": "年度电费",
							"remark": "备注信息",
							"transactionDetails":"222",
							"name":"售电公司-新疆"
						},
						{
							"monthElectricQuantity": "4.0",
							"monthElectricPrice": "0.0",
							"monthElectricFees": "0.0",
							"yearElectricQuantity": "年度电量",
							"yearElectricFees": "年度电费",
							"remark": "备注信息",
							"transactionDetails":"222",
							"name":"售电公司-新疆"
						}

					]},
					{   name:"qqq",
						data: [
							{
								"monthElectricQuantity": "4.0",
								"monthElectricPrice": "0.0",
								"monthElectricFees": "0.0",
								"yearElectricQuantity": "年度电量",
								"yearElectricFees": "年度电费",
								"remark": "备注信息",
								"transactionDetails":"222",
								"name":"售电公司-新疆"
							},
							{
								"monthElectricQuantity": "4.0",
								"monthElectricPrice": "0.0",
								"monthElectricFees": "0.0",
								"yearElectricQuantity": "年度电量",
								"yearElectricFees": "年度电费",
								"remark": "备注信息",
								"transactionDetails":"222",
								"name":"售电公司-新疆"
							}

						]},



				],
				tableList:[],
				selectId:this.$route.query.id,
				tableAlllData:"",
				transChannelName:"", /*通道名称*/
				areaType:"", /*区间类型*/
				settlementType:"", /*结算类型*/
			}
		},

		mounted() {
			//this.getData()
			this.getPageData()

		},
		methods:{
			routerback: function () {
				this.$router.back(-1)
			},

			/*getData(){
				for (var i in this.tableData1) {
				    console.log(i)
					this.tableData1[i].transactionDetails=i
					this.tableData.push(this.tableData1[i]); //属性

				}
				console.log(this.tableData);

			},*/

			jsonArr(jsonStr){
			    //jsonStr  {name:"111"日前市场:{aaa:""}}
			    var  arr=[]
				for (let key in jsonStr) {
					var  obj={}
					//console.log('key')
					//console.log(key)
					if(key!=='name'){
			            jsonStr[key].transactionDetails=key
						arr.push(jsonStr[key]);
					}
					//console.log(jsonStr[name])
				    obj.name=jsonStr['name']
					//属性
					obj.data=arr
					console.log(obj)
				}
				//console.log("输出三个数组")
				//console.log(arr);
				this.tableData.push(obj)
				console.log(this.tableData)




			},

		    getPageData(){
                // console.log(this.selectData)
				//console.log(this.selectData.settleBillId)
				/* this.selectData.settleBillId=297320*/

				/* this.transChannelName=this.selectData.transChannelName;
				 this.areaType=this.selectData.areaType;
				 this.settlementType=this.selectData.settlementType*/

				this.$http.get(`${process.env.NODE_ENV}/spotmarket/ass/info/examinedetail/${this.selectId}`)
					.then((response) => {
                     console.log(response)
                     if(response.data.code==0){
						 this.tableAlllData=response.data.data.dtl
						 this.transChannelName=response.data.data.title.channelName;
						 this.areaType=response.data.data.title.areaType;
						 this.settlementType=response.data.data.title.settlementType
						 for (let i in this.tableAlllData) {
							 console.log(i)
							 this.tableAlllData[i].name=i
							 this.tableList.push(this.tableAlllData[i]); //
							 console.log('this.tableList')
							 console.log(this.tableList) // [{name:'',aaa:{},bbb:{}},{name:'',aaa:{},bbb:{}}
					 }
						 for(let j=0;j<this.tableList.length;j++){
							 let curtable=this.tableList[j] //{}{name:'',aaa:{},bbb:{}}
							 console.log("次数")
							 console.log(curtable)
							 this.jsonArr(curtable);
						 }

					 }

					})
					.catch(function(error) {
						console.log(error);
					});

		 },


		},
        components: {

        }
    }
</script>
