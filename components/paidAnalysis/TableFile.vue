<script setup>
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
        default: []
    },
    handleDelete: {
        type: Function,
        default: () => {},
    },
});
</script>
<template>
    <div>
        <Table mode="basic" isAction :fields="fields" :headers="headers" :data="data">
            <!-- <template #headerItem="{data}">{{data}}</template> -->
            <template #name="{ data }">
                <div
                    class="cursor-pointer  hover:opacity-70"
                >
                    <p class="datetime text-[12px]">{{data.date}}</p>
                    <p class="text-[14px] text-left text-primary">
                        {{ data.name }}
                    </p>
                </div>
            </template>
            <template #action>
                <div @click="handleEdit" class="cursor-pointer">
                    <div class="h-[40px] flex content-center">
                        <img
                            src="~/assets/images/common/icon-delete.svg"
                            alt=""
                            class="object-none"
                        />
                    </div>
                </div>
            </template>
        </Table>
    </div>
</template>