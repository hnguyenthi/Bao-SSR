<script setup>
import  fetchCommon  from '~/composables/fetchCommon'

import { reactive } from 'vue';
import Swal from 'sweetalert2';
const fetch = fetchCommon()
const form = reactive({
    loginid: 'cbitdemo',
    password: 'cbit1Admin',
});

const handleLogin = () => {
    const responseData = fetch.post('api/auth-login', form).then((response) => {
        console.log(response)
        
    }).catch((error) => {
        console.log(error)
    });

    // console.log(responseData)
    // router.post('/auth-login', form, {
    //     onSuccess: ({ props }) => {
    //         const { response } = props;
    //         console.log('response', response);
    //         if (response.status === 401) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: 'ログインID または パスワードが間違っています。',
    //                 iconColor: '#c9dae1',
    //                 showCancelButton: false,
    //                 confirmButtonColor: '#7cd1f9',
    //                 confirmButtonText: 'OK',
    //                 reverseButtons: true,
    //             });
    //         }
    //     },
    // });
};
const handleRedirect = () => {
    window.open('https://www.o.biz-ana.com/entry/');
};
</script>

<template>
    <div class="login flex flex-col-reverse xl:flex-row">
        <div
            class="login__banner xl:w[620px] sm:w-100 login__background relative xl:h-screen"
        >
            <div
                @click="handleRedirect"
                class="absolute bottom-20 left-1/2 flex !h-[54px] !w-[240px] -translate-x-1/2 -translate-y-1/2 cursor-pointer content-center items-center justify-center rounded-xxl border border-solid border-white text-white hover:bg-white/80"
            >
                <div class="flex justify-center">
                    <span> 新規登録はこちら </span>
                    <!-- <img
                        src="~/assets/images/common/icon-signup.svg"
                        alt="icon-signup"
                        class="object-none pl-2"
                    /> -->
                </div>
            </div>
        </div>

        <div
            class="login__form sm:w-100 flex flex-col py-[30px] xl:h-screen xl:w-[calc(100vw-620px)] xl:py-0"
        >
            <div class="sm:w-100 xl:w-[400px]">
                <h1
                    class="text-center font-semibold text-primary sm:text-h5 xl:text-h1"
                >
                    ログイン
                </h1>
                <div
                    class="w-100 h-100 mt-[17px] grid grid-cols-1 gap-y-[18px] xl:mt-[45px] xl:gap-y-[40px]"
                >
                    <div class="grid grid-cols-1 gap-y-[18px] xl:gap-y-[23px]">
                        <div>
                            <TextInput
                                label="ログインID"
                                type="text"
                                v-model="form.loginid"
                                placeholder="ログインID"
                            ></TextInput>
                        </div>
                        <div>
                            <TextInput
                                label="パスワード"
                                type="password"
                                v-model="form.password"
                                placeholder="パスワード"
                            ></TextInput>
                        </div>
                    </div>

                    <div>
                        <PrimaryButton
                            type="success"
                            radius="xl"
                            classes="h-[64px] rounded-xxl"
                            @click="handleLogin"
                            >ログイン</PrimaryButton
                        >
                    </div>
                    <Link
                        href=""
                        class="text-center font-bold text-primary underline"
                    >
                        パスワードを忘れた方はこちら
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login {
    .login__banner {
        height: 100vh;
        // flex: 0 0 620px;
    }
    .login__form {
        // width: calc(100vw - 620px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login__background {
        background-image: url(~/assets/images/login/banner.jpg);
        background-repeat: no-repeat;
        background-position: top;
        background-size: cover;
        height: 100vh !important;
        position: relative;
        flex: 0 0 620px;
    }
}
</style>
