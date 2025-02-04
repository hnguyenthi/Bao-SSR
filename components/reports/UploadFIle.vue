<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import infoAreaData from '~/assets/mockData/infoArea.json';
import Swal from 'sweetalert2';
const emit = defineEmits(['close']);
const input = useTemplateRef('input');

const infoArea = ref(infoAreaData);
const show = ref(false);
const handleOpenUpload = () => {
    show.value = true;
};
const handleUpload = () => {
    input.value.click();
};
function previewImage(event) {
    const file = event.target.files[0];
}
const handleScroll = () => {
    window.scroll({
        top: document.getElementById('notice').offsetTop,
        left: 0,
        behavior: 'smooth',
    });
};
const handleSubmit = () => {
    let options = {
        title: '送信に失敗しました',
        text: '大変恐れ入りますが、下記までご連絡ください。<br>事務局：support@biz-ana.com',
        icon: 'error',
        iconColor: '#f27474',
        confirmButtonColor: '#7cd1f9',
        confirmButtonText: 'OK',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            console.log('yes');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
};
const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log('files======', files);

    if (files.length) {
        input.files = files;
        let options = {
        title: `「${files[0].name}」は大きすぎます。`,
        icon: 'info',
        confirmButtonColor: '#7cd1f9',
        confirmButtonText: 'OK',
        reverseButtons: true,
    };
    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            console.log('yes');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('no');
        }
    });
    }
};
onMounted(() => {
    const dragDrop = document.getElementById('drop-zone');
    dragDrop.addEventListener('dragover', preventDefaults);
    dragDrop.addEventListener('dragenter', preventDefaults);
    dragDrop.addEventListener('dragleave', preventDefaults);
    dragDrop.addEventListener('drop', handleDrop);
});
</script>
<template>
    <div class="">
        <div
            class="mb-[16px] flex items-center justify-center md:justify-between"
        >
            <div
                class="flex flex-col content-center items-center justify-between gap-[10px] md:flex-row md:gap-[28px]"
            >
                <p class="w-max text-h6 font-normal md:text-[22px]">
                    収支報告書　一覧
                </p>
                <PrimaryButton
                    @click="handleOpenUpload"
                    type="success"
                    class="!h-[36px] !w-[245px] !rounded-full"
                >
                    <div
                        class="flex content-center items-center justify-center bg-success"
                    >
                        <img
                            src="~/assets/images/common/rp__ic2.svg"
                            alt=""
                            class="object-none"
                        />
                        <span class="pl-1 text-[14px] md:text-h6">
                            ファイルアップロード
                        </span>
                    </div>
                </PrimaryButton>
            </div>
            <div
                @click="handleScroll"
                class="hidden cursor-pointer items-center justify-between md:flex"
            >
                <img
                    src="~/assets/images/common/rp__ic1.svg"
                    alt=""
                    class="object-none"
                />
                <span class="pl-1 text-[14px] font-normal">注意事項</span>
            </div>
        </div>
        <div class="fixed bottom-3 right-0 z-[50]" @click="show = true">
            <img
                src="~/assets/images/common/upload-btn.svg"
                class="h-[130px] w-[130px] object-cover md:h-[180px] md:w-[180px]"
                alt="upload-btn"
            />
        </div>
        <Teleport to="body">
            <Transition
                enter-active-class="duration-300"
                leave-active-class="duration-300"
            >
                <div
                    v-show="show"
                    class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0"
                    scroll-region
                >
                    <Transition>
                        <div
                            v-show="show"
                            class="fixed inset-0"
                            @click="show = false"
                        >
                            <div
                                class="absolute inset-0 bg-[#00000080] opacity-70"
                            />
                        </div>
                    </Transition>

                    <Transition>
                        <div
                            v-show="show"
                            class="absolute right-0 top-1/2 mb-6 h-screen w-full -translate-y-1/2 transform overflow-auto bg-table-400 transition-all md:max-w-[600px]"
                        >
                            <div class="container-upload pb-[33px] pt-[33px]">
                                <div class="pb-[30px] pr-[40px] text-right">
                                    <PrimaryButton
                                        @click="show = false"
                                        classes="bg-transparent !w-[140px] h-[40px] border  border-solid border-dark !rounded-full"
                                    >
                                        <div class="flex justify-center">
                                            <img
                                                src="~/assets/images/common/icon-close.svg"
                                                alt="icon-close"
                                                class="object-none"
                                            />
                                            <span
                                                class="ml-[7px] font-normal text-dark"
                                                >{{ `閉じる` }}</span
                                            >
                                        </div>
                                    </PrimaryButton>
                                </div>
                                <div class="upload-content">
                                    <div class="upload-area pb-[34px]">
                                        <p class="pb-[18px] text-h5">
                                            ファイルアップロード
                                        </p>
                                        <div
                                            id="drop-zone"
                                            class="drop-zone flex flex-col justify-center rounded-md border-2 border-dashed border-[#b4b5b8] py-[29px]"
                                        >
                                            <div class="flex justify-center">
                                                <img
                                                    src="~/assets/images/common/icon-drop.svg"
                                                    alt="icon-drop"
                                                    class="w-[28px] object-none"
                                                />
                                            </div>
                                            <p
                                                class="text-center text-h5 font-normal"
                                            >
                                                ファイルをここにドロップ
                                            </p>
                                            <p
                                                class="text-center text-[14px] text-primary"
                                            >
                                                または
                                            </p>
                                            <p
                                                @click="handleUpload"
                                                class="cursor-pointer text-center text-h5 font-normal"
                                            >
                                                ファイルを選択
                                            </p>
                                            <input
                                                type="file"
                                                ref="input"
                                                class="upload-input hidden"
                                                @change="
                                                    (event) => {
                                                        previewImage(event);
                                                    }
                                                "
                                            />
                                        </div>
                                        <div class="flex justify-center pt-4">
                                            <PrimaryButton
                                                type="primary"
                                                class="!w-[110px]"
                                                @click="handleSubmit"
                                            >
                                                <div class="flex gap-x-[5px]">
                                                    <img
                                                        src="~/assets/images/common/icon-save.svg"
                                                        alt="icon-save"
                                                    />
                                                    <span class="text-[14px]"
                                                        >保存する</span
                                                    >
                                                </div>
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                    <div class="notice-area mb-[60px]">
                                        <div
                                            class="mb-[26px] border-b border-solid border-grey pb-2"
                                        >
                                            注意事項
                                        </div>
                                        <div>
                                            <div
                                                class="notice-text flex flex-col gap-y-[35px]"
                                            >
                                                <!-- <ul> -->
                                                <p class="notice-item">
                                                    写真をアップロードする場合は、<span
                                                        class="font-semibold text-red"
                                                        >データ化する部分の文字が判読できるように撮影</span
                                                    >してください。写真が不鮮明だったりフレームから外れて文字が切れていたりするとデータ化することができません。<br />また、アップロードする際には<span
                                                        class="font-semibold text-red"
                                                        >上下が逆になったり横向きにならないようアップロード</span
                                                    >してください。
                                                </p>

                                                <p class="notice-item">
                                                    事務局にてデータ化できるのは、ファイル内に以下の4項目が含まれているものに限ります。<br />
                                                    <span
                                                        class="font-semibold text-red"
                                                        >１.物件名　２.該当年月　３.収支項目　４.金額</span
                                                    ><br />
                                                    これらの4項目が物件ごと、年月ごとに分かれているファイルのみアップロードしてください。<br />
                                                    <span
                                                        class="font-semibold text-red"
                                                        >※上記4項目が含まれていないものや、1つのファイルに複数物件・複数年月が含まれているものは全て対象外となります。</span
                                                    >
                                                </p>

                                                <p class="notice-item">
                                                    <span
                                                        class="font-semibold text-red"
                                                        >支出のみのアップロードの場合はデータ化を開始することができません。</span
                                                    ><br />
                                                    該当年月に対する収入・支出情報の両方が揃った状態でアップロードしてください。
                                                </p>

                                                <p class="notice-item">
                                                    物件に直接紐付かない資料は、データ反映の対象外となりますのでご了承ください。<span
                                                        class="font-semibold text-red"
                                                        >（例：不動産取得税、固定資産税、貸付利息計算書、経費立替分精算表、など）</span
                                                    >
                                                </p>
                                                <!-- </ul> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-area">
                                        <div
                                            class="mb-[26px] border-b border-solid border-grey pb-2"
                                        >
                                            操作手順
                                        </div>
                                        <ol>
                                            <li
                                                v-for="(
                                                    item, index
                                                ) in infoArea"
                                                :key="index"
                                            >
                                                {{ item }}
                                            </li>
                                        </ol>
                                        <div class="mb-5 pt-10">
                                            ファイルがうまく添付できない、もしくは操作方法が分からない場合は、事務局まで直接メールかFAXでお送りください。
                                        </div>
                                        <div>
                                            <div>
                                                メール：
                                                <a
                                                    class="text-primary underline hover:opacity-70"
                                                    href="mailto:mailto:receive@biz-ana.com"
                                                    >mailto:receive@biz-ana.com</a
                                                >
                                            </div>
                                            <p>FAX：03-5298-2019</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
<style lang="scss">
.upload-content {
    padding-left: 40px;
    padding-right: calc(40px + var(--scrollbar));
}
.notice-title {
    border-bottom: solid 1px #ccc9c9;
}
.v-enter-from {
    opacity: 0;
    translate: 100px 0;
}
.v-enter-to {
    opacity: 1;
    translate: 0 0;
}
.v-leave-from {
    opacity: 1;
    translate: 0 0;
}
.v-leave-to {
    opacity: 0;
    translate: 100px 0;
}
</style>
