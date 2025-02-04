<script setup>
import { ref, watch, onMounted } from 'vue';
import newData from '~/assets/mockData/new.json';
import { CATEGORY_NEW, ITEM_PER_PAGE } from '~/utils/constraints.js';
import { formatDateYYYYMMDD } from '~/utils';

const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: 'お知らせ',
    },
]);
const tabs = ref([
    {
        value: 'All',
        title: 'すべて',
    },
    {
        value: 'event',
        title: 'イベント',
    },
    {
        value: 'information',
        title: 'アップデート情報',
    },
]);

const tabActive = ref('All');
const notifications = ref(newData);
const paging = ref({
    itemPerPage: ITEM_PER_PAGE,
    totalPage: Math.ceil(notifications.value.length / ITEM_PER_PAGE),
    currentPage: 1,
});
const table = ref({
    fields: ['startdt'],
    headers: [],
});
watch(
    () => tabActive.value,
    () => {
        const tab = CATEGORY_NEW.find((item) => item.type === tabActive.value);
        if (tab) {
            notifications.value = newData.filter(
                (item) => item.category === tab.id,
            );
        } else {
            notifications.value = newData;
        }
        paging.value.totalPage = Math.ceil(
            notifications.value.length / ITEM_PER_PAGE,
        );
        paging.value.currentPage = 1;
    },
);
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="お知らせ" />
        <div class="container mx-auto pb-[60px]">
            <div>
                <div
                    class=""
                    :class="`grid h-[44px] gap-0 lg:h-[54px] grid-cols-3`"
                >
                    <div
                        v-for="tab in tabs"
                        :key="tab.value"
                        @click="tabActive = tab.value"
                        class="container__tab col-span-1 flex cursor-pointer content-center items-center justify-center rounded-t-md text-[11px] font-semibold lg:text-h5"
                        :class="{ 'tab-active': tabActive === tab.value }"
                    >
                        <span>
                            {{ tab.title }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white px-[20px] lg:px-[50px] pb-[49px] lg:pt-[37px]">
                <div class="pt-5">
                    <Table
                        class="table-new table-new"
                        isAction
                        mode="basic"
                        v-model:paging="paging"
                        :headers="table.headers"
                        :fields="table.fields"
                        :data="
                            notifications.slice(
                                (paging.currentPage - 1) * paging.itemPerPage,
                                paging.currentPage * paging.itemPerPage,
                            )
                        "
                    >
                        <template #startdt="{ data }">
                            <div
                                class="flex flex-col content-center gap-x-5 md:flex-row"
                            >
                                <div
                                    class="flex content-center justify-start gap-x-5 pt-2 md:pt-0"
                                >
                                    <div>
                                        {{ formatDateYYYYMMDD(data.startdt) }}
                                    </div>
                                    <div
                                        class="status h-[26px] w-fit min-w-[120px]"
                                        :class="`status-${CATEGORY_NEW.find((item) => item.id === data.category)?.type}`"
                                    >
                                        <p
                                            class="text-center text-[12px] text-white"
                                        >
                                            {{
                                                CATEGORY_NEW.find(
                                                    (item) =>
                                                        item.id ===
                                                        data.category,
                                                )?.title
                                            }}
                                        </p>
                                    </div>
                                </div>
                                <NuxtLink
                                    to="/news"
                                    class="new-title__link w-full"
                                >
                                    <div class="cursor-pointer py-2 md:py-0">
                                        {{ data.title }}
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                        <!-- <template #category="{ data }">
                           
                        </template> -->
                    </Table>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.status {
    border-radius: theme('borderRadius.sm');
    display: flex;
    align-items: center;
    justify-content: center;
}
.status-information {
    background-color: #878787;
}
.status-all {
    background-color: theme('colors.primary');
}
.status-event {
    background-color: theme('colors.secondary.100');
}
</style>
<style lang="scss">
.table-new {
    table {
        overflow: hidden;
    }
    .columns-basic {
        padding-left: 0px;
    }
    td {
        @media (min-width: 768px) {
            padding-bottom: 20px;
            padding-top: 20px;
        }
    }
}
@media (min-width: 768px) {
    .new-title__link {
        position: relative;
        &::after {
            flex-shrink: 0;
            content: '';
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            margin: auto;
            width: 8px;
            height: 8px;
            border-top: solid 1px var(--theme-color);
            border-right: solid 1px var(--theme-color);
            transform: rotate(45deg);
        }
    }
}
.tab-active {
    border-top: 5px solid theme('colors.primary');
    height: 64px;
    background-color: theme('colors.white');
    color: theme('colors.primary');
   @media (max-width: 768px) {
        height: 44px;
    }
}
.container__tab:not(.tab-active) {
    height: 54px;

    margin-top: 10px;
    background-color: theme('colors.primary');
    color: theme('colors.white');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     @media (max-width: 768px) {
        height: 34px;
    }
    span {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        &::after {
            content: '';
            display: block;
            margin-top: 5px;
            width: 12px;
            height: 8px;
            background-color: #fff;
            clip-path: polygon(0 0, 100% 0, 50% 100%);
            -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
    }
}
</style>
