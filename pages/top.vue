<script setup>
// import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
// import Notification from '@/Components/tops/Notification.vue';
// import IncomeExpenditure from '@/Components/tops/IncomeExpenditure.vue';
// import Recommend from '@/Components/tops/Recommend.vue';
// import SlideTopPage from '@/Components/tops/SlideTopPage.vue';
// import Modal from '@/Components/Modal.vue';
import Swal from 'sweetalert2';
import newData from '~/assets/mockData/new.json';

import panasonic00 from '~/assets/images/top/panasonic00.png';
import mamoroom00 from '~/assets/images/top/mamoroom00.png';
import redeco00 from '~/assets/images/top/redeco00.png';
import renxa01 from '~/assets/images/top/renxa01.png';
const props = defineProps({
    news: Array,
});
const mockDataSlideServices = ref([
    {
        urlImage: panasonic00,
        category: '空室対策',
        subCategory: 'シャワー＆パウダーⅡ',
        title: 'お悩み解消！3点ユニット→　トイレ別に！',
    },
    {
        urlImage: mamoroom00,
        category: '空室対策',
        subCategory: 'まもROOM',
        title: '東京ガスの賃貸管理サポート',
    },
    {
        urlImage: redeco00,
        category: '空室対策',
        subCategory: 'Re;deco',
        title: '賃貸住宅向け超格安プチリノベーションで空室対策！',
    },
    {
        urlImage: renxa01,
        category: '不動産経営支援',
        subCategory: 'ファイナンシャルプランナー',
        title: 'ライフスタイルに合わせた保険商品のご案内をいたします。',
    },
]);

const mockDataSlideSeminar = ref([
    {
        urlImage: panasonic00,
        title: '～大家さん専門税理士が語る！～売り時を逃すな！所有物件を高く売る３つのコツ',
    },
    {
        urlImage: mamoroom00,
        title: '～大家さん専門税理士が語る！～売り時を逃すな！所有物件を高く売る３つのコツ',
    },
    {
        urlImage: redeco00,
        title: '～大家さん専門税理士が語る！～売り時を逃すな！所有物件を高く売る３つのコツ',
    },
    {
        urlImage: renxa01,
        title: '～大家さん専門税理士が語る！～売り時を逃すな！所有物件を高く売る３つのコツ',
    },
]);

const handleClickSeminar = (data) => {
    console.log('data', data);
    let options = {
        text: '外部のサイトに移動しますがよろしいですか？',
        icon: 'info',
        iconColor: '#c9dae1',
        showCancelButton: true,
        confirmButtonColor: '#7cd1f9',
        cancelButtonColor: '#7cd1f9',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            window.open(
                'https://www.o.biz-ana.com/seminar/seminar20241117movie/?info=content',
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};

const handleClickCategory = (data) => {
    console.log('data', data);
    router.visit('/category/panasonic');
};
const uploadCSV = (event) => {
    let data = new FormData();
    let file = event.target.files[0];
    data.append('file', file);
    console.log('upload', event);
    router.post('/import-news', data, {
        forceFormData: true,
    });
};
// const handleCreate = () => {
//     newData.forEach(element => {
//         let data = {
//             title: element.title,
//             contents: element.contents,
//             ac: element.ac,
//             regdate: formatDateCustom(element.regdate),
//             upddate: formatDateCustom(element.upddate),
//             startdate: formatDateCustom(element.startdate),
//             enddate: formatDateCustom(element.enddate),
//             active: element.active,
//         }
//         router.post('/news/create', data, {
//             onFinish: (page) => {
//                 console.log('finish', page);
//             },
//         });
//     });
// }
</script>

<template>
    <div class=" md:px-[20px] lg:px-[100px] md:px-[40px] xl:px-[100px]">
        <div class="grid grid-cols-10">
            <div class="col-span-10 py-[40px] 2xl:col-span-6">
                <Notification :news="newData.slice(0, 3)"/>
            </div>
            <div class="col-span-10 2xl:col-span-4 2xl:py-[40px]">
                <IncomeExpenditure />
            </div>
        </div>
        <div class="xl:flex">
            <div class="mb-[40px] mt-[20px]">
                <Recommend />
            </div>
            <div class="mt-0 w-full bg-light md:mt-[20px]">
                <div class=""></div>
                <div class="pb-[54px] pt-[38px]">
                    <SlideTopPage
                        :handleClick="handleClickCategory"
                        :data="mockDataSlideServices"
                        :url="{
                            description: '',
                            link: '',
                        }"
                        title="提携サービス"
                    />
                </div>
                <SlideTopPage
                    :handleClick="handleClickSeminar"
                    :lineTitle="4"
                    :data="mockDataSlideSeminar"
                    title="セミナー動画"
                />
            </div>
        </div>
    </div>
</template>
