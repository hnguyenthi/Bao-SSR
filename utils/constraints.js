import { layouts } from "chart.js";

export const CATEGORY_INCOME_EXPENSE = [
    {
        id: 1,
        title: '賃料',
        subCategory: [
            {
                id: 1,
                title: '家賃',
            },
            {
                id: 2,
                title: '共益費',
            },
        ],
    },
    {
        id: 2,
        title: '駐車料',
        subCategory: [
            {
                id: 1,
                title: '駐車料',
            },
            {
                id: 2,
                title: '駐車場2台目',
            },
        ],
    },
    {
        id: 3,
        title: '区費・町会費',
        subCategory: [
            {
                id: 1,
                title: '区費・町会費',
            },
        ],
    },
    {
        id: 4,
        title: '敷金・保証金',
        subCategory: [
            {
                id: 1,
                title: '敷金',
            },
        ],
    },
    {
        id: 5,
        title: 'その他',
        subCategory: [
            {
                id: 1,
                title: 'その他',
            },
        ],
    },
];

export const DATA_DEFAULT = {
    labels: ['', ''],
    datasets: [
        {
            label: '収入',
            data: [1486],
            borderWidth: 1,
            backgroundColor: '#1e4290',
            stack: 'Stack 0',
        },
        {
            label: '支出',
            data: [0, 390],
            borderWidth: 1,
            backgroundColor: '#d5d5d5',
            stack: 'Stack 1',
        },
        {
            label: '利益',
            data: [0, 1096],
            borderWidth: 1,
            backgroundColor: '#a38e5a',
            stack: 'Stack 1',
        },
    ],
};
export const OPTIONS_DEFAULT = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    size: 18,
                },
                maxTicksLimit: 5,
                callback: function (label, index) {
                    if (index === 3) {
                        return [
                            '（千円）',
                            label
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        ];
                    } else {
                        return label
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                },
            },
        },
    },
    tooltips: {
        enabled: true,
    },
    plugins: {
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
    animation: {
        animateScale: true,
        animateRotate: true,
    },
    cutoutPercentage: 80,
};
export const options_test = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [
            {
                stacked: true,
                gridLines: {
                    display: true,
                    color: 'rgba(255,99,132,0.2)',
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
            },
        ],
    },
};
export const BREAK_POINT_STEP_SIZE = [
    {
        max: 1000000,
        step: 100000,
    },
    {
        max: 2000000,
        step: 200000,
    },
    {
        max: 100000000,
        step: 500000,
    },
];
export const ITEM_PER_PAGE_OPTIONS = [10, 25, 50];
export const ORDER_SELECT_OPTIONS = [
    {
        value: 'upldate-asc',
        label: 'アップロード順（昇順）',
    },
    {
        value: 'upldate-desc',
        label: 'アップロード順（降順）',
    },
    {
        value: 'yymm-asc',
        label: '対象年月順（昇順）',
    },
    {
        value: 'yymm-desc',
        label: '対象年月順（降順）',
    },
];
export const STATUS_CHECKING = [
    {
        status: 'notyet',
        label: '未反映',
        description:
            '収支報告書を確認中で分析ツールにはまだ反映されていない状態です。',
        color: '#52b2d6',
    },
    {
        status: 'during',
        label: '反映中',
        description: '分析ツールへの登録作業を行っている状態です。',
        color: '#88b524',
    },
    {
        status: 'done',
        label: '反映済',
        description: '分析ツールへの登録作業を行っている状態です。',
        color: '#e8a642',
    },

    {
        status: 'problem',
        label: '不備有',
        description: '収支報告書に不備がある状態です。',
        color: '#e55674',
    },
    {
        status: 'excluded',
        label: '対象外',
        description: '分析ツールへの登録作業が完了している状態です。',
        color: '#9c9c9c',
    },
];
export const CATEGORY_NEW = [
    {
        id: 0,
        type: 'all',
        title: '全体',
    },
    {
        id: 1,
        type: 'event',
        title: 'イベント',
    },
    {
        id: 2,
        type: 'information',
        title: 'アップデート情報',
    },
];
export const ITEM_PER_PAGE = 10;
export const MONTH_FORM = () => {
    let year = [2017, 2018, 2019];
    let monthOptions = [];
    year.map((item) => {
        for (let i = 1; i <= 12; i++) {
            monthOptions.push({
                value: `${item}年${i}月`,
                label: `${item}年${i}月`,
            });
        }
    });
    return monthOptions;
};
export const OPTIONS_ROOM = [
    {
        value: '',
        label: '―',
    },
    {
        value: '101',
        label: '101',
    },
    {
        value: '101',
        label: '101',
    },
    {
        value: '102',
        label: '102',
    },
    {
        value: '103',
        label: '103',
    },
    {
        value: '201',
        label: '201',
    },
    {
        value: '202',
        label: '202',
    },
    {
        value: '203',
        label: '203',
    },
];
export const OPTIONS_CATEGORY = [
    {
        value: '賃料',
        label: '賃料',
    },
    {
        value: '通信費',
        label: '通信費',
    },
    {
        value: '入居促進費',
        label: '入居促進費',
    },
    {
        value: '保険料',
        label: '保険料',
    },
    {
        value: '駐車料',
        label: '駐車料',
    },
    {
        value: '駐輪場',
        label: '駐輪場',
    },
    {
        value: 'バイク置き場',
        label: 'バイク置き場',
    },
    {
        value: '水光熱費',
        label: '水光熱費',
    },
    {
        value: '区費・町会費',
        label: '区費・町会費',
    },
    {
        value: '敷金・保証金',
        label: '敷金・保証金',
    },
    {
        value: '礼金',
        label: '礼金',
    },
    {
        value: '保証料',
        label: '保証料',
    },
    {
        value: '解約費・更新料',
        label: '解約費・更新料',
    },
    {
        value: '修繕費',
        label: '修繕費',
    },
    {
        value: '過不足調整',
        label: '過不足調整',
    },
    {
        value: '不明金調整',
        label: '不明金調整',
    },
    {
        value: 'その他',
        label: 'その他',
    },
];
export const OPTIONS_ITEM = [
    {
        value: '賃料',
        title: '賃料',
    },
    {
        value: '* 共 益 費',
        title: '* 共 益 費',
    },
    {
        value: '共 益 費',
        title: '共 益 費',
    },
    {
        value: '賃 料',
        title: '賃 料',
    },
    {
        value: '* 賃 料',
        title: '* 賃 料',
    },
    {
        value: '一括賃料',
        title: '一括賃料',
    },
    {
        value: '借上金額',
        title: '借上金額',
    },
    {
        value: 'サブリース料',
        title: 'サブリース料',
    },
    {
        value: '保証賃料',
        title: '保証賃料',
    },
    {
        value: '家賃',
        title: '家賃',
    },
    {
        value: '管理費',
        title: '管理費',
    },
    {
        value: 'その他',
        title: 'その他',
    },
];
export const QUESTION_TYPE = [
    {
        type: 0,
        name: 'RadioButton',
    },
    {
        type: 1,
        name: 'CheckBox',
    },
    {
        type: 2,
        name: 'TextBox',
    },
    {
        type: 3,
        name: 'ComboBox',
    },
    {
        type: 4,
        name: 'Number（整数）',
    },
    {
        type: 5,
        name: 'Number（小数点以下可）',
    },
];

