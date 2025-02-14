<script setup>
import { formatNumber } from '~/utils';
import { ref } from 'vue';
import services from '~/assets/mockData/services.json';
import sisolar01 from '~/assets/images/category/sisolar01.jpg';
import sisolar02 from '~/assets/images/category/sisolar02.jpg';

import sisolar03 from '~/assets/images/category/sisolar03.png';

import sisolar04 from '~/assets/images/category/sisolar04.jpg';

import sisolar05 from '~/assets/images/category/sisolar05.jpg';
const router = useRouter();
const route = useRoute();
console.log(route);
const service = ref(services.find((s) => s.option_name == route?.params?.slug));

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
const mockData = ref({
    priceMark: '￥',
    priceUnit: '~',
    default: true,
    description: 'お悩み解消！3点ユニット→トイレ別に！',
    title: 'シャワー＆パウダーⅡ',
    content:
        '現地調査からユニットバス交換に関わる全ての工事を請負います！ 近年では、トイレ別の需要が高まっています。 空室改善・賃料UP実績アリ！',
    price: 660000,
});
const sumary = ref([
    `３点ユニットバス物件の<span class="text-[#EB77A1]">お悩み解決</span>をします`,
    `<span  class="text-[#EB77A1]">築古の狭いお部屋でも</span>「トイレ別」を実現できます`,
    `<span  class="text-[#EB77A1]">メーカーの責任施工</span>でお届けします`,
]);
const handleContact = () => {
    // router.push('/contact');
};
const mocDataSola = ref([
    {
        image: sisolar01,
        price: '146,000円（税込）',
        name: 'プチ宅unit（アナログキー）',
        description:
            '自立設置が可能な防水仕様の宅配ボックスです。省スペースで設置が出来ます。<br>電気工事・ランニングコスト不要のアナログキータイプです。<br>色とボックスのサイズ・個数、幅木の高さを選べます。',
    },
    {
        image: sisolar02,
        price: 'オープン価格',
        name: 'プチ宅unit（デジタルキー）',
        description:
            '自立設置が可能な防水仕様の宅配ボックスです。<br>電気工事・ランニングコスト不要のアナログキータイプです。<br>色とボックスのサイズ・個数を選べます。',
    },
    {
        image: sisolar03,
        price: '340,000（税込）',
        name: 'STANDARD（アナログキー）',
        description:
            '自立設置が可能な防水仕様の宅配ボックスです。<br>電気工事不要のデジタルキータイプの電子錠前。<br>暗証番号、ICカード、スマートフォンアプリ連携で開錠も可能です。',
    },
    {
        image: sisolar04,
        price: 'オープン価格',
        name: 'STANDARD（スマートキー）',
        description:
            '自立設置が可能な防水仕様の宅配ボックスです。<br>電源が必要です。ネットワーク型とランニングコストを<br>抑えた自主管理を行いたい方には非ネットワーク型もご用意しています。',
    },
    {
        image: sisolar05,
        price: 'オープン価格',
        name: 'ポストD-ALL+プチ宅（アナログキー）',
        description:
            'ポストに合わせたサイズで宅配ボックスのボックスサイズ、<br>個数を自由に組み合わせられます。<br>ポストは屋内仕様の他、防滴仕様のご用意があります。',
    },
]);
const handleRegister = (data) => {
    localStorage.clear();
    localStorage.setItem('sisolarLP', JSON.stringify(data));
    // router.visit(`/${service.value.option_name}Entry`);
}
</script>
<template>
    <div class="bg-light pb-[40px]">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <TitlePage title="提携サービス" />
        <div class="container mx-auto rounded-md bg-white">
            <div
                class="py-[20px] lg:px-[160px] lg:pb-[78px] lg:pt-[40px]"
                v-if="service?.option_name === 'panasonic'"
            >
                <img
                    src="~/assets/images/category/panasonic00.png"
                    alt="thumnail"
                    class="mb-[26px]"
                />
                <div>
                    <p class="description text-[14px] text-primary">
                        {{ mockData.description }}
                    </p>
                    <h1 class="mb-[37px] mt-[20px] text-[32px] font-semibold">
                        {{ mockData.title }}
                    </h1>
                </div>
                <div
                    class="flex flex-col items-center justify-between md:flex-row lg:flex-row"
                >
                    <div class="flex content-end items-baseline justify-start">
                        <div
                            class="flex content-end items-baseline justify-start"
                        >
                            <span
                                class="flex h-[22px] w-[46px] items-center justify-center rounded-sm border border-solid border-secondary-100 text-secondary-100"
                                >価格</span
                            >
                            <span
                                class="ml-[7px] text-[14px] font-semibold text-secondary-100"
                                v-if="
                                    mockData.price !== 0 &&
                                    !isNaN(mockData.price)
                                "
                                >{{ mockData.priceMark }}</span
                            >
                            <span
                                class="ml-[7px] text-[16px] font-normal text-secondary-100"
                                v-if="mockData.price === 0"
                                >無料</span
                            >
                        </div>
                        <div
                            class="flex content-end items-baseline justify-start"
                        >
                            <span
                                class="font-medium text-secondary-100"
                                :class="`${isNaN(mockData.price) ? 'pl-[5px] text-[16px]' : 'text-[42px]'}`"
                                v-if="mockData.price !== 0"
                            >
                                {{
                                    !isNaN(mockData.price)
                                        ? formatNumber(mockData.price)
                                        : mockData.price
                                }}
                                <span
                                    class="text-[14px]"
                                    v-if="!isNaN(mockData.price)"
                                >
                                    {{ mockData.priceUnit }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            @click="handleContact"
                            classes="mt-[30px] md:mt-0 bg-transparent !w-[260px] border-2 border-solid border-primary !rounded-full"
                        >
                            <div class="flex content-center justify-center">
                                <img
                                    src="~/assets/images/category/mail-icon.svg"
                                    alt="mail-icon"
                                    class="h-[32px] object-cover"
                                />
                                <span class="pl-3 text-h5 text-primary"
                                    >お問合せ・ご相談</span
                                >
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
                <div class="sumary mb-[53px] mt-[27px]">
                    <div class="bg-secondary-400 p-[40px]">
                        <div
                            v-for="(item, index) in sumary"
                            :key="index"
                            :class="{ 'mb-[18px]': index < sumary.length - 1 }"
                            class="flex content-center justify-start gap-x-[7px]"
                        >
                            <img
                                src="~/assets/images/category/check-icon.svg"
                                alt="check-icon"
                            />
                            <p
                                class="text-[20px] font-semibold"
                                v-html="item"
                            ></p>
                        </div>
                    </div>
                </div>
                <div class="sumary-main">
                    <div>
                        <Title
                            title="SHOWER＆POWDERⅡに入替えるメリットとは？"
                        />
                        <div class="mt-[20px]">
                            <img
                                src="~/assets/images/category/画像①.png"
                                alt=""
                            />
                            <img
                                src="~/assets/images/category/画像②.png"
                                alt=""
                            />
                            <div class="content mb-[39px] mt-[32px]">
                                <p class="mt-[17px] text-[20px] font-semibold">
                                    ■オーナー様のお悩み事例
                                </p>
                                <p class="mt-[17px] text-[17px] leading-[32px]">
                                    ・３点ユニットバスだから、賃料を下げざるを得ない<br />
                                    ・入居者の属性は諦めている<br />
                                    ・高額・工期が長いという理由で入れ替えを諦めていた<br />
                                </p>
                            </div>
                            <div class="content mb-[39px] mt-[32px]">
                                <p class="mt-[17px] text-[20px] font-semibold">
                                    ■「シャワー＆パウダー」でお悩み解決できたというお声をいただいております
                                </p>
                                <p class="mt-[17px] text-[17px] leading-[32px]">
                                    ・賃料低下に歯止め、むしろ賃料をあげられた！<br />
                                    ・写真映えもして問合せ数が増えた！<br />
                                    ・
                                    「シャワー＆パウダー」に入れ替えた結果、希望していた女性入居者からの申し込みがありました！<br />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Title title="SHWER＆PoWDERⅡ　商品特徴" />
                        <div>
                            <img
                                src="~/assets/images/category/画像③.png"
                                alt=""
                                class="mb-[39px]"
                            />
                            <img
                                src="~/assets/images/category/画像④.png"
                                alt=""
                            />
                            <div class="mb-[39px] mt-[32px]">
                                <p
                                    class="mt-[17px] text-center text-h4 font-semibold leading-[32px] text-secondary-100"
                                >
                                    単純入替えなら、解体から仕上げまで最短２日で工事が完了します！
                                </p>
                            </div>
                            <img
                                src="~/assets/images/category/画像⑥.png"
                                alt=""
                                class="mb-[39px]"
                            />
                            <img
                                src="~/assets/images/category/画像⑨.png"
                                alt=""
                                class="mb-[39px]"
                            />
                            <div class="mb-[39px] mt-[32px] text-center">
                                <PrimaryButton
                                    @click="handleContact"
                                    classes="mt-[30px] md:mt-0 bg-transparent !w-[260px] border-2 border-solid border-primary !rounded-full"
                                >
                                    <div
                                        class="flex content-center justify-center"
                                    >
                                        <img
                                            src="~/assets/images/category/mail-icon.svg"
                                            alt="mail-icon"
                                            class="h-[32px] object-cover"
                                        />
                                        <span class="pl-3 text-h5 text-primary"
                                            >お問合せ・ご相談</span
                                        >
                                    </div>
                                </PrimaryButton>
                            </div>
                            <div class="mb-[39px]">
                                <Title
                                    title="アクセントパネル　カラーバリエーション"
                                />
                                <div>
                                    <img
                                        src="~/assets/images/category/画像⑪.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div class="mb-[70px] lg:mb-[85px]">
                                <Title title="SHOWER＆POWDERⅡ商品紹介動画" />
                                <div class="pt-[32px]">
                                    <iframe
                                        class="h-[240px] w-full lg:h-[500px] lg:w-[880px]"
                                        src="https://www.youtube.com/embed/fzdw_Czq8Zw"
                                        title="シャワー&amp;パウダーⅡのご紹介 | Panasonic"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen=""
                                    ></iframe>
                                    <div
                                        class="mb-[39px] mt-[32px] text-center"
                                    >
                                        <a
                                            class="text-[22px] font-semibold tracking-[0.05rem] text-[#0563C1] underline decoration-2"
                                            href="https://www.youtube.com/embed/fzdw_Czq8Zw"
                                            target="_blank"
                                        >
                                            シャワー&パウダーⅡのご紹介 |
                                            Panasonic (youtube.com)
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-[39px]">
                                <Title title="ビズアナオーナー限定プラン" />
                                <div class="pt-[32px]">
                                    <img
                                        src="~/assets/images/category/画像⑫.png"
                                        alt=""
                                    />
                                    <div
                                        class="mb-[39px] mt-[32px] text-center"
                                    >
                                        <PrimaryButton
                                            classes="mt-[30px] md:mt-0 bg-primary !w-[260px] border-2 border-solid border-primary !rounded-full"
                                        >
                                            <div
                                                class="flex content-center justify-center"
                                            >
                                                <img
                                                    src="~/assets/images/category/download-icon.svg"
                                                    alt="download-icon"
                                                    class="h-[32px] object-none"
                                                />
                                                <span
                                                    class="pl-1 text-h5 font-normal text-white"
                                                    >チラシダウンロード</span
                                                >
                                            </div>
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-[39px]">
                                <Title title="実際の流れ" />
                                <div class="pt-[32px]">
                                    <p>
                                        現地調査からすべての工事をメーカーが特別に直接請負っています。<br />
                                        安心の品質をご提供します。
                                    </p>
                                    <img
                                        src="~/assets/images/category/画像⑬.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div class="mb-[39px]">
                                <Title title="展示室ご案内" />
                                <div
                                    class="grid grid-cols-10 gap-x-4 pt-[32px]"
                                >
                                    <div class="col-span-10 md:col-span-6">
                                        <img
                                            src="~/assets/images/category/画像⑭.png"
                                            alt=""
                                            class="w-full"
                                        />
                                    </div>
                                    <div
                                        class="col-span-10 p-[20px] md:col-span-4"
                                    >
                                        <p
                                            class="text-center text-[26px] font-normal"
                                        >
                                            【AWE-LAB】
                                        </p>
                                        <p class="text-[20px] font-normal">
                                            <br />
                                            ◆アクセス<br />
                                            東京都中央区銀座8丁目21－1　<br />
                                            住友不動産汐留浜離宮ビル21階<br />
                                            ※駐車場はございません。<br />
                                            ご了承くださいませ。
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="grid grid-cols-10 gap-x-4 pt-[32px]"
                                >
                                    <div class="col-span-10 md:col-span-6">
                                        <div class="px-[20px] py-[50px]">
                                            <p
                                                class="text-center text-[20px] font-normal text-[#EC347A] lg:text-right"
                                            >
                                                ＼バーチャルでもショールームを見学できます！／
                                            </p>
                                            <div class="mt-[17px]">
                                                <a
                                                    href="https://my.matterport.com/show/?m=2Ry6dLSrG6x"
                                                    class="text-center text-[22px] font-normal text-[#0563C1] underline decoration-2 lg:text-right"
                                                >
                                                    <p>
                                                        バーチャルショールーム
                                                        (matterport.com)
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-10 md:col-span-4">
                                        <img
                                            src="~/assets/images/category/画像⑮.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-[39px]">
                                <img
                                    src="~/assets/images/category/画像⑯.png"
                                    alt=""
                                />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center"
                            >
                                <div class="mb-[30px] mt-[32px]">
                                    <PrimaryButton
                                        @click="handleContact"
                                        classes="mt-[30px] md:mt-0 bg-transparent !w-[260px] border-2 border-solid border-primary !rounded-full"
                                    >
                                        <div
                                            class="flex content-center justify-center"
                                        >
                                            <img
                                                src="~/assets/images/category/mail-icon.svg"
                                                alt="mail-icon"
                                                class="h-[32px] object-cover"
                                            />
                                            <span
                                                class="pl-3 text-h5 text-primary"
                                                >お問合せ・ご相談</span
                                            >
                                        </div>
                                    </PrimaryButton>
                                </div>

                                <PrimaryButton
                                    classes="mt-[30px] md:mt-0 bg-transparent h-[42px] !w-[140px] border-1 border-solid border-primary !rounded-full"
                                >
                                    <div class="">
                                        <span
                                            class="pl-3 text-[14px] text-primary"
                                            >一覧に戻る</span
                                        >
                                    </div>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="py-[20px] lg:px-[160px] lg:pb-[78px] lg:pt-[40px]"
                v-if="service?.option_name === 'SIソーラー'"
            >
                <img
                    src="~/assets/images/category/sisolar00.png"
                    alt="thumnail"
                    class="mb-[26px]"
                />
                <div>
                    <p class="description text-[14px] text-primary">
                        {{ mockData.description }}
                    </p>
                    <h1 class="mb-[37px] mt-[20px] text-[32px] font-semibold">
                        {{ mockData.title }}
                    </h1>
                </div>
                <div
                    class="flex flex-col items-center justify-between md:flex-row lg:flex-row"
                >
                    <div class="flex content-end items-baseline justify-start">
                        <div
                            class="flex content-end items-baseline justify-start"
                        >
                            <span
                                class="flex h-[22px] w-[46px] items-center justify-center rounded-sm border border-solid border-secondary-100 text-secondary-100"
                                >価格</span
                            >
                            <span
                                class="ml-[7px] text-[14px] font-semibold text-secondary-100"
                                v-if="
                                    mockData.price !== 0 &&
                                    !isNaN(mockData.price)
                                "
                                >{{ mockData.priceMark }}</span
                            >
                            <span
                                class="ml-[7px] text-[16px] font-normal text-secondary-100"
                                v-if="mockData.price === 0"
                                >無料</span
                            >
                        </div>
                        <div
                            class="flex content-end items-baseline justify-start"
                        >
                            <span
                                class="font-medium text-secondary-100"
                                :class="`${isNaN(mockData.price) ? 'pl-[5px] text-[16px]' : 'text-[42px]'}`"
                                v-if="mockData.price !== 0"
                            >
                                {{
                                    !isNaN(mockData.price)
                                        ? formatNumber(mockData.price)
                                        : mockData.price
                                }}
                                <span
                                    class="text-[14px]"
                                    v-if="!isNaN(mockData.price)"
                                >
                                    {{ mockData.priceUnit }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            @click="handleContact"
                            classes="mt-[30px] md:mt-0 bg-transparent !w-[260px] border-2 border-solid border-primary !rounded-full"
                        >
                            <div class="flex content-center justify-center">
                                <img
                                    src="~/assets/images/category/mail-icon.svg"
                                    alt="mail-icon"
                                    class="h-[32px] object-cover"
                                />
                                <span class="pl-3 text-h5 text-primary"
                                    >お問合せ・ご相談</span
                                >
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
                <!-- <div class="sumary mb-[53px] mt-[27px]">
                    <div class="bg-secondary-400 p-[40px]">
                        <div
                            v-for="(item, index) in sumary"
                            :key="index"
                            :class="{ 'mb-[18px]': index < sumary.length - 1 }"
                            class="flex content-center justify-start gap-x-[7px]"
                        >
                            <img
                                src="~/assets/images/category/check-icon.svg"
                                alt="check-icon"
                            />
                            <p
                                class="text-[20px] font-semibold"
                                v-html="item"
                            ></p>
                        </div>
                    </div>
                </div> -->
                <div class="sumary-main mt-[40px]">
                    <div>
                        <Title title="サンプル" />
                        <div class="mt-[29px]">
                            <div class="mx-10 grid grid-cols-2 gap-y-8 gap-x-10">
                                <div
                                    v-for="(item, index) in mocDataSola"
                                    :key="item.name + index"
                                >
                                    <img :src="item.image" alt="" />
                                    <div class="pl-12">
                                        <p class="text-left">
                                            <span>
                                                <strong>製品名：</strong
                                                >{{ item.name }}
                                            </span>
                                        </p>
                                        <p class="text-left">
                                            <span>
                                                <strong>価格：</strong
                                                >{{ item.price }}
                                            </span>
                                        </p>
                                    </div>
                                    <p v-html="item.description" class="mt-[20px]"></p>
                                    <div class="mt-[30px]">
                                        <PrimaryButton
                                        @click="handleRegister(item)"
                                            type="success"
                                            classes="!h-[56px] !w-[300px] w-full content-center items-center justify-center !rounded-full border border-solid border-success bg-success "
                                            >申し込む</PrimaryButton
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="mb-[39px] mt-[32px] text-center">
                                <PrimaryButton
                                    @click="handleContact"
                                    classes="mt-[30px] md:mt-0 bg-transparent !w-[260px] border-2 border-solid border-primary !rounded-full"
                                >
                                    <div
                                        class="flex content-center justify-center"
                                    >
                                        <img
                                            src="~/assets/images/category/mail-icon.svg"
                                            alt="mail-icon"
                                            class="h-[32px] object-cover"
                                        />
                                        <span class="pl-3 text-h5 text-primary"
                                            >お問合せ・ご相談</span
                                        >
                                    </div>
                                </PrimaryButton>
                            </div>

                            <div
                                class="flex flex-col items-center justify-center"
                            >
                                <PrimaryButton
                                    classes="mt-[30px] md:mt-0 bg-transparent h-[42px] !w-[140px] border-1 border-solid border-primary !rounded-full"
                                >
                                    <div class="">
                                        <span
                                            class="pl-3 text-[14px] text-primary"
                                            >一覧に戻る</span
                                        >
                                    </div>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
