<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'add',
    },
});
</script>
<template>
    <button class="">
        <div
            class="button-secondary flex w-full"
            :class="`${type === 'add' ? 'button-add' : type === 'refresh' ? 'button-refresh' : ''}`"
        >
            <img
                v-if="type === 'refresh'"
                class="mr-[5px]"
                src="~/assets/images/common/icon-refresh.svg"
                alt="refresh"
            />
            <slot />
        </div>
    </button>
</template>
<style lang="scss" scoped>
.button-add {
    &::before {
        content: '＋';
        display: block;
        margin-right: 5px;
        font-weight: 900;
        color: theme('colors.primary');
    }
}
.button-secondary {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: 0;
    width: 100px;
    height: 30px;
    font-family: 'Noto Sans JP';
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.05em;
    text-align: center;
    color: #000;
    border-radius: 3px;
    background: linear-gradient(#fff 0%, #fff 32.64%, #e3e2e2 100%);
    border: 1px solid #ccc;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
}
</style>
