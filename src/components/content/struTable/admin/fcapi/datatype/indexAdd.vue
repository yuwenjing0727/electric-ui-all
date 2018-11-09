<template>
	<div  class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">新增数据类型</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="add">保存数据</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form :model="form"   >
						<div class="flx">
							<el-form-item label="名称" :label-width="formLabelWidth">
                                <el-input v-model="form.datatypeName" auto-complete="off"></el-input>
                            </el-form-item>
							<el-form-item label="业务线" :label-width="formLabelWidth">
                                <el-select v-model="form.bizId" placeholder="请选择业务线" clearable>
                                    <el-option 
                                        v-for="keyValueItem in keyValueItemList" 
                                        :key="keyValueItem.ID" 
                                        :label="keyValueItem.NAME" 
                                        :value="keyValueItem.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
						</div>
						
                        <div class="flx">
                            <el-form-item label="描述" :label-width="formLabelWidth">
                                <el-input v-model="form.datatypeDesc" auto-complete="off"></el-input>
                            </el-form-item>
						</div>
					</el-form>
				</div>

			</div>
			<div class="con_list">
				<div class="l_title">
					<span>字段列表</span>
                    <div class="l_btn">
                        <el-button type="primary" size="mini" @click="addField">+</el-button>
                    </div>
				</div>
				<div class="formList">
					<el-form :model="form"   >
						<div class="flx" v-for="(item, index) in form.add" :key="index">
							<el-form-item label="字段名称" :label-width="formLabelWidth">
                                <el-input v-model="item.fieldName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="字段描述" :label-width="formLabelWidth">
                                <el-input v-model="item.fieldDesc" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据类型" :label-width="formLabelWidth">
                                <el-select v-model="item.fieldDatatypeId" placeholder="请选择" clearable>
                                    <el-option 
                                        v-for="keyValueItem in keyValueItemList1" 
                                        :key="keyValueItem.DATATYPEID" 
                                        :label="keyValueItem.DATATYPENAME" 
                                        :value="keyValueItem.DATATYPEID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label-width="formLabelWidth">
                                <el-select v-model="item.fieldType" placeholder="默认" clearable>
                                    <el-option 
                                        v-for="keyValueItem in options" 
                                        :key="keyValueItem.value" 
                                        :label="keyValueItem.label" 
                                        :value="keyValueItem.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-button type="primary" size="mini" @click="delField(index)">-</el-button>
						</div>
					</el-form>


				</div>
			</div>

		</div>


	</div>
</template>

<script>

export default {
    name: "basics-m-tab3",
    data() {
        return {
            // 新增数据
            form: {
                datatypeName:"",
                bizId:"",
                datatypeDesc:"",
                add: []
            },
			formLabelWidth:"100px",
			options: [
                {
                    value: '0',
                    label: '默认'
                },{
                    value: '1',
                    label: '数组'
                }
            ],
            keyValueItemList: [],
            keyValueItemList1: [],
            value:"",
        };
    },
    created() {
        let self = this;
        self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/addbefore`)
            .then((response) => {
                console.log(response);
                self.keyValueItemList = response.data.data.listBiz;
            })
            .catch(function(error) {
                console.log(error);
            });
        self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/getAllIdAndName`)
            .then((response) => {
                self.keyValueItemList1 = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
        // 动态添加数据
        addField() {
            let self = this;
            self.form.add.push({
                fieldName: "",
                fieldDesc: "",
                fieldType: "",
                fieldDatatypeId: ""
            })
        },
        // 删除动态添加的数据
        delField(index) {
            let self = this;
            self.form.add.splice(index, 1);
        },
        // 保存添加
        add(){
            let self = this;
            let queryParam = {
                data: {
                    dataType: {
                        bizId: self.form.bizId,
                        datatypeDesc: self.form.datatypeDesc,
                        datatypeName: self.form.datatypeName
                    },
                    dataTypeFiled: self.form.add
                }

            };
            console.log(queryParam);
            self.$http.post(`${process.env.NODE_ENV}/admin/fc/datatype/filed/save`,queryParam)
                .then((response) => {
                    if(response.data.code == 0){
                        self.success("添加成功！");
                        self.form.datatypeName = "";
                        self.form.bizId = "";
                        self.form.datatypeDesc = "";
                        self.form.add = [];
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });

        },

    }
};
</script>

<style lang="less" scoped >
	.wrap{
		padding: 10px;
		min-height: 100%;
		height: auto;
		position: relative;
		.title{
			width: 100%;
			height: 30px;
			line-height: 30px;

		}
		.content{
			position: absolute;
			top: 50px;
			bottom: 50px;
			left: 10px;
			right: 10px;

			.con_list{
				width: 100%;
				height:auto;
				border-top: 3px  solid #409EFF;
				background: #fff;
				margin-bottom: 10px;
				border-top-left-radius:5px ;
				border-top-right-radius:5px ;
				.l_title{
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					border-bottom:1px  solid #e5e5e5;
					span{
						margin-left: 10px;
					}
					.l_btn{
						float: right;
						margin-right: 10px;
					}


				}
				.formList{
					padding: 10px;
					.flx {
                        display: flex;
                        .el-button {
                            width: 48px;
                            height: 30px;
                        }
						.el-form-item {
							width: 50%;
							padding-right: 30px;
							.el-form-item__label {
								font-weight: 500;
							}
							.el-form-item__content {
								.el-select {
									width: 100%;
								}
							}
						}
						.textArea {
							width: 100%;
							.el-form-item__content {
								margin-left: 100px;
							}
							.el-form-item__label {
								width: 100px;
							}
						}
					}
				}

			}
		}

	}



</style>
