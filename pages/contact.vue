<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';

const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: 'お問い合わせ',
    },
]);
const optionsCheckBox = ref([
    {
        value: '資料請求をしたい',
        label: '資料請求をしたい'
    },
    {
        value: '料金を知りたい',
        label: '料金を知りたい'
    },
    {
        value: '話を聞いてみたい',
        label: '話を聞いてみたい'
    }
])
const form = reactive({
    message: '',
    items: []
})
const rules = {
    message: { required: helpers.withMessage('* 必須項目です', required) },
};
const v$ = useVuelidate(rules, form);
const handleFocusout = () => {
    v$.value.$validate();
};
const handleContact = () => {
    if (!form.message.value) return;
    let result = true;
    if (result) {
        let options = {
            text: '外部のサイトに移動しますがよろしいですか？',
            icon: 'info',
            iconColor: '#c9dae1',
            showCancelButton: false,
            confirmButtonColor: '#7cd1f9',
            confirmButtonText: 'TOPへ',
        };
        Swal.fire(options).then((result) => {
            if (result.isConfirmed) {
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    }
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="お問い合わせ" />
        <div class="container mx-auto">
            <div class="bg-white p-[30px] lg:px-[160px] lg:py-[70px]">
                <div class="mb-[40px]">
                    <div class="mb-[16px] text-[18px] font-medium">
                        お問い合わせ種類
                    </div>
                    <GroupCheckbox v-model="form.items" :options="optionsCheckBox" />
                </div>
                <div class="">
                    <div class="mb-[16px] text-[18px] font-medium">
                        お問い合わせ内容
                    </div>
                    <Textarea
                        @focusout="handleFocusout"
                        @change="handleFocusout"
                        v-model="form.message"
                        classes="rounded-sm !border-2 border-info-200 focus:border-info-300 focus-visible:border-info-300"
                        rows="10"
                        :error="v$?.message?.$errors[0]?.$message ?? ''"
                        placeholder="お問い合わせの内容をご入力ください。"
                    />
                    <div class="mt-[38px] flex justify-center">
                        <PrimaryButton
                            type="success"
                            classes="h-[52px] !w-[250px] rounded-sm"
                            @click="handleContact"
                            >送信</PrimaryButton
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
