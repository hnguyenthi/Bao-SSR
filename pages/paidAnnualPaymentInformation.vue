<script setup>
import { ref, computed, onMounted } from 'vue';
import { BREAK_POINT_STEP_SIZE } from '~/utils/constraints.js';

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
        title: '年間入金一覧',
        link: '',
    },
]);

const year = ref(new Date().getFullYear());
const data = Array(12).fill(950000);
const setStepSize = () => {
    let maxData = Math.max(...data);
    let stepSize = BREAK_POINT_STEP_SIZE.find(
        (item) => item.max >= maxData,
    ).step;
    console.log(stepSize);
    return stepSize;
};
const stepSize = ref(0);
stepSize.value = setStepSize();
const mockDataChart = ref({
    data: {
        labels: [],
        datasets: [
            {
                label: '入金額',
                backgroundColor: '#1e4290',
                data: data,
            },
        ],
    },
    options: {
        responsive: true, // not necessary, default is `true`,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                autoSkip: false,
                min: 0,
                ticks: {
                    font: {
                        fontSize: 12,
                    },
                    stepSize: setStepSize(),
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

const mockDataTable = ref({
    fields: ['roomID', 'contractName'],
    headers: [
        {
            title: '部屋番号',
            width: 100,
            stick: true,
        },
        {
            title: '契約者名',
            width: 110,
            stick: true,
        },
    ],
    footers: ['合計', ''],
    data: [
        {
            roomID: '101',
            contractName: '増田　孝太',
            priceMonth: Array(12).fill(37000),
        },
        {
            roomID: '102',
            contractName: '吉田　浩二',
            priceMonth: Array(12).fill(70000),
        },
        {
            roomID: '103',
            contractName: '奥山　康史',
            priceMonth: Array(12).fill(51000),
        },
        {
            roomID: '201',
            contractName: '佐藤　志野',
            priceMonth: Array(12).fill(73000),
        },
        {
            roomID: '202',
            contractName: '■■企画',
            priceMonth: Array(12).fill(80000),
        },
        {
            roomID: '23',
            contractName: '丸山　由利子',
            priceMonth: Array(12).fill(49000),
        },
    ],
});
const convertDataTable = () => {
    let month = 12;
    for (let i = 0; i < month; i++) {
        mockDataTable.value.headers.push({
            title: `${i + 1}月`,
            width: 100,
        });
        mockDataTable.value.fields.push(`month${i + 1}`);
    }
    mockDataTable.value.headers.push({
        title: '合計',
        width: 120,
        stick: true,
    });
    mockDataTable.value.fields.push('totalPrice');

    mockDataTable.value.data = mockDataTable.value.data.map((item) => {
        let priceOfMonth = item.priceMonth.reduce(function (obj, item, index) {
            obj[`month${index + 1}`] = item;
            return obj;
        }, {});
        let newItem = {
            roomID: item.roomID,
            contractName: item.contractName,
            totalPrice: item.priceMonth.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0),
        };
        return { ...priceOfMonth, ...newItem };
    });
};
const makeDataTableFooter = () => {
    let month = 12;
    let temArray = Array(12).fill(0);
    let total = 0;
    const priceForMonth = mockDataTable.value.data.reduce(
        (arr, item, index) => {
            total += item.totalPrice;
            for (let i = 0; i < month; i++) {
                arr[i] += item[`month${i + 1}`];
            }
            return arr;
        },
        temArray,
    );
    mockDataTable.value.footers.push(...priceForMonth, total);
};
const setLabelChart = () => {
    for (let i = 0; i < 12; i++) {
        let label = `${year.value + '/' + (i + 1 + '').padStart(2, '0')}`;
        mockDataChart.value.data.labels.push(label);
    }
};

setLabelChart();
convertDataTable();
makeDataTableFooter();
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="物件管理・分析" showButton />
        <div class="container mx-auto mb-[28px] rounded-t-md bg-white">
            <TabControlPage />
            <div class="pb-[30px] md:mx-[50px]">
                <div
                    class="flex justify-center border-b-[1px] border-solid border-grey pb-[21px] pt-[15px]"
                >
                    <div class="max-w-[242px]">
                        <DatePicker v-model="year" type="year-picker" />
                    </div>
                </div>

                <div
                    class="align-center flex justify-center pb-[28px] pt-[24px]"
                >
                    <div class="">
                        <BarChart
                            title="グリーンパーク川口"
                            :width="1100"
                            :height="280"
                            :data="mockDataChart.data"
                            :options="mockDataChart.options"
                        />
                    </div>
                </div>
                <div class="mb-[10px] mt-[20px] flex justify-end">
                    <ExportButton label="PDF出力" class="pr-[28px]" />
                    <ExportButton label="CSV出力" />
                </div>
                <TableInformation
                    sticky
                    :footers="mockDataTable.footers"
                    :fields="mockDataTable.fields"
                    :data="mockDataTable.data"
                    :headers="mockDataTable.headers"
                />
            </div>
        </div>
    </div>
</template>
