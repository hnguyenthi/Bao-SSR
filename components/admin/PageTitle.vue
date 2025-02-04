<script setup>
import { ref } from 'vue';
const porps = defineProps({
    title: {
        type: String,
        required: true,
    },
    collapse: {
        type: Boolean,
        default: false,
    },
});
const show = ref(true);
</script>
<template>
    <div class="card mb-0 shadow-none">
        <div
            class="card-header flex items-center justify-start !border-b-[3px] !border-solid !border-primary p-0"
        >
            <h3 class="pb-[20px] pt-[20px] text-h2 font-normal text-dark mr-3">
                {{ title }}
            </h3>
            <button
                v-if="collapse"
                @click="show = !show"
                data-card-widget="collapse"
                class="btn btn-block btn-outline-primary btn-sm w-fit"
                type="button"
            >
               {{ show ? '非表示' : '表示' }}
            </button>
        </div>
        <div class="card-body mt-[1rem] p-0">
            <slot name="body" />
        </div>
    </div>
</template>
