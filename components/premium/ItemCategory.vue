<script setup>
import { formatNumber } from '~/utils';
const router = useRouter();
const props = defineProps({
    category: {
        type: Object,
        default: {},
    },
    parentCategory: {
        type: Object,
        default: {},
    },
});
const handleRegister = () => {
    localStorage.clear();
    if (props.category.option_name === 'SIソーラー') {
        router.push(`/category/${props.category.option_name}`);
    } else {
        router.push(`/${props.category.option_name}Entry`);
    }
};
</script>
<template>
    <div class="flex flex-col rounded-sm bg-white">
        <img :src="category.imgUrl" alt="" class="rounded-t-sm" />
        <div class="flex flex-1 flex-col p-[30px]">
            <div>
                <div class="w-fit bg-secondary-100 px-[10px] py-[2px]">
                    <span class="text-h5 text-white">{{
                        parentCategory.name
                    }}</span>
                </div>
                <div class="mb-[13px]">
                    <span class="text-[14px] font-medium text-primary">{{
                        category.description
                    }}</span>
                </div>
                <div class="mb-[23px]">
                    <span class="text-h4 font-semibold">
                        {{ category.title }}
                    </span>
                </div>
                <div>
                    <span class="text-[14px]">{{ category.content }}</span>
                </div>
            </div>
            <div class="mt-auto pt-[24px]">
                <div
                    class="flex flex-col content-end items-baseline justify-start md:flex-row"
                >
                    <div class="flex content-end items-baseline justify-start">
                        <span
                            class="flex h-[22px] w-[46px] items-center justify-center rounded-sm border border-solid border-secondary-100 text-secondary-100"
                            >価格</span
                        >
                        <span
                            class="ml-[7px] text-[14px] font-semibold text-secondary-100"
                            v-if="
                                category.price !== 0 && !isNaN(category.price)
                            "
                            >{{ category.priceMark }}</span
                        >
                        <span
                            class="ml-[7px] text-[16px] font-normal text-secondary-100"
                            v-if="category.price === 0"
                            >無料</span
                        >
                    </div>
                    <div class="flex content-end items-baseline justify-start">
                        <span
                            class="font-medium text-secondary-100"
                            :class="`${isNaN(category.price) ? 'pl-[5px] text-[16px]' : 'text-[36px]'}`"
                            v-if="category.price !== 0"
                        >
                            {{
                                !isNaN(category.price)
                                    ? formatNumber(category.price)
                                    : category.price
                            }}
                            <span
                                class="text-[14px]"
                                v-if="!isNaN(category.price)"
                            >
                                {{ category.priceUnit }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="pt-[22px]">
                    <div class="flex flex-col justify-center gap-4 lg:flex-row">
                        <div
                            class="flex h-[44px] w-full content-center items-center justify-center rounded-full border border-solid border-primary hover:opacity-70 lg:w-[156px]"
                        >
                            <NuxtLink :href="`/category/${category.option_name}`">
                                <p
                                    class="text-center font-semibold text-primary"
                                >
                                    詳細を見る
                                </p></NuxtLink
                            >
                        </div>
                        <div
                            v-if="category.register"
                            class="flex h-[44px] w-full content-center items-center justify-center rounded-full border border-solid border-success bg-success hover:opacity-70 lg:w-[156px]"
                        >
                            <PrimaryButton
                                @click="handleRegister"
                                type="success"
                                classes="h-[44px] w-full content-center items-center justify-center !rounded-full border border-solid border-success bg-success "
                                >申し込む</PrimaryButton
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
