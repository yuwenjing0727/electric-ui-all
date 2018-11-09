<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary">查询</el-button>
			<el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData3" style="width: 100%" border tooltip-effect="dark">
					<el-table-column prop="index" label="序号" align="center">
					</el-table-column>
                    <el-table-column prop="code" label="计量周期编码" align="center">
					</el-table-column>
                    <el-table-column prop="name" label="计量周期名称" align="center">
					</el-table-column>
                    <el-table-column prop="frequency" label="频率" align="center">
					</el-table-column>
					<el-table-column label="开始时间" align="center">
						<template slot-scope="scope">{{ scope.row.date1 }}</template>
					</el-table-column>
					<el-table-column label="结束时间" align="center">
						<template slot-scope="scope">{{ scope.row.date2 }}</template>
					</el-table-column>
					<el-table-column
						fixed="right"
						width="200"
						label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="small" @click="del">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="计量周期编码" :label-width="formLabelWidth">
						<el-input v-model="form.code" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="计量周期名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="频率" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="开始日期" :label-width="formLabelWidth">
						<el-date-picker v-model="form.data1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结束日期" :label-width="formLabelWidth">
						<el-date-picker v-model="form.data1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">新 增</el-button>
			</div>
		</el-dialog>

        <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit" class="elDialog">
			<el-form :model="editFrom">
				<div class="flx">
					<el-form-item label="计量周期编码" :label-width="formLabelWidth">
						<el-input v-model="editFrom.code" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="计量周期名称" :label-width="formLabelWidth">
						<el-input v-model="editFrom.name" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="频率" :label-width="formLabelWidth">
						<el-select v-model="editFrom.region" placeholder="请选择类型">
							<el-option label="每月" value="每月"></el-option>
							<el-option label="每年" value="每年"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="开始日期" :label-width="formLabelWidth">
						<el-date-picker v-model="editFrom.data1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结束日期" :label-width="formLabelWidth">
						<el-date-picker v-model="editFrom.data1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisibleEdit = false">保 存</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	export default {
		data(){
			return{
				// 表格数据
                tableData3: [
                    {
                        index: 1,
                        code: "JL001",
                        name: "王小虎",
                        frequency: "每月",
                        date1: "2016-05-03",
                        date2: "2017-05-03"
                    }
                ],
				currentPage:1,
				pageSize:10,
				total:0,
				// 弹窗显隐
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
				// 新增数据
                form: {
                    name: "",
                    code: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                formLabelWidth: '100px',
                // 编辑数据
                editFrom: ""
			}
		},
		methods:{
            // 删除弹窗
            del() {
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
			handleClick(row) {
                this.dialogFormVisibleEdit = true;
                this.editFrom = row;
				console.log(row);
			},
			handleSizeChange(){

			},
			handleCurrentChange(){

			}

		}
	}
</script>

<style scoped>
	.btnBox{
		width:100%;
		height:20%;
	}
	.tableBox{
		width:100%;
		height:80%;
	}
	.el-table,.block{
		margin-top: 10px;
	}

</style>
<style lang="less">
	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			.flx {
				display: flex;
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
                        .el-date-editor {
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


</style>
