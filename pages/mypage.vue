<script setup>
import { reactive, ref } from 'vue';
import userIcon from '~/assets/images/common/user-icon.svg';
import iconEnvelope from '~/assets/images/common/icon-envelope.svg';
import keyIcon from '~/assets/images/common/key-icon.svg';
import fileIcon from '~/assets/images/common/file-icon.svg';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, helpers, minLength } from '@vuelidate/validators';
const route = useRoute();
console.log(route);
const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: 'マイページ・プラン切替',
    },
]);
const menu = ref([
    {
        title: '連絡先情報',
        icon: userIcon,
        query: 'personal-info',
    },
    {
        title: 'メールアドレス',
        icon: iconEnvelope,
        query: 'email-info',
    },
    {
        title: 'セキュリティ情報',
        icon: keyIcon,
        query: 'security-info',
    },
    {
        title: '契約内容<span class="">.</span>プラン変更',
        icon: fileIcon,
        query: 'update-info',
    },
]);
const form = reactive({
    lastName: '',
    firstName: '',
    lastKana: '',
    firstKana: '',
    phoneNumber: '',
});
const rules = {
    lastName: { required: helpers.withMessage('* 必須項目です', required) },
    firstName: { required: helpers.withMessage('* 必須項目です', required) },
    lastKana: { required: helpers.withMessage('* 必須項目です', required) },
    firstKana: { required: helpers.withMessage('* 必須項目です', required) },
    phoneNumber: {
        required: helpers.withMessage('* 必須項目です', required),
        numeric: helpers.withMessage('* 電話番号が正しくありません', numeric),
    },
};
const makeCondition = () => {
    //     switch(expression) {
    //   case x:
    //     // code block
    //     break;
    //   case y:
    //     // code block
    //     break;
    //   default:
    //     // code block
    // }
};
makeCondition();
const v$ = useVuelidate(rules, form);
const handleSubmit = () => {
    v$.value.$validate();
    if (v$.value.$error) return;
    // action submit
    console.log('submit');
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="container mx-auto rounded-md pb-[49px] pt-[37px]">
            <div class="grid grid-cols-11 gap-6">
                <div class="col-span-11 lg:col-span-3">
                    <NuxtLink
                        v-for="(item, index) in menu"
                        :key="index"
                        :to="`/mypage?form=${item.query}`"
                    >
                        <div
                            :class="{
                                'border-primary':route.query.form === item.query,
                            }"
                            class="border-b border-solid border-grey px-[22px] py-[20px]"
                        >
                            <div
                                class="flex content-center items-center justify-between"
                                :class="{
                                    'text-primary': route.query.form === item.query,
                                }"
                            >
                                <div class="flex gap-[15px]">
                                    <img :src="item.icon" alt="icon" />
                                    <p
                                        class="font-semibold"
                                        v-html="item.title"
                                    ></p>
                                </div>
                                <div>
                                    <img
                                        src="~/assets/images/common/next-icon.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div
                    v-if="route.query.form === 'personal-info'"
                    class="col-span-11 rounded-sm bg-white px-[50px] pb-[60px] pt-[33px] lg:col-span-8"
                >
                    <div class="grid grid-cols-2 gap-6">
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.lastName"
                                @focusout="
                                    () => {
                                        v$.lastName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="性"
                                :error="
                                    v$?.lastName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="名"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.lastKana"
                                @focusout="
                                    () => {
                                        v$.lastKana.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="セイ"
                                :error="
                                    v$?.lastKana?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.firstKana"
                                @focusout="
                                    () => {
                                        v$.firstKana.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="メイ"
                                :error="
                                    v$?.firstKana?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-2">
                            <TextInput
                                @focusout="
                                    () => {
                                        v$.phoneNumber.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="電話番号"
                                v-model="form.phoneNumber"
                                :error="
                                    v$?.phoneNumber?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                    </div>
                    <div class="mt-[50px] flex justify-center">
                        <PrimaryButton
                            @click="handleSubmit"
                            type="success"
                            class="!h-[52px] !w-[250px]"
                            >変更を保存する</PrimaryButton
                        >
                    </div>
                </div>
                <div
                    v-if="route.query.form === 'email-info'"
                    class="col-span-11 rounded-sm bg-white px-[50px] pb-[60px] pt-[33px] lg:col-span-8"
                >
                    <div class="grid grid-cols-1 gap-6">
                        <div class="col-span-1">
                            <TextInput
                                v-model="form.lastName"
                                @focusout="
                                    () => {
                                        v$.lastName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="新メールアドレス"
                                :error="
                                    v$?.lastName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="新メールアドレス（確認）"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                    </div>
                    <div class="mt-[50px] flex justify-center">
                        <PrimaryButton
                            @click="handleSubmit"
                            type="success"
                            class="!h-[52px] !w-[250px]"
                        >
                            送信</PrimaryButton
                        >
                    </div>
                </div>
                <div
                    v-if="route.query.form === 'security-info'"
                    class="col-span-11 rounded-sm bg-white px-[50px] pb-[60px] pt-[33px] lg:col-span-8"
                >
                    <div class="grid grid-cols-1 gap-6">
                        <div class="col-span-1">
                            <TextInput
                                v-model="form.lastName"
                                @focusout="
                                    () => {
                                        v$.lastName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="現在のパスワード"
                                :error="
                                    v$?.lastName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="新パスワード"
                                type="password"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="新パスワード（確認）"
                                type="password"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                    </div>
                    <div class="my-[50px] flex justify-center">
                        <PrimaryButton
                            @click="handleSubmit"
                            type="success"
                            class="!h-[52px] !w-[250px]"
                        >
                            送信</PrimaryButton
                        >
                    </div>
                    <div
                        class="border-b border-solid border-[#a1a1a1] pb-[10px]"
                    >
                        <RadioButton
                            questionExplanation="2段階認証の変更"
                            :options="[
                                { value: '1', label: '有効' },
                                { value: '2', label: '無効' },
                            ]"
                        />
                    </div>
                    <div class="mt-[50px] flex justify-center">
                        <PrimaryButton
                            type="success"
                            class="!h-[52px] !w-[250px]"
                        >
                            2段階認証設定を変更する</PrimaryButton
                        >
                    </div>
                </div>
                <div
                    v-if="route.query.form === 'update-info'"
                    class="col-span-11 rounded-sm bg-white px-[50px] pb-[60px] pt-[33px] lg:col-span-8"
                >
                    <div class="grid grid-cols-2 gap-6">
                        <div class="col-span-2 lg:col-span-2">
                            <TextInput
                                v-model="form.lastName"
                                @focusout="
                                    () => {
                                        v$.lastName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="ログインID"
                                :error="
                                    v$?.lastName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="棟数"
                                type="text"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <TextInput
                                v-model="form.firstName"
                                @focusout="
                                    () => {
                                        v$.firstName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="戸数"
                                type="text"
                                :error="
                                    v$?.firstName?.$errors[0]?.$message ?? ''
                                "
                            />
                        </div>
                        <div class="col-span-2 lg:col-span-2">
                            <TextInput
                                class="relative"
                                v-model="form.lastName"
                                @focusout="
                                    () => {
                                        v$.lastName.$validate();
                                    }
                                "
                                :basic="false"
                                myPage
                                label="契約プラン"
                                :error="
                                    v$?.lastName?.$errors[0]?.$message ?? ''
                                "
                            >
                                <template #label>
                                    <div>
                                        <label
                                            class="text-gray-700 mb-[5px] block flex text-h6 font-bold"
                                        >
                                            <span
                                                class="front-normal text-[12px] text-[#a1a1a1]"
                                                >契約プラン</span
                                            >
                                            <img
                                                class="pl-3"
                                                src="~/assets/images/common/ques-icon.svg"
                                                alt="icon"
                                            />
                                        </label>
                                        <Link
                                            class="absolute bottom-[10px] right-0 z-[50]"
                                            href="/calender"
                                        >
                                            <p
                                                class="text-[14px] text-primary underline"
                                            >
                                                解約する
                                            </p></Link
                                        >
                                    </div>
                                </template>
                            </TextInput>
                        </div>
                    </div>
                    <div class="mt-[50px] flex justify-center">
                        <PrimaryButton
                            type="success"
                            class="!h-[52px] !w-[250px]"
                        >
                            変更する</PrimaryButton
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>
