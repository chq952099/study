// 存储token，采用pinia和pinia的持久化
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store=createPinia()
store.use(piniaPluginPersist)

export default store

