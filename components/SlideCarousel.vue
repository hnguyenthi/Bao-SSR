<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { computed } from 'vue';
// import { Link } from '@inertiajs/vue3';

// import image1 from '~/assets/images/top/renxa01.png';
const configDefault = {
    itemsToShow: 4,
    snapAlign: 'start',
    wrapAround: true,
    breakpointMode: 'carousel',
    breakpoints: {
        0: {
            itemsToShow: 1.5,
            snapAlign: 'start',
        },
        368: {
            itemsToShow: 1.5,
            snapAlign: 'start',
        },
        528: {
            itemsToShow: 2,
            snapAlign: 'start',
        },
        768: {
            itemsToShow: 3,
            snapAlign: 'start',
        },
        1024: {
            itemsToShow: 4,
            snapAlign: 'start',
        },
    },
};
const props = defineProps({
    config: {
        type: Object,
    },
    title: {
        type: String,
        required: false,
        default: 'text',
    },
    data: {
        type: Array,
        default: [],
    },
    url: {
        type: Object,
        default: {}
    }
});
</script>

<template>
    <div>
        <div>
            <h2 class="text-h5 md:text-h2 font-medium md:font-bold text-dark">{{ title }}</h2>
            <NuxtLink :to="url.link ?? '#'">{{url.description}}</NuxtLink>
        </div>
        <Carousel v-bind="config ?? configDefault" class="py-[20px]">
            <Slide
                v-for="(item, index) in data"
                :key="index + title"
            >
                <div class="rounded-[5px] bg-white shadow-lg">
                    <slot :data="item"></slot>
                </div>
            </Slide>
            <template #addons>
                <Navigation>test</Navigation>
            </template>
        </Carousel>
    </div>
</template>
