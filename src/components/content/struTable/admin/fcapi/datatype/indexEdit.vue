<template>
	<div  class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">修改数据类型</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
                        <el-button type="primary" size="mini" @click="details">返回详情</el-button>
						<el-button type="primary" size="mini" @click="editTrue">保存数据</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form :model="edit"   >
						<div class="flx">
							<el-form-item label="名称" :label-width="formLabelWidth">
                                <el-input v-model="edit.datatypeName" auto-complete="off"></el-input>
                            </el-form-item>
							<el-form-item label="业务线" :label-width="formLabelWidth">
                                <el-select v-model="edit.bizId" placeholder="请选择业务线" clearable>
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
                                <el-input v-model="edit.datatypeDesc" auto-complete="off"></el-input>
                            </el-form-item>
						</div>
					</el-form>
				</div>

			</div>
			<div class="con_list">
				<div class="l_title">
					<span>字段列表</span>
				</div>
				<div class="formList">
					<el-form :model="edit"   >
						<div class="flx" v-for="(item, index) in edit.add" :key="index">
							<el-form-item label="字段名称" :label-width="formLabelWidth">
                                <el-input v-model="item.fiedName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="字段描述" :label-width="formLabelWidth">
                                <el-input v-model="item.fieldDesc" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据类型" :label-width="formLabelWidth">
                                <el-select v-model="item.fieldDataTypeId" placeholder="请选择" clearable>
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
            dataTypeId: this.$route.query.dataType.dataTypeId,
            // 编辑数据
            edit: {
                datatypeName: this.$route.query.dataType.dataTypeName,
                bizId: this.$route.query.dataType.bizId,
                datatypeDesc: this.$route.query.dataType.dataTypeDesc,
                add: this.$route.query.DatatypeFileds
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
        // 保存添加
        editTrue(){
            let self = this;
            let queryParam = {
                data: {
                    dataTypeId: self.dataTypeId,
                    dataType: {
                        bizId: self.edit.bizId,
                        datatypeDesc: self.edit.datatypeDesc,
                        datatypeName: self.edit.datatypeName
                    },
                    dataTypeFiled: self.edit.add
                }

            };
            self.$http.post(`${process.env.NODE_ENV}/admin/fc/datatype/filed/updateSave`, queryParam)
                .then((response) => {
                    if(response.data.code == 0){
                        self.success("修改成功！");
                    } else {
                        self.notice(response.data.msg);
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        // 详情
        details() {
            let self = this;
            self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/info/${this.dataTypeId}`)
                .then((response) => {
                    let data = response.data.data;
                    this.$router.push({path: "datatypeDetails", query: data});
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
