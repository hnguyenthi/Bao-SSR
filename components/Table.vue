<script setup>
import { formatPrice } from '~/utils';
import { ref, watch } from 'vue';

const emit = defineEmits(['update:paging']);

const props = defineProps({
    headers: {
        type: Array,
        default: [],
    },
    data: {
        type: Array,
        default: [],
    },
    footers: {
        type: Array,
        default: [],
    },
    paging: {
        type: Object,
        default: {},
    },
    isAction: {
        type: Boolean,
        default: false,
    },
    sticky: {
        type: Boolean,
        default: false,
    },
    mode: {
        type: String,
        default: '',
    },
    propertyEmpty: {
        type: String,
        default: '',
    },
    fields: {
        type: Array,
        default: [],
    },
    classes: {
        type: String,
        default: '',
    },
});
const handlePre = () => {
    if (props.paging.currentPage > 1) {
        router.get(route().current(), { page: props.paging.currentPage - 1 }, { replace: true })

    }
};
const handleNext = () => {
    if (props.paging.currentPage < props.paging.totalPage) {
        router.get(route().current(), { page: props.paging.currentPage + 1 }, { replace: true })
    }
};
const handleChangePage = (item) => {
    if (item === props.paging.currentPage) return;
    if (
        props.paging.currentPage <= props.paging.totalPage &&
        props.paging.currentPage >= 1
    ) {
        router.get(route().current(), { page: item }, { replace: true })
    }
};
const makePagingShow = (arr) => {
    return arr.filter((item) => {
        return item > 1 && item < props.paging.totalPage;
    });
};
const showPage = ref(makePagingShow([...Array(6).keys()].slice(2)));

watch(
    () => props.paging.currentPage,
    (newValue, oldValue) => {
        if (
            props.paging.currentPage > 4 &&
            props.paging.currentPage < props.paging.totalPage - 2
        ) {
            const max =
                newValue > oldValue
                    ? props.paging.currentPage + 3
                    : props.paging.currentPage + 1;
            const min =
                newValue > oldValue
                    ? props.paging.currentPage - 1
                    : props.paging.currentPage - 3;
            showPage.value = makePagingShow([...Array(max).keys()].slice(min));
        } else if (props.paging.currentPage <= 4) {
            showPage.value = makePagingShow([...Array(6).keys()].slice(2));
        } else if (props.paging.currentPage >= props.paging.totalPage - 2) {
            showPage.value = makePagingShow(
                [...Array(props.paging.totalPage).keys()].slice(
                    props.paging.totalPage - 4,
                ),
            );
        }
    },
);

watch(
    () => props.paging.totalPage,
    () => {
        showPage.value = [...Array(6).keys()].slice(2).filter((item) => {
            return item > 1 && item < props.paging.totalPage;
        });
    },
);
</script>
<template>
    <div
        class="container-table overflow-x-auto"
        :class="{ 'table-sticky': sticky }"
    >
        <table
            :class="`w-full ${classes} ${sticky ? 'table-stick' : ''} ${mode !== 'basic' ? 'border-[1px] border-solid border-grey' : ''}`"
        >
            <thead v-if="headers && headers.length > 0">
                <tr :class="{ 'h-[45px]': mode === 'basic' }">
                    <th
                        :style="`--width: ${header.width ? header.width + 'px' : 'undefined'}`"
                        :class="`${!$slots[`header-${fields[index]}`] && mode !== 'basic' ? 'header-item' : 'header-basic'} ${header?.stick ? 'column-sticky' : ''}`"
                        v-for="(header, index) in headers"
                        :key="index + header"
                    >
                        <div
                            v-if="$slots[`header-${fields[index]}`]"
                            class="card-header"
                        >
                            <slot
                                :name="`header-${fields[index]}`"
                                :data="header"
                            ></slot>
                        </div>
                        <div v-else class="text-[12px] font-normal">
                            {{ header.hidden ? '' : header.title }}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="rows"
                    :class="{ 'rows-basic': mode === 'basic' }"
                    v-for="(item, index) in data"
                    :key="`body-table-${index}-${item}`"
                >
                    <td
                        :class="`${mode !== 'basic' ? 'columns' : 'columns-basic'} ${propertyEmpty && !item[propertyEmpty] ? 'bg-[#fe2a2a1a]' : ''} ${headers[index]?.stick ? 'column-sticky' : ''}`"
                        v-for="(field, index) in fields"
                        :key="field + index"
                    >
                        <div
                            v-if="$slots[field]"
                            :class="{
                                'columns__multi-value':
                                    Array.isArray(item[field]) &&
                                    mode !== 'basic',
                            }"
                        >
                            <slot :name="field" :data="item"></slot>
                        </div>
                        <div v-else class="text-[14px]">
                            {{ item[field] }}
                        </div>
                    </td>
                    <td
                        :class="`${mode !== 'basic' ? 'columns' : 'columns-basic'}`"
                        v-if="isAction"
                    >
                        <div
                            class="columns__action"
                            :class="{
                                'columns__multi-value': mode !== 'basic',
                            }"
                        >
                            <slot name="action" :data="item"></slot>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="footers && footers.length > 0">
                <tr>
                    <td
                        :style="`--width: ${headers[index].width ? headers[index].width + 'px' : 'undefined'}`"
                        :class="`header-item ${headers[index].stick ? 'column-sticky' : ''}`"
                        v-for="(footer, index) in footers"
                        :key="`footer-${index}`"
                    >
                        {{
                            !isNaN(footer) && !!footer
                                ? formatPrice(footer)
                                : !!footer
                                  ? footer
                                  : ''
                        }}
                    </td>
                </tr>
            </tfoot>
        </table>
        <div v-if="Object.keys(paging).length !== 0 && paging.totalPage !== 0" class="pt-[50px]">
            <div>
                <div
                    class="paging flex content-center justify-center gap-x-[7px] md:gap-x-[10px]"
                >
                    <div class="paging-button" @click="handlePre">
                        <img
                            src="~/assets/images/new/prev-btn.svg"
                            alt=""
                            class="object-none"
                        />
                    </div>
                    <div
                        class="flex content-center justify-center gap-x-[7px] md:gap-x-[10px]"
                    >
                        <div
                            v-if="paging.totalPage > 0"
                            @click="handleChangePage(1)"
                            class="paging-button"
                            :class="{
                                'paging-button__active':
                                    1 == paging.currentPage,
                            }"
                        >
                            <p>1</p>
                        </div>
                        <div v-if="showPage[0] - 1 > 1" class="paging-button">
                            <p>...</p>
                        </div>
                        <div
                            @click="handleChangePage(item)"
                            class="paging-button"
                            :class="{
                                'paging-button__active':
                                    item === paging.currentPage,
                            }"
                            v-for="item in showPage"
                            :key="`paging-${item}`"
                        >
                            <p>{{ item }}</p>
                        </div>
                        <div
                            v-if="
                                showPage[showPage.length - 1] + 1 <
                                paging.totalPage
                            "
                            class="paging-button"
                        >
                            <p>...</p>
                        </div>
                        <div
                            v-if="paging.totalPage > 1"
                            @click="handleChangePage(paging.totalPage)"
                            class="paging-button"
                            :class="{
                                'paging-button__active':
                                    paging.totalPage === paging.currentPage,
                            }"
                        >
                            <p>{{ paging.totalPage }}</p>
                        </div>
                    </div>

                    <div class="paging-button" @click="handleNext">
                        <img src="~/assets/images/new/next-btn.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@use 'sass:math';
