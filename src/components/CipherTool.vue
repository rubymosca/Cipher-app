<script setup>
import { ref } from 'vue'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSegment, IonSegmentButton, IonLabel, IonItem, IonRange, 
  IonTextarea, IonButton, IonIcon, IonToast 
} from '@ionic/vue'
import { lockClosedOutline, lockOpenOutline, copyOutline, checkmarkCircleOutline } from 'ionicons/icons'

const inputText = ref('')
const shiftKey = ref(3)
const resultText = ref('')
const mode = ref('encrypt')
const showToast = ref(false)

const processCipher = () => {
  if (!inputText.value) {
    resultText.value = ''
    return
  }

  let shift = shiftKey.value % 26
  if (mode.value === 'decrypt') {
    shift = (26 - shift) % 26
  }

  resultText.value = inputText.value
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65)
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97)
      }

      return char
    })
    .join('')
}

const copyToClipboard = async () => {
  if (resultText.value) {
    await navigator.clipboard.writeText(resultText.value)
    showToast.value = true
  }
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>MoscaProject</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header class="ion-text-center">
          <ion-card-title>Cipher Tool</ion-card-title>
          <ion-card-subtitle>Information Assurance & Security</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <!-- Segment Tabs -->
          <ion-segment :value="mode" @ionChange="mode = $event.detail.value; processCipher()">
            <ion-segment-button value="encrypt">
              <ion-icon :icon="lockClosedOutline"></ion-icon>
              <ion-label>Encrypt</ion-label>
            </ion-segment-button>
            <ion-segment-button value="decrypt">
              <ion-icon :icon="lockOpenOutline"></ion-icon>
              <ion-label>Decrypt</ion-label>
            </ion-segment-button>
          </ion-segment>

          <!-- Shift Key Range Slider -->
          <div class="shift-container ion-margin-top ion-margin-bottom">
            <ion-item lines="none">
              <ion-label>Shift Key (Caesar Cipher): <strong>{{ shiftKey }}</strong></ion-label>
            </ion-item>
            <ion-range 
              :min="1" 
              :max="25" 
              :value="shiftKey" 
              @ionInput="shiftKey = $event.detail.value; processCipher()"
              snaps="true"
              pin="true"
            >
            </ion-range>
          </div>

          <!-- Input Textarea -->
          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="stacked">
              {{ mode === 'encrypt' ? 'Plaintext Input' : 'Ciphertext Input' }}
            </ion-label>
            <ion-textarea
              v-model="inputText"
              :placeholder="mode === 'encrypt' ? 'Type text to encrypt...' : 'Paste ciphertext to decrypt...'"
              @ionInput="processCipher"
              :rows="3"
            ></ion-textarea>
          </ion-item>

          <!-- Output Textarea -->
          <ion-item fill="outline" class="ion-margin-bottom">
            <ion-label position="stacked">
              {{ mode === 'encrypt' ? 'Ciphertext Result' : 'Plaintext Result' }}
            </ion-label>
            <ion-textarea
              :value="resultText"
              readonly
              placeholder="Result will appear here..."
              :rows="3"
            ></ion-textarea>
          </ion-item>

          <!-- Copy Button -->
          <ion-button 
            expand="block" 
            color="success" 
            @click="copyToClipboard" 
            :disabled="!resultText"
          >
            <ion-icon slot="start" :icon="copyOutline"></ion-icon>
            Copy Result
          </ion-button>
        </ion-card-content>
      </ion-card>

      <!-- Toast Notification -->
      <ion-toast
        :is-open="showToast"
        message="Copied to clipboard!"
        :duration="2000"
        :icon="checkmarkCircleOutline"
        @didDismiss="showToast = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-card {
  max-width: 500px;
  margin: 0 auto;
  border-radius: 16px;
}

.shift-container {
  background: var(--ion-color-light);
  padding: 8px;
  border-radius: 12px;
}
</style>