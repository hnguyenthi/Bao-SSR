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
    paging: {
        type: Object,
        default: {},
    },
    fields: {
        type: Array,
        default: [],
    },
    handleEdit: {
        type: Function,
        default: () => {},
    },
});
</script>
<template>
    <div>
        <Table isAction :fields="fields" :headers="headers" :data="data">
            <!-- <template #headerItem="{data}">{{data}}</template> -->
            <template #income="{ data }">
                <div v-for="(item, index) in data.income" :key="index + item">
                    <p class="px-5 py-2">{{ item.title }}</p>
                </div>
            </template>
            <template #price="{ data }">
                <div
                    @click="handleEdit(item)"
                    v-for="(item, index) in data.price"
                    :key="index + item"
                    class="cursor-pointer text-info-700 underline underline-offset-2"
                >
                    <p class="px-5 py-2 text-right">
                        {{ formatPrice(item) }}
                    </p>
                </div>
            </template>
            <template #action="{ data }">
                <div
                    @click="handleEdit(item)"
                    class="cursor-pointer"
                    v-for="(item, index) in data.price"
                    :key="`action + ${index + item}`"
                >
                    <div class="h-[40px] px-5 py-2">
                        <img
                            src="assets/images/paidAnalysis/icon-edit.svg"
                            alt=""
                        />
                    </div>
                </div>
            </template>
        </Table>
    </div>
</template>
