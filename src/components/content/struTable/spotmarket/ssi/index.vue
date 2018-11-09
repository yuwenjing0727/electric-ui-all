<template>
	<div id="all">
		<div class="btnBox">
		<!--	<el-button type="primary" @click="dialogFormVisible = true" size="small">添加</el-button>
			<el-button type="primary" size="small">分配用户</el-button>
			<el-button type="primary" size="small">取消分配</el-button>
			<el-button type="primary" size="small">查询</el-button>-->
			<el-button type="primary"  size="small"  @click="routerback()" >返回</el-button>
		</div>
		<div class="tableBox">
				<el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" height="100%" >
					<el-table-column label="结算单编号" width="120" align="center"  prop="add1">
					</el-table-column>
					<el-table-column prop="add2" label="结算单名称" width="120" align="center">
					</el-table-column>
					<el-table-column prop="add3" label="市场成员名称" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add4" label="账单期间" show-overflow-tooltip align="center">
				</el-table-column>
					<el-table-column prop="add5" label="账单金额" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add6" label="争议发起人" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add7" label="争议内容" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add8" label="争议发起时间" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add9" label="回复人" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add10" label="回复内容" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add11" label="回复时间" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="add12" label="结算单状态" show-overflow-tooltip align="center">
				</el-table-column>


				</el-table>
		</div>
		<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
		</div>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="活动名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" :label-width="formLabelWidth">
						<el-radio v-model="radio" label="1">男</el-radio>
						<el-radio v-model="radio" label="2">女</el-radio>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="描述" class="textArea">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="时间日期" :label-width="formLabelWidth">
						<el-date-picker v-model="form.data1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="tree">
					<label class="treeLab">权限选择</label>
					<el-tree :data="data2" show-checkbox node-key="id" default-expand-all :props="defaultProps">
					</el-tree>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">新 增</el-button>
			</div>
		</el-dialog>

	</div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
            // 表格数据
            tableData: [
				{
				    add1:"J001",
					add2:"期初", /*账单名称*/
					add3:"国家电网售电公司",
					add4:"2018-1-20",
					add5:"100",
					add6:"张三",
					add7:"1111",
					add8:"2018-1-20",
					add9:"张三",
					add10:"1111",
					add11:"2018-1-20",
					add12:"0"



				}
            ],
            // 分页数据
            currentPage: 1,
            pageSize: 10,
            total: 0,
            // 弹窗显隐
            dialogFormVisible: false,
            // 新增数据
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            formLabelWidth: "100px",
            // 单选
            radio: "1",
            // 树
            data2: [
                {
                    id: 1,
                    label: "基础业务平台",
                    children: [
                        {
                            id: 2,
                            label: "英大长安",
                            children: [
                                {
                                    id: 3,
                                    label: "编辑器组件"
                                },
                                {
                                    id: 4,
                                    label: "Excel导入"
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: "英大长安-管理",
                            children: [
                                {
                                    id: 6,
                                    label: "机构管理",
                                    children: [
                                        {
                                            id: 7,
                                            label: "修改"
                                        },
                                        {
                                            id: 8,
                                            label: "明细"
                                        }
                                    ]
                                },
                                {
                                    id: 9,
                                    label: "人员管理",
                                    children: [
                                        {
                                            id: 10,
                                            label: "修改"
                                        },
                                        {
                                            id: 11,
                                            label: "明细"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods: {
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
            console.log(row);
        },
        handleSizeChange() {},
        handleCurrentChange() {},
		routerback: function () {
			this.$router.back(-1)
		},
    }
};
</script>

<style lang="less" scoped >
.btnBox {
    width: 100%;
    height: 40px;
}

.tableBox {
	position: absolute;
    top: 50px;
    bottom: 50px;
    left: 10px;
    right: 10px;
	overflow: auto;
}
.block{
	position: absolute;
	padding: 0 10px;
	height: 40px;
	left:10px;
	right:10px;
    bottom: 0;
    border-top:1px solid #eee;
    div{
		position: absolute;
        right:10px;
        bottom:3px
    }
}
</style>
