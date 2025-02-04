<script setup>
// import { Link } from '@inertiajs/vue3';
import {formatDateYYYYMMDD} from '~/utils';

const props = defineProps({
    news: Array,
});
console.log('props', props);
</script>

<template>
    <div class="top__notification">
        <div class="mb-[18px] flex justify-between px-[20px] md:px-0">
            <h2 class="text-h2 font-medium text-dark">お知らせ</h2>
            <Link href="/news-archive" class="common-link">
                <div>お知らせ一覧</div>
            </Link>
        </div>
        <div class="top__notification__list">
            <div v-for="(item, index) in news" :key="item.id + '-' + index">
                <NuxtLink 
                    :to="`/news?id=${item.id}`"
                    class="notification__item border-b-[1px] border-grey px-[20px] pb-[23px] pt-[21px] hover:cursor-pointer hover:opacity-70"
                    :class="{ 'border-t-[1px]': index === 0 }"
                >
                    <div class="md:flex md:overflow-hidden">
                        <div class="flex">
                            <p>{{ formatDateYYYYMMDD(item.regdate) }}</p>
                            <div
                                class="ml-[14px] min-w-[120px] rounded-sm text-center text-white"
                                :class="`${item.category === 1    ? 'bg-secondary-100' : 'bg-primary'}`"
                            >
                                {{
                                    item.category === 1 ? 'イベント' : '全体'
                                }}
                            </div>
                        </div>
                        <div class="md:ml-[14px] md:truncate pt-1 lg:pt-0">{{ item.title }}</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
