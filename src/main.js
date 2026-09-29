import { createApp } from 'vue'
import App from './App.vue'

/* Ionic Core CSS Requirements */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import { IonicVue } from '@ionic/vue'

const app = createApp(App)
app.use(IonicVue)

app.mount('#app')