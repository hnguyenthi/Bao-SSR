<script setup>
import { reactive } from 'vue';
const form = reactive({
    username: '',
    password: '',
});

const handleReset = () => {
    console.log('reset', form.username, form.password, form);
};
const handleRedirect = () => {
    window.open("https://www.o.biz-ana.com/entry/");

}
</script>

<template>
    <div class="login flex flex-col-reverse  xl:flex-row">
        <div
            class="login__banner xl:w[620px] sm:w-100 login__background xl:h-screen relative"
        >
            <div
            @click="handleRedirect"
                class="!h-[54px] text-white border border-solid border-white flex content-center justify-center cursor-pointer border items-center !w-[240px] rounded-xxl  hover:bg-white/80 absolute left-1/2 bottom-20 -translate-x-1/2 -translate-y-1/2"
            >
                <div class="flex justify-center">
                    <span> 新規登録はこちら </span>
                    <img src="~/assets/images/common/icon-signup.svg" alt="icon-signup" class="pl-2 object-none" />
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
                    パスワード再通知
                </h1>
                <p class="leading-[40px] text-center">
                    
          登録したメールアドレスを入力してください。<br>
          
          パスワード再通知用のご案内をお送りします。
        
                </p>
                <div
                    class="w-100 h-100 mt-[17px] grid grid-cols-1 gap-y-[18px] xl:mt-[45px] xl:gap-y-[40px]"
                >
                    <div class="grid grid-cols-1 gap-y-[18px] xl:gap-y-[23px]">
                        <div>
                            <TextInput
                                label="メールアドレス"
                                type="text"
                                v-model="form.username"
                                placeholder="例）abc@cbit.co.jp"
                            ></TextInput>
                        </div>
                    </div>

                    <div>
                        <PrimaryButton
                            type="success"
                            radius="xl"
                            classes="h-[64px] rounded-xxl"
                            @click="handleReset"
                            >送信する</PrimaryButton
                        >
                    </div>
                    <NuxtLink
                        to="/"
                    >
                        <div  class="text-center font-bold text-red underline">ログイン画面に戻る</div>
                    </NuxtLink>
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
