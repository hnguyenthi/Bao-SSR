<script setup>
import { ref } from 'vue';
import panasonic00 from '~/assets/images/premium/panasonic00.png';
import redeco00 from '~/assets/images/premium/redeco00.png';
import mamoroom00 from '~/assets/images/premium/mamoroom00.png';
import keyforbusiness00 from '~/assets/images/premium/keyforbusiness00.png';
import sisolar00 from '~/assets/images/premium/sisolar00.png';
import renxa00 from '~/assets/images/premium/renxa00.png';
import sumasate00 from '~/assets/images/premium/sumasate00.png';
import cowalking00 from '~/assets/images/premium/cowalking00.png';
import renxa01 from '~/assets/images/premium/renxa01.png';
import enepi00 from '~/assets/images/premium/enepi00.png';
import cosoji00 from '~/assets/images/premium/cosoji00.png';
import renxa02 from '~/assets/images/premium/renxa02.png';
import gamadas00 from '~/assets/images/premium/gamadas00.png';

const breadcrumbs = ref([
    {
        title: 'ホーム',
        link: 'top',
    },
    {
        title: '提携サービス',
    },
]);
const description =
    ref(`ビズアナ会員様向けに多種多様な不動産関連のサービスをご用意しております。<br>
<span class="text-secondary-100">会員限定価格</span>や<span class="text-secondary-100">会員特典</span>などもございますのでぜひご利用ください！`);
const categories = ref([
    {
        id: 'cat01',
        name: '空室対策',
        subCategories: [
            {
                option_id: 14,
                option_name: 'panasonic',
                priceMark: '￥',
                priceUnit: '~',
                default: true,
                imgUrl: panasonic00,
                description: 'お悩み解消！3点ユニット→トイレ別に！',
                title: 'シャワー＆パウダーⅡ',
                content:
                    '現地調査からユニットバス交換に関わる全ての工事を請負います！ 近年では、トイレ別の需要が高まっています。 空室改善・賃料UP実績アリ！',
                price: 660000,
                register: false
            },
            {
                option_id: 12,
                option_name: 'redeco',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: redeco00,
                description: '賃貸住宅向けプチリノベーション',
                title: '空室対策 Re;deco',
                content:
                    '超格安でオシャレなお部屋をご提供します。プロの職人による原状回復の心配がない物件のプチデコレーションで、客付け業者が提案しやすい物件に仕上げます。',
                price: 36000,
                register: true

            },
            {
                option_id: 13,
                option_name: 'mamoRoom',
                priceMark: '月額',
                priceUnit: '円（税抜き）/ 部屋',
                imgUrl: mamoroom00,
                description: '収益UP、リスク回避サービス',
                title: 'まもROOM',
                content:
                    '①高齢者孤独死対策のセンサー<br>②安心の孤独死対応補償<br>③自社物件の価値を守り、収益ＵＰを図る<br>④大手企業の東京ガスの商品',
                price: 12000,
                register: true

            },
            {
                option_id: 3,
                option_name: 'KfB',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: keyforbusiness00,
                description: 'オートロック対応の置き配システム',
                title: 'Amazon key',
                content:
                    'Amazonでお買い物をした入居者様が、便利にお荷物を受け取れる仕組みを導入できます。',
                price: 0,
                register: true

            },
            {
                option_id: 7,
                option_name: 'SIソーラー',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: sisolar00,
                description: '後付け可能な宅配ボックス',
                title: 'SISOLAR',
                content:
                    '家事や在宅ワークで集中している時や、仕事などで不在の場合でも荷物の受け取りが出来るので便利です。',
                price: 146000,
                register: true

            },
            {
                option_id: 8,
                option_name: 'Renxa',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: renxa00,
                description: 'EV充電サービス',
                title: 'Terra Charge',
                content:
                    'マンションでもお出かけ先でも、初期費用・月額無料で導入できる電気自動車のインフラです。導入や運用の手間がかからないサービスとしてご好評いただいています。',
                price: 0,
                register: true

            },
        ],
    },
    {
        id: 'cat02',
        name: '不動産経営支援',
        subCategories: [
            {
                option_id: 1,
                option_name: 'スマサテ',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: sumasate00,
                description: 'AI賃料査定レポート  統計調査レポート',
                title: 'スマサテ',
                content:
                    '所有物件の賃料設定や投資物件の購入に悩んでいませんか？賃貸経営に役立つ査定・統計レポートをご提供いたします。',
                price: 5000,
                register: true

            },
            {
                option_id: 5,
                option_name: 'Cowalking',
                priceMark: '￥',
                priceUnit: '~',
                imgUrl: cowalking00,
                description: '住み心地調査報告書　手描き地図',
                title: '周辺環境リサーチ',
                content:
                    '街歩きのプロが所有物件の周辺環境を多角的な視点でリサーチします。',
                price: 77000,
                register: true

            },
            {
                option_id: 10,
                option_name: 'RenxaLP',
                priceMark: '月額',
                priceUnit: '円（税抜き）/ 部屋',
                imgUrl: renxa01,
                description: '家計見直し',
                title: 'ファイナンシャルプランナー',
                content:
                    '現在、加入中の保険の見直しやつけたしでお悩みのお客様へ将来設計、ライフスタイルに合わせた保険商品のご案内をいたします。',
                price: 0,
                register: true

            },
        ],
    },
    {
        id: 'cat03',
        name: '経費削減',
        subCategories: [
            {
                option_id: 9,
                option_name: 'エネピ',
                priceMark: '￥',
                priceUnit: '~',
                default: true,
                imgUrl: enepi00,
                description: 'プロパンガスの見直しで物件価値向上！',
                title: 'エネピ',
                content:
                    'ガス会社を見直すだけで、給湯器など設備の格安設置やガス料金の値下げなど、物件価値＆入居者満足度の向上が行えます。 エネピでは全国の優良ガス会社の中から、ご条件ににあった会社をまとめて簡単比較いただけます。',
                price: 0,
                register: false

            },
        ],
    },
    {
        id: 'cat04',
        name: '掃除・点検・修繕',
        subCategories: [
            {
                option_id: 4,
                option_name: 'Cosoji',
                priceMark: '￥',
                priceUnit: '~',
                default: true,
                imgUrl: cosoji00,
                description: '不動産メンテナンスのアウトソーシング',
                title: 'COSOJI',
                content:
                    '日々の不動産管理のお困りごとを解決しませんか？日常清掃・草刈り・法令点検まで ”安く・品質良く・楽に” 解決します。',
                price: 'お問い合わせください',
                register: false
            },
        ],
    },
    {
        id: 'cat05',
        name: 'ライフライン',
        subCategories: [
            {
                option_id: 11,
                option_name: 'RenxaWS',
                priceMark: '￥',
                priceUnit: '~',
                default: true,
                imgUrl: renxa02,
                description: 'ウォーターサーバー',
                title: 'プレミアムウォーター',
                content: 'サーバーの料金はかからずお水代だけで利用可能',
                price: 3680,
                register: true
            },
        ],
    },
    {
        id: 'cat06',
        name: 'セキュリティ対策',
        subCategories: [
            {
                option_id: 2,
                option_name: 'Gamadas',
                priceMark: '￥',
                priceUnit: '~',
                default: true,
                imgUrl: gamadas00,
                description: 'AI顔認証サーモグラフィカメラ',
                title: 'Gamadas',
                content:
                    '顔認証AIシステム高性能サーモグラフィカメラが、感染リスクと不審者から入居者を守ります。',
                price: 'お問い合わせください',
                register: false

            },
        ],
    },
]);

const goToCategory = (category) => {
    window.scroll({
        top: document.getElementById(category.id).offsetTop - 100,
        left: 0,
        behavior: 'smooth',
    });
};
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="提携サービス" />
        <div class="container mx-auto">
            <div class=""><p class="" v-html="description"></p></div>
            <div
                class="list-categories mb-[44px] mt-[24px]"
                :class="`grid grid-cols-6 ${categories?.length} gap-4`"
            >
                <div
                    @click="goToCategory(category)"
                    v-for="category in categories"
                    :key="category.id"
                    class="col-span-6 flex h-[42px] cursor-pointer items-center justify-between rounded-full bg-white px-3 text-primary hover:opacity-70 lg:col-span-1"
                >
                    <div class="text-primary">{{ category.name }}</div>
                    <img
                        src="~/assets/images/common/d-arr.svg"
                        alt=""
                        class="object-none"
                    />
                </div>
            </div>
            <div>
                <ListCategories
                    :categories="item"
                    v-for="item in categories"
                    :key="item.id"
                />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
