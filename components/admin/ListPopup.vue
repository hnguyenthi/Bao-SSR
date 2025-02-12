<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update:show']);
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        default: false,
    },
    handleAdd: {
        type: Function,
        default: () => {},
    },
});
const hold = ref(false);
const position = ref({ x: null, y: null });
const mouseDown = (e) => {
    hold.value = true;
    const listUser = document.getElementById('list-user');
    position.value.x = e.pageX - screen.height - listUser.offsetLeft;
    position.value.y = e.pageY - screen.height - listUser.offsetTop;
};
const mouseMove = (e) => {
    if (hold.value) {
        const listUser = document.getElementById('list-user');
        listUser.style.left = e.pageX - screen.height - position.value.x + 'px';
        listUser.style.top = e.pageY - screen.height - position.value.y + 'px';
    }
};
const mouseUp = (e) => {
    hold.value = false;
};
const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
</script>
<template>
    <div>
        <div v-show="show" class="list-user" id="list-user">
            <div id="userlist">
                <div
                    @mousedown="mouseDown($event)"
                    @mousemove="mouseMove($event)"
                    @mouseup="mouseUp($event)"
                    @mouseout="
                        () => {
                            hold = false;
                        }
                    "
                    class="mb-2 cursor-pointer bg-dark py-1 text-[20px]"
                >
                    {{title}}
                </div>
                <slot />
                <div class="mt-2 flex items-center justify-between bg-dark">
                    <button
                        @click="handleAdd"
                        class="block h-[30px] cursor-pointer border-[1px] border-solid border-dark bg-white px-2 text-[16px]"
                    >
                        追加
                    </button>
                    <button
                        @click="
                            () => {
                                emit('update:show', false);
                            }
                        "
                        class="block h-[30px] cursor-pointer border-[1px] border-solid border-dark bg-white px-2 text-[16px]"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.list-user {
    z-index: 5;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: initial;
    background-color: #ddd;
    margin: 5px;
    border: 1px solid #000;
    padding: 15px 10px;
    min-width: 600px;
}
</style>