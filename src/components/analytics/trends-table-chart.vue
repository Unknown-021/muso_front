<script>
import { Line , mixins } from 'vue-chartjs'

export default {
    name: "trends-table-chart",
    extends: Line,
    mixins: [mixins],
    props:['group', 'timePeriod', 'selectedSources'],
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(39, 38, 37, 0.7)",
                        }
                    }]
                },
            },
            gradient: null,
            chartData: null
        }
    },
    methods: {
        async getTrendsChart() {
            const { total } = await this.$store.dispatch('analytics/trends/getTrendsChart', {
                id: this.$store.getters['user/data'].id,
                params: {
                    group: this.group,
                    sources: [],
                    period: this.timePeriod
                }
            })
            this.chartData = total
            this.render()
        },
        render() {
            this.gradient = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 400);
            this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.4)");
            this.gradient.addColorStop(0.5, "rgba(0, 231, 255, 0.1)");
            this.gradient.addColorStop(0.8, "rgba(0, 231, 255, 0)");
            
            let data = {
                datasets: [
                    {
                        data: []
                    }
                ]
            };
            data.datasets[0] = {
                    fillColor : this.gradient, // Put the gradient here as a fill color
                    pointColor : "#6BE7C8",
                    pointHighlightFill: "#6BE7C8",
                    pointHighlightStroke: "#6BE7C8",
                    pointBorderWidth: 0,
                    pointHoverRadius: 0,
                    borderColor: '#6BE7C8',
                    pointHoverBorderWidth: 0,
                    pointRadius: 1,
                    borderWidth: 3,
                    pointHitRadius: 16,
                    lineTension: 0,
                    data: [],
            }
            data.datasets[0].data = this.chartData.map(el => el.value)
            data.labels = this.chartData.map(el => el.date)
            data.datasets[0].backgroundColor = this.gradient,
            this.renderChart(data, this.options)
        }
    },
    mounted() {
        this.getTrendsChart()
    }
}
</script>