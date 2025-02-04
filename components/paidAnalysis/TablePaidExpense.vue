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
            <template #price="{ data }">
                <div
                    @click="handleEdit"
                    class="cursor-pointer text-info-700 underline underline-offset-2"
                >
                    <p class="px-5 py-2 text-right">
                        {{ formatPrice(data.price) }}
                    </p>
                </div>
            </template>
            <template #roomID="{ data }">
                <div>
                    <p class="px-5 py-2 text-center">
                        {{ data.roomID || '-' }}
                    </p>
                </div>
            </template>
            <template #action>
                <div @click="handleEdit" class="cursor-pointer">
                    <div class="h-[40px] px-5 py-2">
                        <img
                            src="~/assets/images/paidAnalysis/icon-edit.svg"
                            alt=""
                        />
                    </div>
                </div>
            </template>
        </Table>
    </div>
</template>
