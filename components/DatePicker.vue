<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ja } from 'date-fns/locale';
import CalendarMonth from 'vue-material-design-icons/CalendarMonth.vue';

const model = defineModel();
const props = defineProps({
    type: {
        type: String,
        default: 'month-picker',
    },
});
const format = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (props.type === 'month-picker') return `${year}年 ${month}月`;
    if (props.type === 'year-picker') return `${year}年`;
};
const handlePre = () => {
    if (props.type === 'month-picker') {
        if (model.value.month === 0) {
            model.value.month = 11;
            model.value.year -= 1;
        } else {
            model.value.month -= 1;
        }
    } else if (props.type === 'year-picker') {
        model.value -= 1;
    }
};
const handleNext = () => {
    if (props.type === 'month-picker') {
        if (model.value.month === 11) {
            model.value.month = 0;
            model.value.year += 1;
        } else {
            model.value.month += 1;
        }
    } else if (props.type === 'year-picker') {
        model.value += 1;
    }
};
</script>
<template>
    <div class="datepicker flex text-primary">
        <div @click="handlePre" class="datepicker-btn datepicker-btn-pre"></div>
        <div class="">
            <VueDatePicker
                class=""
                v-model="model"
                :month-picker="type === 'month-picker' ? true : false"
                :year-picker="type === 'year-picker' ? true : false"
                :format-locale="ja"
                :format="format"
                auto-apply
            >
                <template #action-buttons> </template>
                <template #clear-icon> </template>
                <template #input-icon>
                    <CalendarMonth v-if="type === 'month-picker'" />
                </template>
            </VueDatePicker>
        </div>
        <div
            @click="handleNext"
            class="datepicker-btn datepicker-btn-next"
        ></div>
    </div>
</template>
<style lang="scss">
.user-layout {
    .material-design-icon {
        font-size: 28px;
        color: theme('colors.primary');
    }
    .datepicker-btn {
        position: relative;
        display: flex;
        align-content: center;
        align-items: center;
        &::before {
            content: '';
            display: block;
            width: 13px;
            height: 13px;
            border-top: solid 3px theme('colors.primary');
            border-right: solid 3px theme('colors.primary');
        }
    }
    .datepicker-btn-pre::before {
        transform: rotate(-135deg);
    }
    .datepicker-btn-next::before {
        transform: rotate(45deg);
    }
    .dp__input_icon_pad {
        padding-inline-start: inherit;
    }
    .dp__main,
    .dp__input_wrap {
        // width: 100%;
        input {
            outline: none;
            box-shadow: none;
            border: none;
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            &:focus {
                border: none;
                outline: none;
                box-shadow: none;
            }
            &:focus-visible {
                border: none;
                outline: none;
                box-shadow: none;
            }
        }
        .dp__input_icon {
            font-size: 28px;
            color: theme('colors.primary');
            left: 161px;
        }
    }
    .dp__input {
        &:focus {
            border: none;
        }
        &:focus-visible {
            border: none;
        }
    }
}
</style>
<style lang="scss"></style>
