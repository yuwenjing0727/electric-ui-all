<template>
	<div class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">新增数据类型</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="edit">前往修改页面</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form>
						<div class="flx">
							<el-form-item label="名称:" :label-width="formLabelWidth">
								<span>{{details.datatypeName}}</span>
							</el-form-item>
							<el-form-item label="业务线:" :label-width="formLabelWidth">
								<span>{{details.bizName}}</span>
							</el-form-item>
						</div>

						<div class="flx">
							<el-form-item label="描述:" :label-width="formLabelWidth">
								<span>{{details.datatypeDesc}}</span>
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
					<el-table :data="details.add" style="width: 100%" >
						<el-table-column prop="fiedName" label="字段名称" width="180" header-align="center">
						</el-table-column>
						<el-table-column prop="dataTypeName" label="数据类型" width="180" header-align="center">
						</el-table-column>
						<el-table-column prop="fieldDesc" label="字段描述" header-align="center">
						</el-table-column>
					</el-table>

				</div>
			</div>
            <div class="con_list">
				<div class="l_title">
					<span>数据结构</span>
				</div>
				<div class="formList font">
                    <label>{{details.datatypeName}}:</label>
                    <span>{{details.datatypeDesc}}</span>
                    <ul>
                        <li v-for="(item, index) in details.add" :key="index">
                            <label>{{item.fiedName}}</label>
                            {<span>类型：{{item.dataTypeName}},描述{{item.fieldDesc}}</span>}
                        </li>
                    </ul>
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
                tableData: [],
                datatypeId: this.$route.query.dataType.dataTypeId,
				// 新增数据
				details: {
					datatypeName: this.$route.query.dataType.dataTypeName,
					bizName: this.$route.query.dataType.bizName,
					datatypeDesc: this.$route.query.dataType.dataTypeDesc,
					add: this.$route.query.DatatypeFileds
				},
				formLabelWidth: "100px",
				keyValueItemList: [],
				keyValueItemList1: [],
				value: "",
			};
		},
		created() {
			let self = this;
		},
		methods: {
			// 编辑
			edit() {
                let self = this;
                self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/info/${this.datatypeId}`)
                    .then((response) => {
                        if(response.data.code == 0){
                            console.log(response.data.data);
                            let data = response.data.data;
                            self.$router.push({path: "datatypeEdit", query: data});
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
			},

		}
	};

</script>

<style lang="less" scoped>
	.wrap {
		padding: 10px;
		min-height: 100%;
		height: auto;
		position: relative;
		.title {
			width: 100%;
			height: 30px;
			line-height: 30px;

		}
		.content {
			position: absolute;
			top: 50px;
			bottom: 50px;
			left: 10px;
			right: 10px;

			.con_list {
				width: 100%;
				height: auto;
				border-top: 3px solid #409EFF;
				background: #fff;
				margin-bottom: 10px;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				.l_title {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					border-bottom: 1px solid #e5e5e5;
					span {
						margin-left: 10px;
					}
					.l_btn {
						float: right;
						margin-right: 10px;
					}


                }
				.formList {
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
                            margin-bottom: 0px;
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
                .font {
                    font-size: 16px;
                    padding-bottom: 20px;
                    li {
                        list-style: inside;
                        margin-left: 10px;
                    }
                    label {
                        font-weight: 600 !important;
                    }
                }

			}
		}

	}

</style>
