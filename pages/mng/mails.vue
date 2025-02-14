<script setup>
import mails from '~/assets/mockData/mails.json';
const mailQueue = ref(mails.mailQueue);
const mailCompleted = ref(mails.mailCompleted);
const dataTable = {
    headers: [
        {
            title: 'NO',
            field: 'id',
            sort: true,
            width: '90px',
        },
        {
            title: 'ログインID',
            field: 'loginid',
            sort: true,
            width: '100px',
        },
        {
            title: '名前',
            field: 'name',
            sort: true,
            width: '200px',
        },
        {
            title: '送信先メールアドレス',
            field: 'mail_to',
            sort: true,
            width: '80px',
        },
        {
            title: 'メールタイトル',
            field: 'mail_subject',
            sort: true,
            width: '230px',
        },
        {
            title: 'メール本文',
            field: 'mail_body',
            sort: true,
            width: '700px',
        },
         {
            title: '登録日時',
            field: 'regdate',
            sort: true,
            width: '120px',
        },
        {
            title: 'ステータス',
            field: 'status',
            sort: true,
            width: '145px',
        },
    ],
};

</script>

<template>
    <div>
        <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
            <PageTitle title="メール一斉送信キュー" />

        <div class="admin-box">
            <!-- mail queue -->
            <div class="admin-user__statement-list">
              
                <AdminTable :data="mailQueue" :headers="dataTable.headers" >
                    <template #name="{ data }">
                        <div>{{ data.name}}</div>
                        
                    </template>
                    <template #mail_body="{ data }">
                        <div class="h-[200px] overflow-y-auto">{{ data.mail_body}}</div>
                        
                    </template>
                     <template #status="{ data }">
                        <div class="">{{ data.status === 0 ? '未処理' :data.status === 1 ? '成功' : '失敗' }}</div>
                        
                    </template>
                </AdminTable>
                
            </div>
            <!-- mail 成功 -->
            <PageTitle title="メール一斉送信 成功一覧" />
            <div class="admin-user__statement-list mx-[10px] my-[30px]">
                <AdminTable :data="mailCompleted" :headers="dataTable.headers" >
                    <template #name="{ data }">
                        <div>{{ data.name }}</div>
                    </template>
                    <template #mail_body="{ data }">
                        <div class="h-[200px] overflow-y-auto">{{ data.mail_body}}</div>
                        
                    </template>
                     <template #status="{ data }">
                        <div class="">{{ data.status === 0 ? '未処理' :data.status === 1 ? '成功' : '失敗' }}</div>
                    </template>
                </AdminTable>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss">

</style>
