<script setup>
const props = defineProps({
    categories: {
        type: Object,
        default: {},
    },
});
</script>
<template>
    <div :id="categories.id" class="mb-[60px]">
        <h3 class="h-[48px] bg-secondary-100 text-[20px] mb-[20px] pl-[15px] text-white font-medium flx justify-start content-center rounded-sm">{{ categories.name }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ItemCategory class="col-span-1" :parentCategory="{id: categories.id, name: categories.name}" :category="item" v-for="(item, index) in categories.subCategories" :key="`${index}-${item.title}`" />
        </div>
    </div>
</template>
