<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: '検索',
    },
    classes: {
        type: String,
        default: '',
    },
});
const model = defineModel();
const input = ref(null);
const currentType = ref(props.type);
onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
<div>
    <div class="relative py-[20px] bg-[#efefef] px-[20px]">
        <img class="absolute top-1/2 -translate-y-1/2 left-[35px]" src="~/assets/images/common/icon-search.svg" alt="icon-search">
        <input
            :placeholder="placeholder ?? ''"
            class="h-[44px] border-none pl-[44px] pr-[15px] w-full rounded-sm border-1 border-transparent focus:border-border-transparent focus-visible:border-border-transparent"
            :class="classes"
            v-model="model"
            type="text"
            ref="input"
        />
    </div>
</div>
    
</template>
<style lang="scss" scoped></style>
