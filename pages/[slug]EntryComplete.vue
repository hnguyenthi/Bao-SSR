<script setup>
import { ref } from 'vue';
const router = useRouter();
const service = ref({});
const makeDate = async () => {
    service.value = JSON.parse(localStorage?.getItem('service'));
};
makeDate();
const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: '提携サービス',
        link: 'premium',
    },
    {
        title: service.value.option_display_name,
    },
]);
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage :title="`${service.option_display_name} お申込み`" />
        <div class="container mx-auto rounded-md bg-white pb-[49px] pt-[37px]">
            <div class="lg:mx-[50px]">
                <p class="text-[26px]">
                    お申込みいただきありがとうございました。
                </p>
            </div>
        </div>
        <div class="container mx-auto">
            <div class="flex justify-end">
                <PrimaryButton
                    @click="
                        () => {
                            localStorage.clear();
                            router.push(`/top`);
                        }
                    "
                    type="secondary-100"
                    classes="!w-[250px] !h-[52px]"
                    >トップに戻る</PrimaryButton
                >
            </div>
        </div>
    </div>
</template>
<style></style>
