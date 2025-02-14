<script setup>
import { STATUS_USER, STATUS_USER_TITLE } from '~/utils/constraints.js';
import { ref, reactive } from 'vue';
import news from '~/assets/mockData/new.json';
import { formatDateYYYYMMDD } from '~/utils';
import Swal from 'sweetalert2';

const breadcrumbs = [
    { title: 'お知らせ管理', link: '/mng/news' },
];
const router = useRouter();
const dataTable = {
    headers: [
        {
            title: '#',
            field: 'id',
            sort: true,
            width: '100px',
        },
        {
            title: '公開中',
            field: 'active',
            sort: true,
            width: '120px',
        },
        {
            title: 'タイトル',
            field: 'title',
            sort: true,
            width: '400px',
        },
        {
            title: '登録日',
            field: 'regdate',
            sort: true,
            width: '130px',
        },
        {
            title: '更新日',
            field: 'upddate',
            sort: true,
            width: '130px',
        },
        {
            title: '開始日',
            field: 'startdt',
            sort: true,
            width: '120px',
        },
        {
            title: '終了日',
            field: 'enddt',
            sort: true,
            width: '145px',
        },
    ],
    data: news.slice(0, 25),
};
const handleDelete = () => {
    // 選択したお知らせを削除します。よろしいですか？
    let options = {
        title: '選択したお知らせを削除します。よろしいですか？',
        icon: 'info',
        iconColor: '#c9dae1',
        showCancelButton: true,
        confirmButtonColor: '#7cd1f9',
        cancelButtonColor: '#ccc',
        confirmButtonText: '削除',
        cancelButtonText: '取消',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};
const handleCreate = () => {
    router.push('/mng/news/init');
};
const handleRedirect = (data) => {
    router.push(`/mng/news/edit?id=${data.id}`);
};
</script>

<template>
    <div>
        <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
<h3 class="pb-[15px] text-h2 font-normal text-dark mr-3">お知らせ管理</h3>
        <div class="admin-box">
            <div class="admin-user__btns flex justify-start items-end gap-x-6">
                <button @click="handleDelete" type="button"  class="btn px-4 btn-outline-primary w-fit btn-sm">削除</button>
                <button @click="handleCreate" type="button"  class="btn px-4 btn-outline-primary w-fit btn-sm">新規登録</button>
            </div>
            <div class="admin-user__statement-list mt-[10px]">
              
                <AdminTable checkbox :headers="dataTable.headers" :data="dataTable.data">
                    <template #active="{ data }">
                        <div>{{ data.active && new Date(data.startdt).getTime() <=  Date.now() && new Date(data.enddt).getTime() >= Date.now() ? '公開中' : ''}}</div>
                    </template>
                     <template #title="{ data }">
                        <div @click="handleRedirect(data)" class="cursor-pointer">
                        <div class="text-primary hover:underline">{{data.title}}</div>

                        </div>
                    </template>
                    <template #regdate="{ data }">
                        <div>{{ formatDateYYYYMMDD(data.regdate)  }}</div>
                    </template>
                     <template #upddate="{ data }">
                        <div>{{ formatDateYYYYMMDD(data.upddate)  }}</div>
                    </template>
                     <template #startdt="{ data }">
                        <div>{{ formatDateYYYYMMDD(data.startdt)  }}</div>
                    </template>
                     <template #enddt="{ data }">
                        <div>{{ formatDateYYYYMMDD(data.enddt)  }}</div>
                    </template>
                </AdminTable>
                <!-- footer -->
                
            </div>
        </div>
        
    </div>
</template>

<style lang="scss">

</style>
