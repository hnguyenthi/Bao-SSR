<script setup>
const props = defineProps({
    dataItem: {
        type: Object,
        default: {},
    },
    lineTitle: {
        type: Number,
        default: 2,
    },
    isModal: {
        type: Boolean,
        default: false,
    },
});

</script>
<template>
    <div class="cursor-pointer">
        <img
            :src="dataItem.urlImage"
            alt=""
            class="rounded-[5px] object-fill"
        />
        <div class="px-[18px] py-[20px]">
            <div v-if="dataItem?.category" class="w-fit bg-secondary-100">
                <div class="inline-block px-[6px] py-[4px] text-white">
                    {{ dataItem.category }}
                </div>
            </div>
            <p
                v-if="dataItem.subCategory"
                class="mb-[7px] text-left text-[14px] text-secondary-100"
            >
                {{ dataItem.subCategory }}
            </p>
            <p
                class="text-left font-medium text-dark"
                :style="`--lines-to-show:${lineTitle}; --line-height:24px`"
                :class="`text-line`"
            >
                {{ dataItem.title }}
            </p>
        </div>
       
    </div>
</template>
