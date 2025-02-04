import type { Ref } from "vue";

// method: Request method.
// query: Adds query search params to URL using ufo
// params: Alias for query
// body: Request body - automatically stringified (if an object is passed).
// headers: Request headers.
// baseURL: Base URL for the request.
// timeout: Milliseconds to automatically abort request

const post = () =>async (path: Ref<string>, body?: any) => {
const config = useRuntimeConfig();
  
  console.log("post",  path);
  console.log("config", config);
  return await useFetch(path, {
    method: "POST",
    body: body,
    baseURL: config.public.apiBase,
    headers: {
      //   Authorization: `Bearer ${config.apiSecret}`
    },
  }).then((res) => {
    return res.data.value;
  }).catch((err) => {
    console.log("err", err);
    return err;
   })
};
const get =  () => async () => {
  console.log("get");
}
export default function () {
  return {
    // post: post,
    get: get(),
    post: post(),
  };
};
