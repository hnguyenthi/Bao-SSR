<script setup>
import { ref, useTemplateRef } from 'vue';
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
const imageUrl = ref('');

const input = useTemplateRef('input');
function previewImage(event) {
    const file = event.target.files[0];
    imageUrl.value = URL.createObjectURL(file);
    //post upload image return url
    emit('update:modelValue', imageUrl.value)
}
const handleUpload = () => {
    input.value.click();
};
</script>
<template>
    <div>
        <input
            type="file"
            accept="image/*"
            ref="input"
            class="upload-input hidden"
            @change="
                (event) => {
                    previewImage(event);
                }
            "
        />
        <div class="relative" @click="handleUpload()">
            <div>
                <img
                    v-if="!imageUrl"
                    src="~/assets/images/common/noimage-icon.svg"
                    alt="noimage-icon"
                    class="object-cover"
                />
                <img
                    v-else
                    :src="imageUrl"
                    alt="image-upload"
                    class="h-[68px] w-[68px] object-none"
                />
            </div>
            <div
                class="absolute -bottom-1 -right-3 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:opacity-70"
            >
                <img
                    src="~/assets/images/common/icon-img-upload.svg"
                    alt="icon-img-upload"
                />
            </div>
        </div>
    </div>
</template>
