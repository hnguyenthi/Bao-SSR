<script setup>
import { ref, watch } from 'vue';
import reportData from '~/assets/mockData/report.json';
import {
    ITEM_PER_PAGE_OPTIONS,
    ORDER_SELECT_OPTIONS,
    STATUS_CHECKING,
    ITEM_PER_PAGE,
} from '~/utils/constraints.js';
import Swal from 'sweetalert2';
const paging = ref({
    // itemPerPage: route()?.queryParams?.itemPerPage ?? ITEM_PER_PAGE,
    // orderSelect: route()?.queryParams?.sort ?? 'upldate-asc',
    // totalPage: Math.ceil(reportData.length / ITEM_PER_PAGE),
    // currentPage: route().queryParams?.page ?? 1,
    itemPerPage: ITEM_PER_PAGE,
    orderSelect: 'upldate-asc',
    totalPage: Math.ceil(reportData.length / ITEM_PER_PAGE),
    currentPage: 1,
});
const mockData = ref(reportData);
const isTooltip = ref(false);
const handleDelete = (data) => {
    let options = {
        title: '「' + data.name + '」',
        text: '削除してもよろしいですか？',
        icon: 'info',
        iconColor: '#c9dae1',
        showCancelButton: true,
        confirmButtonColor: '#7cd1f9',
        cancelButtonColor: '#efefef',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            console.log('yes');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};
watch(
    () => paging.value.itemPerPage,
    (newValue) => {
        paging.value.totalPage = Math.ceil(reportData.length / newValue);
    },
    { deep: true, immediate: true },
);
watch(
    () => paging.value.orderSelect,
    (newValue) => {
        router.visit(
            route(route().current(), [
                { ...route().queryParams, sort: newValue },
            ]),
        );
    },
    { deep: true },
);
</script>
<template>
    <div>
        <SearchInput />
        <div class="mt-[16px] flex flex-col justify-between gap-4 md:flex-row">
            <div class="flex gap-4">
                <div
                    class="flex flex-col content-center items-center lg:flex-row"
                >
                    <span class="pr-1 text-[12px]">表示件数</span>
                    <Dropdown
                        v-model="paging.itemPerPage"
                        mode="basic"
                        class="w-[59px]"
                        :options="
                            ITEM_PER_PAGE_OPTIONS.map((item) => {
                                return {
                                    value: item,
                                    label: item,
                                };
                            })
                        "
                    />
                </div>
                <div
                    class="flex flex-col content-center items-start lg:flex-row lg:items-center"
                >
                    <span class="pr-1 text-[12px]">並び替え</span>
                    <Dropdown
                        v-model="paging.orderSelect"
                        mode="basic"
                        class="w-[191px]"
                        :options="ORDER_SELECT_OPTIONS"
                    />
                </div>
            </div>
            <div>
                <Paging
                    :itemPerPage="paging.itemPerPage"
                    :totalPage="paging.totalPage"
                />
            </div>
        </div>
        <div class="report-list">
            <ul>
                <li class="grid grid-cols-9">
                    <div class="col-span-6 md:col-span-7">
                        <p class="text-left text-[12px] font-normal md:text-h6">
                            名前
                        </p>
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <div class="flex justify-between">
                            <div class="relative">
                                <div class="flex justify-center">
                                    <span
                                        class="text-[12px] font-normal md:text-h6"
                                    >
                                        ステータス
                                    </span>
                                    <img
                                        @click="isTooltip = !isTooltip"
                                        @mouseenter="isTooltip = true"
                                        @mouseleave="isTooltip = false"
                                        src="~/assets/images/common/icon-help.svg"
                                        alt=""
                                        class="cursor-pointer hover:opacity-70"
                                    />
                                </div>
                                <div
                                    v-if="isTooltip"
                                    class="absolute -right-[60px] top-[40px] z-[50] w-[calc(100vw-2rem)] rounded-md border border-solid border-[#d2d2d2] bg-white p-[30px] font-normal text-gray shadow-lg md:-right-[10px] md:w-max"
                                >
                                    <p>
                                        ステータスは、添付された収支報告書の内容確認・登録作業の進捗を表します。
                                    </p>
                                    <div class="pt-2">
                                        <div
                                            class="py-1.5"
                                            v-for="(
                                                item, index
                                            ) in STATUS_CHECKING"
                                            :key="`status-${index}`"
                                        >
                                            <div
                                                class="flex content-center items-center"
                                            >
                                                <p
                                                    :class="`flex h-[22px] w-[54px] items-center justify-center rounded-sm text-center text-[12px] text-white bg-${item.status}`"
                                                >
                                                    {{
                                                        item.status === 'notyet'
                                                            ? 'c'
                                                            : item.label
                                                    }}
                                                </p>
                                                <p class="pl-3">
                                                    {{ item.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-[12px] font-normal md:text-h6">
                                削除
                            </div>
                        </div>
                    </div>
                </li>
                <li
                    v-for="item in mockData.slice(
                        (paging.currentPage - 1) * paging.itemPerPage,
                        paging.currentPage * paging.itemPerPage,
                    )"
                    :key="item.id"
                    class="grid grid-cols-9"
                >
                    <div class="col-span-6 md:col-span-7">
                        <p
                            class="text-pretty text-left text-[12px] font-normal md:text-h6"
                        >
                            {{ item.name }}
                        </p>
                    </div>
                    <div class="col-span-3 content-center md:col-span-2">
                        <div
                            class="flex content-center items-center justify-end gap-x-[30px]"
                        >
                            <div class="flex justify-end">
                                <p
                                    :class="`flex h-[22px] w-[44px] items-center justify-center rounded-sm text-center text-[10px] text-white md:w-[54px] md:text-[12px] bg-${item.status}`"
                                >
                                    {{
                                        STATUS_CHECKING.find(
                                            (i) => i.status === item.status,
                                        )?.label
                                    }}
                                </p>
                            </div>
                            <div>
                                <div
                                    class="flex cursor-pointer justify-center"
                                    @click="handleDelete(item)"
                                >
                                    <img
                                        src="~/assets/images/common/icon-delete.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.bg-notyet {
    background-color: #52b2d6;
}
.bg-during {
    background-color: #88b524;
}
.bg-done {
    background-color: #e8a642;
}
.bg-problem {
    background-color: #e55674;
}
.bg-excluded {
    background-color: #9c9c9c;
}
.report-list {
    li {
        border-bottom: 1px solid #ccc9c9;
        padding: 14px 0px;
    }
}
</style>