export const STATUS_USER = {
    NEW: 0,
    WAITING_REPORT: 11,
    CALCULATING: 12,
    STRIPE_PROCESSING: 13,
    WAITING_PAYMENT: 14,
    DATA_REFRESHING: 15,
    USE: 1,
    CANCEL_APPLICATION: 21,
    CANCEL_PROCESSING: 22,
    CANCEL: 2,
    STOP: 9,
    ERROR: 8,
};
export const STATUS_USER_TITLE = {
    0: '新規申込',
    11: '収支待ち',
    12: '金額算出中',
    13: 'Stripe処理中',
    14: '決済待ち',
    15: 'データ反映中',
    1: '利用中',
    21: '解約申込中',
    22: '解約処理中',
    2: '解約済',
    9: '利用停止',
    8: 'エラー',
};
export const USER_STATUS = [
    {
        // NEW
        value: 0,
        label: '新規申込',
    },
    {
        // USE
        value: 1,
        label: '利用中',
    },
    {
        // CANCEL
        value: 2,
        label: '解約済',
    },
    {
        // STOP
        value: 9,
        label: '利用停止',
    },
    {
        // ERROR
        value: 8,
        label: 'エラー',
    },
    {
        // WAITING_REPORT
        value: 11, 
        label: '収支待ち',
    },
    {
        // CALCULATING
        value: 12,
        label: '金額算出中',
    },
    {
        // STRIPE_PROCESSING
        value: 13,
        label: 'Stripe処理中',
    },
    {
        // WAITING_PAYMENT
        value: 14,
        label: '決済待ち',
    },
    {
        // DATA_REFRESHING
        value: 15,
        label: 'データ反映中',
    },
    {
        // CANCEL_APPLICATION
        value: 21,
        label: '解約申込中',
    },
    {
        // CANCEL_PROCESSING
        value: 22,
        label: '解約処理中',
    }
];
export const STATUS_REFLECTION = {
    NOT_REFLECTED: 1,
    REFLECTING: 2,
    REFLECTED: 3,
    ERROR: 4,
    NOT_SUBJECT: 5,
};
export const STATUS_REFLECTION_TITLE = {
    1: '未反映',
    2: '反映中',
    3: '反映済',
    4: '不備有',
    5: '対象外',
};
export const REFLECTION_STATUS = [
    {
        // NOT_REFLECTED
        value: 1,
        label: '未反映',
    },
    {
        // REFLECTING
        value: 2,
        label: '反映中',
    },
    {
        // REFLECTED
        value: 3,
        label: '反映済',
    },
    {
        // ERROR
        value: 4,
        label: '不備有',
    },
    {
        // NOT_SUBJECT
        value: 5,
        label: '対象外',
    }
]
export const STATUS_APPROVE = {
    UN_APPROVED: 1,
    DOC_AWAIT_APPROVE: 2,
    DOC_APPROVED: 3,
    ES_AWAIT_APPROVE: 4,
    ES_APPROVED: 5,
};
export const STATUS_APPROVE_TITLE = {
    1: '未承認',
    2: 'DOC承認待',
    3: 'DOC承認済',
    4: 'ES承認待',
    5: 'ES承認済',
};
export const APPROVE_STATUS = [
    {
        // UN_APPROVED
        value: 1,
        label: '未承認',
    },
    {
        // DOC_AWAIT_APPROVE
        value: 2,
        label: 'DOC承認待',
    },
    {
        // DOC_APPROVED
        value: 3,
        label: 'DOC承認済',
    },
    {
        // ES_AWAIT_APPROVE
        value: 4,
        label: 'ES承認待',
    },
    {
        // ES_APPROVED
        value: 5,
        label: 'ES承認済',
    }
]
export const STATUS_PURCHASE = {
    1: [
        {
            value: 1,
            label: '申込(決済完了)',
        },
        {
            value: 2,
            label: 'レポート作成中',
        },
        {
            value: 3,
            label: 'レポート納品済',
        },
    ],
    2: [
        {
            value: 1,
            label: '送客済',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'GoldKey突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
    3: [
        {
            value: 1,
            label: '申込',
        },
        {
            value: 2,
            label: '審査中',
        },
        {
            value: 3,
            label: '日程調整',
        },
    ],
    4: [
        {
            value: 1,
            label: '送客済',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'cosoji突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
    5: [
        {
            value: 1,
            label: '申込(決済完了)',
        },
        {
            value: 2,
            label: 'レポート作成中',
        },
        {
            value: 3,
            label: 'レポート納品済',
        },
    ],
    6: [
        {
            value: 1,
            label: 'お申込',
        },
        {
            value: 2,
            label: '送客済',
        },
        {
            value: 3,
            label: '完了',
        },
    ],
    7: [
        {
            value: 1,
            label: 'お申込',
        },
        {
            value: 2,
            label: '送客済',
        },
        {
            value: 3,
            label: '完了',
        },
    ],
    8: [
        {
            value: 1,
            label: '申込完了',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'renxa突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
    9: [
        {
            value: 1,
            label: '送客済',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'enepi突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
    12: [
        {
            value: 1,
            label: '申込完了',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'redeco突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
    13: [
        {
            value: 1,
            label: '申込完了',
        },
        {
            value: 2,
            label: 'CBIT突合済',
        },
        {
            value: 3,
            label: 'momoroom突合済',
        },
        {
            value: 4,
            label: '購入済',
        },
    ],
};
export const NEW_STATUS = {
    ACTIVE: {
        value: 1,
        label: '公開',
    },
    UN_ACTIVE: {
        value: 2,
        label: '未公開',
    },
};
export const NEW_CATEGORY = [
    {
        value: 0,
        label: '通常',
    },
    {
        value: 1,
        label: 'イベント',
    },
    {
        value: 2,
        label: 'アップデート',
    },
];
export const STATUS_ENTRY_SHEET = {
    NOT_REGISTER: {
        value: 0,
        label: '未登録',
    },
    REGISTERING: {
        value: 1,
        label: '登録中',
    },
    WAITING_APPROVE: {
        value: 2,
        label: '承認待',
    },
    APPROVED: {
        value: 3,
        label: '承認済',
    },
    REJECT: {
        value: 4,
        label: '差戻し',
    },
};
