<script setup>
import { ref, reactive, onMounted } from 'vue';

const router = useRouter();
const info = ref({
    name: '出茂 太郎 様',
    furigana: 'デモ タロウ 様',
});

const questions = ref([]);
const service = ref();

const answers = ref([]);
const makeDate = async () => {
    service.value = JSON.parse(localStorage.getItem('service'));
    questions.value = service.value.questions;
    answers.value = JSON.parse(localStorage.getItem('answers'));
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
        title: service.value?.option_display_name,
    },
]);
const handleSubmit = () => {
    router.push(`/${service.value.option_name}EntryConfirm`);
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="申込フォーム" />
        <div class="container mx-auto rounded-md bg-white pb-[49px] pt-[37px]">
            <div class="form lg:mx-[50px]">
                <div
                    class="form-item mb-[20px] border-b border-solid border-grey pb-[30px]"
                >
                    <p class="pb-[10px] text-[14px]">お名前</p>
                    <p class="text-[16px]">{{ info.name }}</p>
                </div>
                <div
                    class="form-item mb-[20px] border-b border-solid border-grey pb-[30px]"
                >
                    <p class="pb-[10px] text-[14px]">フリガナ</p>
                    <p class="text-[16px]">{{ info.furigana }}</p>
                </div>
                <div
                    v-for="question in questions"
                    :key="question.question_id"
                    class="form-item mb-[20px] border-b border-solid border-grey pb-[30px]"
                >
                    <div>
                        <p class="pb-[10px] text-[14px]">
                            {{ question.question }}
                        </p>
                        <p
                            v-if="[0, 1, 3].includes(question.answer_type)"
                            class="text-[16px]"
                        >
                            {{
                                question.options.find(
                                    (o) =>
                                        o.answer_id ==
                                        answers[question.question_id],
                                )?.answer
                            }}
                        </p>
                        <p v-else class="text-[16px]">
                            {{ answers[question.question_id] }}
                        </p>
                    </div>
                </div>
                <div class="mb-3 mt-[50px] flex justify-center">
                    <PrimaryButton
                        @click="
                            () => {
                                router.push(`/${service.option_name}Entry`);
                            }
                        "
                        type="secondary-100"
                        classes="!w-[250px] !h-[52px] grayscale-[90%]"
                        >{{ `<< 入力画面に戻って修正する` }}</PrimaryButton
                    >
                </div>
                <div class="flex justify-center">
                    <PrimaryButton
                        @click="
                            () => {
                                router.visit(
                                    `/${push.option_name}EntryComplete`,
                                );
                            }
                        "
                        type="secondary-100"
                        classes="!w-[250px] !h-[52px]"
                        >送信</PrimaryButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>
