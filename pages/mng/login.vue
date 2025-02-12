<script setup>
import { reactive } from 'vue';

import Swal from 'sweetalert2';
const router = useRouter();
const form = reactive({
    loginid: '',
    password: '',
});

const handleLogin = () => {
    router.push('/mng/users');
};
</script>
<template>
    <div
        class="flex items-center justify-center px-[20px] pb-[45px] pt-[130px]"
    >
        <div class="login-box">
            <div class="login-logo">
                <img src="~/assets/images/admin/bao-logo.png" alt="" />
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="!border-1 !border-solid !border-dark"></div>
                <div class="card-body login-card-body border !border-black">
                    <p class="login-box-msg text-h2 font-semibold text-dark">
                        ＜管理者専用＞
                    </p>

                    <div>
                        <AdminTextInput
                            v-model="form.loginid"
                            label="ログインID"
                            type="text"
                            />
                            <AdminTextInput
                            v-model="form.password"
                            label="パスワード"
                            type="password"
                            />
                       
                        <div class="row justify-content-center mt-[10px]">
                            <!-- /.col -->
                            <div class="col-6">
                                <button
                                    @click="handleLogin"
                                    class="btn btn-block btn-outline-primary text-[1.6em] text-[#5c9ee7]"
                                >
                                    ログイン
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </div>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>
</template>