.container-table {
    width: 100%;
    // overflow: hidden;
    // overflow-x: scroll;
    display: block;
}
.table-sticky {
    overflow: hidden;
    overflow-x: scroll;
    display: block;
}
.header-item {
    background-color: theme('colors.table.100');
    height: 31px;
    width: var(--width);
    @media only screen and (max-width: 640px) {
        min-width: 100px;
        // @if var(--width) == undefined {
        //     width: 100px;
        // }
    }
    &:not(:last-child) {
        border-right: 1px solid theme('colors.white');
    }
}
.header-basic {
    text-align: left;
    padding-left: 15px;
    width: var(--width);
    div {
        text-align: left;
    }
}
.rows {
    &:not(:last-child) {
        border-bottom: 1px solid theme('colors.grey');
    }
    &:nth-child(even) {
        .columns__multi-value {
            background-color: theme('colors.table.100');
        }
    }
    &:nth-child(odd) {
        .columns__multi-value {
            background-color: theme('colors.table.200');
        }
    }
    .columns {
        text-align: center;
        color: theme('colors.dark');
        &:not(:has(.columns__multi-value)) {
            // padding: 10px 13px 10px 13px;
        }
        &:not(:last-child) {
            border-right: 1px solid theme('colors.grey');
        }
        .columns__multi-value {
            div:not(:last-child) {
                border-bottom: 1px solid theme('colors.grey');
            }
        }
        .columns__action {
            background-color: theme('colors.white');
        }
    }
    .columns-basic {
        text-align: left;
        color: theme('colors.dark');
        height: 50px;
        padding-left: 15px;
    }
    .action {
        div:not(:last-child) {
            border-bottom: 1px solid theme('colors.grey');
        }
    }
}
.rows-basic {
    border-top: 1px solid theme('colors.grey');
    &:last-child {
        border-bottom: 1px solid theme('colors.grey');
    }
}
.table-stick {
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
    tr,
    td {
        height: 40px;
    }
    .column-sticky {
        @media only screen and (min-width: 640px) {
            position: sticky;
            left: 0;
            z-index: 48;
        }

        width: var(--width);
        &:first-child {
            border-left: 1px solid theme('colors.white');
            left: 0px;
        }
        &:nth-child(2) {
            left: 100px;
        }
        &:last-child {
            border-left: 1px solid theme('colors.white');
            right: 0px;
        }
    }
    tbody {
        .column-sticky {
            text-align: center;
            background-color: theme('colors.table.300');
        }
    }
    tfoot {
        td {
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            background-color: theme('colors.table.100');
        }
    }
}
th,
td {
    div {
        width: inherit;
    }
}
.paging-button {
    width: 43px;
    height: 42px;
    border: 1px solid theme('colors.primary');
    justify-items: center;
    align-content: center;
    font-weight: bold;
    color: theme('colors.gray');
    cursor: pointer;
    @media (max-width: 768px) {
        width: 23px;
        font-size: 14px;
    }
}
.paging-button__active {
    background-color: theme('colors.primary');
    color: theme('colors.white');
}
</style>
