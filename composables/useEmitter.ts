import type { Ref } from 'vue'

const postMessage = (message: Ref<any>) => async (data: any) => {
    console.log("postMessage", data, message);
  message.value = data
}


export const useEmitter = () => {
  const message = useState('message', () => '')
  return {
    message,
    postMessage: postMessage(message),
  }
}