<script setup>
import { ref } from 'vue';

const notices = ref([
    `過去分の収支報告書のデータ反映については、<strong
    >会員登録月度より遡って12ヶ月分までは<span
        class="text-[#ff2a2a]"
        >無償</span
    >、 12ヶ月より更に遡る場合は<span class="text-[#ff2a2a]"
        >有償</span
    ></strong
    >となります。
    <br />
    お客様の会員登録月は「<strong>2019年02月</strong>」ですので、「<strong>2018年01月</strong>」以前の収支報告書は有償になります。<br />
    <strong
        ><span class="text-[#ff2a2a]">有償</span
        >対象の収支報告書</strong
    >については、<strong
        ><span class="text-[#ff2a2a]"
            >1物件1ヶ月あたり800円(税込)で承ります。</span
        ></strong
    ><br />
    アップロードした収支報告書に有償対象分が含まれる場合は、事務局より確認のメールをお送りします。`,
    `収支報告書をアップロードしてからデータ反映までのお時間は以下の通りです。<br>
    <strong>通常：<span class="text-[#ff2a2a]">7営業日以内</span></strong><br>
    <strong>過去1年分まとめていただいた場合：<span class="text-[#ff2a2a]">7営業日以上</span></strong>`,
    `データ反映完了通知メールについて、<strong><span class="text-[#ff2a2a]">22時前後</span></strong>までは通知が届く可能性がございます。`,
    `既に反映済みのデータより過去の収支報告書をアップロードした場合、データ反映まで<strong><span class="text-[#ff2a2a]">通常よりお時間をいただきます</span></strong>ことをご了承ください。`,
    `既に反映済みのデータに対して追加や修正をご希望される場合は、必ずビズアナ事務局までご連絡ください。<br>
アップロードのみでご連絡がない場合は、<strong><span class="text-[#ff2a2a]">データ化の作業を進行できません</span></strong>のでご注意ください。`,
    `以下の場合は、必ずビズアナオーナー事務局宛にご連絡ください。<br>
物件名の変更／部屋番号の変更／一部区画の管理終了`,
]);
</script>

<template>
    <div class="pb-[62px] pt-[25px]" id="notice">
            <div class="container mx-auto rounded-sm">
                <div
                    class="bg-white px-[20px] pb-[40px] pt-[20px] md:px-[50px] md:pt-[20px]"
                >
                    <p class="mb-5 w-max text-[22px] font-normal">注意事項</p>
                    <div>
                        <div
                            class="notice-item"
                            v-for="(item, index) in notices"
                            :key="`notice-${index}`"
                            v-html="item"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
</template>