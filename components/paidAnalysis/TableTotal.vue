<script setup>
import { formatPrice } from '~/utils';
const props = defineProps({
    headers: {
        type: Array,
        default: [],
    },
    data: {
        type: Array,
        default: [],
    },
    fields: {
        type: Array,
        default: [],
    },
    paging: {
        type: Object,
        default: {},
    },
});
</script>
<template>
    <div>
        <Table classes="!w-auto" :fields="fields" :headers="headers" :data="data">
            <template #income="{ data }">
                <div v-for="(item, index) in data.income" :key="index + item">
                    <p class="px-5 py-2">{{ item.title }}</p>
                </div>
            </template>
            <template #price="{ data }">
                <div class="font-semibold">
                    <p class="px-5 py-2 text-right">
                        {{ formatPrice(data.price) }}
                    </p>
                </div>
            </template>
        </Table>
    </div>
</template>
