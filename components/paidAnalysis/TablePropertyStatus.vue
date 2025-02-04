<script setup>
import { formatPrice } from '~/utils';
const router = useRouter();
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
const handleClickRoom = (data) => {
    router.push('/paidAnalysisRoomStatus');

};
const handleClickContractor = (data) => {
    router.push('/paidAnalysisContractorStatus');
};
</script>
<template>
    <div>
        <Table
            :fields="fields"
            :headers="headers"
            :data="data"
            mode="basic"
            propertyEmpty="contractStatus"
        >
            <!-- <template #headerItem="{data}">{{data}}</template> -->
            <template #roomID="{ data }">
                <div
                    @click="handleClickRoom(data)"
                    class="lg:text[16px] cursor-pointer text-[14px] text-primary underline underline-offset-2"
                >
                    {{ data.roomID }}
                </div>
            </template>
            <template #contractName="{ data }">
                <div
                    class="lg:text[16px] text-[14px]"
                    @click="handleClickContractor(data)"
                    :class="{
                        'cursor-pointer text-primary underline underline-offset-2':
                            data?.contractName,
                    }"
                >
                    {{ data?.contractName || '-' }}
                </div>
            </template>
            <template #contractStatus="{ data }">
                <div
                    :class="`${!data.contractStatus ? 'text-red' : ''} lg:text[16px] text-[14px]`"
                >
                    {{ data.contractStatus ? '契約中' : '空室' }}
                </div>
            </template>
            <template #price="{ data }">
                <div class="">
                    <p class="lg:text[16px] text-left text-[14px]">
                        {{ formatPrice(data.price) || '-' }}
                    </p>
                </div>
            </template>
            <template #endDate="{ data }">
                <div class="lg:text[16px] text-[14px]">
                    {{ data.endDate || '-' }}
                </div>
            </template>
        </Table>
    </div>
</template>
