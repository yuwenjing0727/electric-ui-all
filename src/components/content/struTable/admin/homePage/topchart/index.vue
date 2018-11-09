<template>
    <div class="topchart" id="topchart">

    </div>
</template>
<script>
export default {
    name: "topchart",
    data() {
        return {
        option : {
            color: ["#f40",'#3398DB'],
            tooltip: {
                    trigger: 'axis'
                },
            title: [
                    {
                        text: '2018年9月电量电费',
                        textStyle:{
                            fontSize: 16,
                            color: "#666"
                        },
                        x: '45%',
                        // subtext:"2018年9月份",
                        subtextStyle: {
                            fontSize: 12,
                            color: "#ccc",
                            fontWeight:"bold"
                        }
                    }
            ],
            legend: {
                    data:['电量','电费'],
                    right:"80"
                },
            xAxis: {
                type: 'category',
				axisLabel: {
					interval: 0,
					rotate: 75
				},
                /*data: ["北京","天津","蒙东","山西","河北","辽宁","吉林","湖南","湖北","江西","河南","上海","浙江","江苏","山东","安徽","陕西","青海","宁夏","新疆","西藏","四川","重庆"],*/
				data: ["9/1","9/2","9/3","9/4","9/5","9/6","9/7","9/8","9/9","9/10","9/11","9/12","9/13","9/14","9/15",
					"9/16","9/17","9/18","9/19","9/20","9/21","9/22","9/23","9/24","9/25","9/26","9/27","9/28","9/29","9/30"],
                name:"月日"
            },
            yAxis: {
                type: 'value',
				splitNumber:10
			},
            nameTextStyle:{

            },
            series: [
                {
                    name:'电量',
                    stack: '电量',
                    type: 'bar',
                    data: [5000, 4900, 4800, 2000, 5500, 1000, 5900,6000,6000,6100,4800,4700,6800,5700,4800,5000, 8000, 4800, 6200, 5500, 4200, 5900,6000,7800,6100,4800,4700,6800,5700,4800],
                },
                {
                    name:'电费',
                    stack: '电费',
                    type: 'bar',
                    data: [6000, 5000, 4700, 3000, 6100, 3000, 4900,6100,5100,6000,4900,5800,4800, 5800,5600,6000, 6000, 4700, 6000, 6100, 4800, 4900,6100,9000,6000,4900,5800,4800, 5800,5600],
                }
            ]
        },
        myChart: {}
        };
    },
    computed: {},
    mounted() {
        this.initchart(
                document.getElementById("topchart"),
                this.option,
                )
    },
    methods: {
        initchart(ele, option) {
                this.myChart = this.echarts.init(ele);
                this.myChart.setOption(option);
            },
    }
};
</script>
<style lang="less" scoped>
.topchart{
    width:100%;
    height:100%;
}
</style>


