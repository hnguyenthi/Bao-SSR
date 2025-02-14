<script setup>
import { ref, reactive, onMounted } from 'vue';
import question from '~/assets/mockData/questions.json';
import services from '~/assets/mockData/services.json';
import { useVuelidate } from '@vuelidate/core';
const route = useRoute();
console.log(route);
const router = useRouter();
const info = ref({
    name: '出茂 太郎 様',
    furigana: 'デモ タロウ 様',
});

const questions = ref([]);
const service = ref(services.find((s) => s.option_name == route.params?.slug));
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
const form = reactive({});
const rules = {};
const sisolarLP = ref();
const makeDate = async () => {
    if (localStorage.getItem('service')) {
        service.value = JSON.parse(localStorage.getItem('service'));
        questions.value = service.value?.questions;
        Object.assign(form, JSON.parse(localStorage.getItem('answers')));
    }
    if (localStorage?.getItem('sisolarLP')) {
        sisolarLP.value = JSON.parse(localStorage.getItem('sisolarLP'));
    }
    if (questions.value?.length === 0) {
        let newData = Object.groupBy(question, ({ option_id }) => option_id);
        let result = newData[service.value.option_id]?.reduce((acc, n, i) => {
            let index = acc.findIndex(
                (a) =>
                    a.question_id === n.question_id &&
                    a.answer_type === n.answer_type,
            );
            if (index === -1) {
                acc.push({
                    question_id: n.question_id,
                    answer_type: n.answer_type,
                    question_eng: n.question_eng,
                    question: n.question,
                    question_explanation: n.question_explanation,
                    options: [{ answer_id: n.answer_id, answer: n.answer }],
                });
                form[n.question_id] = '';
                // 条件追加
                // if ([0, 1, 3].includes(n.answer_type)) {
                //     rules[n.question_id] = {
                //         requiredChoose,
                //     };
                // } else {
                //     rules[n.question_id] = {
                //         requiredJA,
                //     };
                // }

                // if (n.question_eng === 'mail') {
                //     Object.assign(rules[n.question_id], {
                //         emailJA,
                //     });
                // }
                // if (n.question_eng === 'tell') {
                //     Object.assign(rules[n.question_id], {
                //         numericJA,
                //     });
                // }
            } else {
                acc[index].options.push({
                    answer_id: n.answer_id,
                    answer: n.answer,
                });
            }
            return acc;
        }, []);
        questions.value = result;
    } else {
        questions.value.forEach((q) => {
            // rules[q.question_id] = {
            //     requiredJA,
            // };
            // if (q.question_eng === 'mail') {
            //     Object.assign(rules[q.question_id], {
            //         emailJA,
            //     });
            // }
            // if (q.question_eng === 'tell') {
            //     Object.assign(rules[q.question_id], {
            //         numericJA,
            //     });
            // }
        });
    }
};
makeDate();
const v$ = useVuelidate(rules, form);
const handleSubmit = () => {
    v$.value.$validate();
    if (v$.value.$error) return;
    localStorage.setItem(
        'service',
        JSON.stringify({
            ...service.value,
            questions: questions.value,
        }),
    );
    localStorage.setItem('answers', JSON.stringify(form));
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
                    v-if="sisolarLP"
                    class="form-item mb-[20px] border-b border-solid border-grey pb-[30px]"
                >
                    <p class="pb-[10px] text-[14px]">製品名</p>
                    <p class="text-[16px]">
                        {{
                           sisolarLP.name
                        }}
                    </p>
                </div>
                <div
                    v-for="question in questions"
                    :key="question.question_id"
                    class="form-item mb-[20px] border-b border-solid border-grey pb-[30px]"
                >
                    <!-- answer_type = 0 -->
                    <RadioButton
                        v-if="question.answer_type == 0"
                        v-model="form[question.question_id]"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        :options="question.options"
                        fieldValue="answer_id"
                        fieldLabel="answer"
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />
                    <!-- answer_type = 1 -->

                    <GroupCheckbox
                        :options="question.options"
                        fieldValue="answer_id"
                        fieldLabel="answer"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        v-model="form[question.question_id]"
                        v-if="question.answer_type == 1"
                        basic
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />
                    <!-- answer_type = 2 -->
                    <TextInput
                        @focusout="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        @change="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        v-if="question.answer_type == 2"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        v-model="form[`${question.question_id}`]"
                        basic
                        type="text"
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />

                    <!-- answer_type = 3 -->
                    <Dropdown
                        v-if="question.answer_type == 3"
                        basic
                        :options="question.options"
                        fieldValue="answer_id"
                        fieldLabel="answer"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        v-model="form[question.question_id]"
                        mode="basic"
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />

                    <!-- answer_type = 4 -->

                    <TextInput
                        @focusout="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        @change="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        v-if="question.answer_type == 4"
                        basic
                        type="number"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        v-model="form[question.question_id]"
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />
                    <!-- answer_type = 5 -->

                    <TextInput
                        @focusout="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        @change="
                            () => {
                                v$[question.question_id].$validate();
                            }
                        "
                        v-if="question.answer_type == 5"
                        basic
                        type="number"
                        :label="question.question"
                        :questionExplanation="question.question_explanation"
                        v-model="form[question.question_id]"
                        :error="
                            v$[question.question_id]?.$errors[0]?.$message ?? ''
                        "
                    />
                </div>
                <div class="mt-[50px] flex justify-center">
                    <PrimaryButton
                        @click="handleSubmit"
                        type="secondary-100"
                        classes="!w-[250px] !h-[52px]"
                        >確認</PrimaryButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>
