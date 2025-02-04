<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    options: {
        type: Array,
        default: [],
    },
    title: {
        type: String,
        default: '',
    },
    modelValue: {
        type: Array,
        default: [],
    },
    value: {
        type: String,
        default: 'value',
    },
    label: {
        type: String,
        default: 'label',
    },
});
const updateModel = (data) => {
    if (props.modelValue.includes(data)) {
        emit(
            'update:modelValue',
            props.modelValue.filter((v) => v !== data),
        );
    } else {
        emit('update:modelValue', [...props.modelValue, data]);
    }
};
const model = defineModel();
</script>
<template>
    <div class="select-multi w-full">
        <div class="flex items-center justify-between px-2 py-1 text-[14px]">
            <div class="cursor-pointer">
                <span v-if="modelValue.length == 0">×</span>
            </div>
            <div
                @click="
                    () => {
                        emit('update:modelValue', []);
                    }
                "
                class="cursor-pointer"
                
            >
                <span v-if="modelValue.length !== 0">×</span>
            </div>
        </div>
        <div
            class="flex h-[36px] items-center justify-start bg-[#e8e9eb] px-[6px]"
        >
            {{ title }}
        </div>
        <ul class="select-list">
            <li
                class="select-item cursor-pointer"
                :class="{
                    'active !bg-[#3276b1]': modelValue.includes(option[`${value}`]),
                }"
                @click="updateModel(option[`${value}`])"
                v-for="option in options"
                :key="option[`${value}`]"
            >
                <div
                    v-if="$slots[`item`]"
                    class="p-[6px] text-[14px] font-semibold text-dark"
                >
                    <slot name="item" :data="option"></slot>
                </div>
                <div v-else class="p-[6px] text-[14px] font-semibold text-dark">
                    {{ option[`${label}`] || option[`${value}`] }}
                </div>
            </li>
        </ul>
    </div>
    <!-- <div class="form-group">
        <label>Multiple (.select2-purple)</label>
        <div class="select2-purple">
            <select
                v-model="model"
                class="select2"
                multiple="multiple"
                data-placeholder="Select a State"
                data-dropdown-css-class="select2-purple"
                style="width: 100%"
            >
                <option v-for="(opt, index) in options" :key="index">
                    {{ opt[`${label}`] || opt[`${value}`] }}
                </option>
            </select>
        </div>
    </div> -->
</template>
<style lang="scss" scoped>
.select-multi {
    position: relative;
    flex: 1;
    margin: 1em 0.5%;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.select-item:nth-child(odd) {
    background-color: #f9f9f9;
}
.select-list {
    height: 210px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
