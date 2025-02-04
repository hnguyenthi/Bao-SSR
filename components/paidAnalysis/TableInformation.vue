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
    footers: {
        type: Array,
        default: []
    },
    paging: {
        type: Object,
        default: {},
    },
    sticky: {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <div class="w-full">
        <Table :sticky="sticky" :footers="footers" :fields="fields" :headers="headers" :data="data">
            <!-- <template #headerItem="{data}">{{data}}</template> -->
            <template v-for="(item, index) in fields" :key="index" v-slot:[`${item}`]="{ data }">
                <div class="text-[14px] text-gray" :class="`${index === fields.length - 1 ?'font-bold' : ''}`">
                    {{ !isNaN(data[item]) ? formatPrice(data[item]) : data[item]}}
                </div>
            </template>
        </Table>
    </div>
</template>
