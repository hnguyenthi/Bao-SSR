<script setup>
import { ref, computed, onMounted } from 'vue';
import { BREAK_POINT_STEP_SIZE } from '~/utils/constraints';
import { formatPrice } from '~/utils';

const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: '物件管理・分析',
        link: 'paidAnalysisDashboard',
    },
    {
        title: '年間収支一覧',
        link: '',
    },
]);
const title = ref('グリーンパーク川口');

const year = ref(new Date().getFullYear());
const setStepSize = () => {
    let maxData = 10000;
    let stepSize = BREAK_POINT_STEP_SIZE.find((item) => item.max >= maxData).step;
    return stepSize;
};
const stepSize = ref(0);
stepSize.value = setStepSize();
const mockDataChart = ref({
    data: {
        labels: [],
        datasets: [
            {
                label: '収入',
                backgroundColor: '#1e4290',
                data: [],
            },
            {
                label: '支出',
                backgroundColor: '#d5d5d5',
                data: [],
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                autoSkip: false,
                min: 0,
                ticks: {
                    font: {
                        size: 12,
                    },
                    stepSize: stepSize.value,
                    precision: 0,
                    callback: function (label, index) {
                        return `￥${label
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                    },
                },
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label +=
                                ' : ￥' +
                                context.parsed.y
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }
                        return label;
                    },
                },
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 20,
                    font: {
                        size: 18,
                    },
                },
            },
        },
    },
});

const mockDataTableIncome = ref({
    fields: ['category', 'title'],
    headers: [
        {
            title: 'category',
            width: 100,
            stick: true,
            hidden: true,
        },
        {
            title: 'title',
            width: 110,
            stick: true,
            hidden: true,
        },
    ],
    footers: ['合計', ''],
    data: [
        {
            category: '賃料',
            title: '賃料',
            priceMonth: Array(12).fill(50000, 0, 1),
        },
        {
            category: '',
            title: '賃料',
            priceMonth: [370000, 370000, 242000, , , , , , , , , ,],
        },
    ],
});
const mockDataTableExpense = ref({
    fields: ['category', 'title'],
    headers: [
        {
            title: 'category',
            width: 100,
            stick: true,
            hidden: true,
        },
        {
            title: 'title',
            width: 110,
            stick: true,
            hidden: true,
        },
    ],
    footers: ['合計', ''],
    data: [
        {
            category: '管理委託手数料',
            title: '管理手数料',
            priceMonth: [, , 26957, , , , , , , , ,],
        },
        {
            category: '建物管理費',
            title: '定期清掃代',
            priceMonth: [35000, 25000, 25000, , , , , , , , , ,],
        },
        {
            category: '',
            title: 'その他',
            priceMonth: [, , 6000, , , , , , , , , ,],
        },
    ],
});
const convertDataTable = (arr) => {
    let month = 12;
    for (let i = 0; i < month; i++) {
        arr.value.headers.push({
            title: `${i + 1}月`,
            width: 100,
        });
        arr.value.fields.push(`month${i + 1}`);
    }
    arr.value.headers.push({
        title: '合計',
        width: 120,
        stick: true,
    });
    arr.value.fields.push('totalPrice');

    arr.value.data = arr.value.data.map((item) => {
        let priceOfMonth = item.priceMonth.reduce(function (obj, item, index) {
            obj[`month${index + 1}`] = item;
            return obj;
        }, {});
        let newItem = {
            category: item.category,
            title: item.title,
            totalPrice: item.priceMonth.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0),
        };
        return { ...priceOfMonth, ...newItem };
    });
};
const makeDataTableFooter = (arr) => {
    let month = 12;
    let temArray = Array(12).fill(0);
    let total = 0;
    const priceForMonth = arr.value.data.reduce((arr, item, index) => {
        total += item.totalPrice;
        for (let i = 0; i < month; i++) {
            if (!isNaN(item[`month${i + 1}`])) {
                arr[i] += item[`month${i + 1}`];
            }
        }
        return arr;
    }, temArray);
    arr.value.footers.push(...priceForMonth, total);
};
const setLabelChart = () => {
    for (let i = 0; i < Math.max(mockDataChart.value.data.datasets[0].data.length, mockDataChart.value.data.datasets[1].data.length); i++) {
        let label = `${year.value + '/' + (i + 1 + '').padStart(2, '0')}`;
        mockDataChart.value.data.labels.push(label);
    }
};
const makeDataChart = () => {
    mockDataTableIncome.value.footers.map((item, index) => {
        if (!isNaN(item) && !!item && index < mockDataTableIncome.value.footers.length - 1) {
            mockDataChart.value.data.datasets[0].data.push(item);
        }
    });
    mockDataTableExpense.value.footers.map((item, index) => {
        if (!isNaN(item) && !!item && index < mockDataTableIncome.value.footers.length - 1) {
            mockDataChart.value.data.datasets[1].data.push(item);
        }
    });
};
convertDataTable(mockDataTableIncome);
makeDataTableFooter(mockDataTableIncome);
convertDataTable(mockDataTableExpense);
makeDataTableFooter(mockDataTableExpense);
makeDataChart();
setLabelChart();

</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="物件管理・分析" showButton />
        <div class="container mx-auto mb-[28px] rounded-t-md bg-white">
            <TabControlPage />
            <div class="md:mx-[50px] pb-[30px]">
                <div
                    class="flex justify-center border-b-[1px] border-solid border-grey pb-[21px] pt-[15px]"
                >
                    <div class="max-w-[242px]">
                        <DatePicker v-model="year" type="year-picker" />
                    </div>
                </div>
                <div class="pb-[28px] pt-[24px]">
                    <p class="font-normalS mb-[5px] text-center text-[20px]">
                        {{ title }}
                    </p>
                    <p class="my-[16px] text-center text-h5 font-medium">
                        支出金額計<span
                            class="text-[36px] font-medium text-primary"
                            >
                            {{formatPrice(mockDataTableIncome.footers[mockDataTableIncome.footers.length - 1] - mockDataTableExpense.footers[mockDataTableExpense.footers.length - 1])}}
                            </span
                        >
                    </p>
                </div>
                <div
                    class="align-center flex justify-center pb-[28px]"
                >
                    <div class="">
                        <BarChart
                            :width="1100"
                            :height="280"
                            :data="mockDataChart.data"
                            :options="mockDataChart.options"
                        />
                    </div>
                </div>
                <div>
                    <div
                        class="mb-[10px] mt-[20px] flex items-center justify-between"
                    >
                        <p class="text-[22px] font-normal">収入の部</p>
                        <div class="flex justify-between">
                            <ExportButton label="PDF出力" class="mr-[28px]" />
                            <ExportButton label="CSV出力" />
                        </div>
                    </div>
                    <TableInformation
                        sticky
                        :footers="mockDataTableIncome.footers"
                        :fields="mockDataTableIncome.fields"
                        :data="mockDataTableIncome.data"
                        :headers="mockDataTableIncome.headers"
                    />
                </div>
                <div>
                    <div
                        class="mb-[10px] mt-[44px] flex items-center justify-between"
                    >
                        <p class="text-[22px] font-normal">支出の部</p>

                        <div class="flex justify-end">
                            <ExportButton label="PDF出力" class="pr-[28px]" />
                            <ExportButton label="CSV出力" />
                        </div>
                    </div>
                    <TableInformation
                        sticky
                        :footers="mockDataTableExpense.footers"
                        :fields="mockDataTableExpense.fields"
                        :data="mockDataTableExpense.data"
                        :headers="mockDataTableExpense.headers"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
