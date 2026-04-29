/* eslint-disable vue/multi-word-component-names */
import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import { Card, InputText, Password, Step, StepList, StepPanels, StepPanel, Stepper } from 'primevue'
import Aura from '@primeuix/themes/aura'

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.use(ToastService)

  app.component('Button', Button)
  app.component('Card', Card)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('Toast', Toast)
  app.component('Stepper', Stepper)
  app.component('StepList', StepList)
  app.component('StepPanels', StepPanels)
  app.component('StepPanel', StepPanel)
  app.component('Step', Step)
}
