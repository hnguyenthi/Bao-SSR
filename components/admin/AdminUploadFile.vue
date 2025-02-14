<script setup>
import { ref, useTemplateRef, watch } from "vue";
const input = useTemplateRef("input");
const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = (e) => {
  e.preventDefault();

  const files = e.dataTransfer.files;

  if (files.length) {
    input.files = files;
    // upload file
  }
};
</script>
<template>
    <div>
         <div
                  class="fileupload my-3 border-[1px] border-solid border-[#ccc] p-4 rounded-sm"
                >
                  <div
                    @dragenter="preventDefaults"
                    @dragover="preventDefaults"
                    @dragleave="preventDefaults"
                    @drop="handleDrop"
                     @click="
                      () => {
                        input.click();
                      }
                    "
                    id="dropzone"
                    class="cursor-pointer rounded-sm border-2 border-dashed border-[#ccc] p-5 text-center text-h1 text-[#ccc]"
                  >
                    （ファイルをここにドロップ）
                    <input
                      multiple
                      type="file"
                      ref="input"
                  accept="image/jpeg,image/png,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

                      class="upload-input hidden"
                    />
                  </div>

                  <div id="filelist"></div>
                </div>
                <!-- <div class="mb-3 mt-3 flex items-center justify-end">
                  <button
                    @click="
                      () => {
                        input.click();
                      }
                    "
                    type="button"
                    class="ml-3 btn btn-inline btn-outline-primary btn-sm"
                  >
                    ファイルの選択
                  </button>
                </div> -->
    </div>
</template>