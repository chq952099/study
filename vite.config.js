import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers:[ElementPlusResolver()],
      imports:['vue','vue-router']
    }),
    Components({
      resolvers:[ElementPlusResolver()]
    })
  ],
  resolve:{
    // 配置路径别名
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server:{
    proxy:{
      '/api':'http://testapi.xuexiluxian.cn/'
    }
  }
})
