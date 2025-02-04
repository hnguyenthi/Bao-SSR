<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ja } from 'date-fns/locale';
import {
    watch, ref, useTemplateRef

    
 } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    isIcon: {
        type: Boolean,
        default: true,
    },
});
const datepicker = useTemplateRef('datepicker');
const model = defineModel();
const format = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
};
watch(model, (value) => {
    emit('update:modelValue', value);
});
</script>
<template>
    <div class="date-picker-admin">
        <VueDatePicker
            class="border-none"
            v-model="model"
            :format-locale="ja"
            :format="format"
            auto-apply
            :readonly="readonly"
            ref="datepicker"
        >
            <template #action-buttons> </template>
            <template #clear-icon>
                <img
                v-if="isIcon"
                                    src="@assets/images/admin/calendar.png"
                                    width="26px"
                                    height="26px"
                                />
                 </template>
            <template #input-icon> </template>
        </VueDatePicker>
    </div>
</template>
<style lang="scss">
.date-picker-admin {
    padding: 0px !important;
    .dp__theme_light {
        --dp-background-color: #fff;
        --dp-text-color: #212121;
        --dp-hover-color: #f3f3f3;
        --dp-hover-text-color: #212121;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #1976d2;
        --dp-primary-disabled-color: #6bacea;
        --dp-primary-text-color: #f8f5f5;
        --dp-secondary-color: #c0c4cc;
        --dp-border-color: transparent;
        --dp-menu-border-color: #ddd;
        --dp-border-color-hover: transparent;
        --dp-border-color-focus: transparent;
        --dp-disabled-color: #f6f6f6;
        --dp-scroll-bar-background: #f3f3f3;
        --dp-scroll-bar-color: #959595;
        --dp-success-color: #76d275;
        --dp-success-color-disabled: #a3d9b1;
        --dp-icon-color: #959595;
        --dp-danger-color: #ff6f60;
        --dp-marker-color: #ff6f60;
        --dp-tooltip-color: #fafafa;
        --dp-disabled-color-text: #8e8e8e;
        --dp-highlight-color: rgb(25 118 210 / 10%);
        --dp-range-between-dates-background-color: var(
            --dp-hover-color,
            #f3f3f3
        );
        --dp-range-between-dates-text-color: var(
            --dp-hover-text-color,
            #212121
        );
        --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
        --dp-input-padding: 6px 10px 6px 10px;
        --dp-input-icon-padding: 10px;
        input {
            width: 130px !important
        }
    }

    input: {
        width: 50px;
    }
}
</style>
<style lang="scss"></style>
