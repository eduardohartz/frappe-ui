<template>
  <div
    v-show="show"
    class="right-0 z-50 fixed flex flex-col justify-between gap-2 bg-surface-modal shadow-2xl m-5 mt-[62px] p-3 rounded-lg w-80 h-[calc(100%_-_80px)] text-ink-gray-9"
    :class="{ 'top-[calc(100%_-_120px)] border': minimize }"
    @click.stop
  >
    <div class="flex justify-between items-center px-2 py-1.5">
      <div class="font-medium text-base">
        {{ headingTitle }}
      </div>
      <div class="flex gap-1">
        <Dropdown v-if="options.length" :options="options">
          <Button variant="ghost" icon="more-horizontal" />
        </Dropdown>
        <Button @click="minimize = !minimize" variant="ghost">
          <component
            :is="minimize ? MaximizeIcon : MinimizeIcon"
            class="h-3.5"
          />
        </Button>
        <Button variant="ghost" @click="show = false">
          <FeatherIcon name="x" class="h-3.5" />
        </Button>
      </div>
    </div>
    <div class="flex flex-col h-full overflow-hidden">
      <OnboardingSteps
        v-if="!isOnboardingStepsCompleted && !showHelpCenter"
        :title="title"
        :logo="logo"
        :afterSkip="afterSkip"
        :afterSkipAll="afterSkipAll"
        :afterReset="afterReset"
        :afterResetAll="afterResetAll"
        :appName="appName"
      />
      <HelpCenter
        v-else-if="showHelpCenter"
        v-model="articles"
        :docsLink="docsLink"
      />
    </div>
    <div v-for="item in footerItems" class="flex flex-col gap-1.5">
      <div
        class="flex items-center gap-2 hover:bg-surface-gray-1 px-2 py-1.5 rounded w-full text-ink-gray-8 cursor-pointer"
        @click="item.onClick"
      >
        <component :is="item.icon" class="h-4" />
        <div class="text-base">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Dropdown from '../../src/components/Dropdown/Dropdown.vue'
import Button from '../../src/components/Button/Button.vue'
import StepsIcon from '../Icons/StepsIcon.vue'
import MinimizeIcon from '../Icons/MinimizeIcon.vue'
import MaximizeIcon from '../Icons/MaximizeIcon.vue'
import HelpIcon from '../Icons/HelpIcon.vue'
import OnboardingSteps from '../Onboarding/OnboardingSteps.vue'
import HelpCenter from '../HelpCenter/HelpCenter.vue'
import { useOnboarding } from '../Onboarding/onboarding'
import { showHelpCenter } from '../HelpCenter/helpCenter'
import { minimize } from '../Help/help'
import { onMounted, computed } from 'vue'
import FeatherIcon from '../../src/components/FeatherIcon.vue'

const props = defineProps({
  appName: {
    type: String,
    default: 'frappecrm',
  },
  title: {
    type: String,
    default: 'Frappe CRM',
  },
  logo: {
    type: Object,
    required: true,
  },
  afterSkip: {
    type: Function,
    default: () => {},
  },
  afterSkipAll: {
    type: Function,
    default: () => {},
  },
  afterReset: {
    type: Function,
    default: () => {},
  },
  afterResetAll: {
    type: Function,
    default: () => {},
  },
  docsLink: {
    type: String,
    default: 'https://docs.frappe.io/crm',
  },
})

const { syncStatus, resetAll, isOnboardingStepsCompleted } = useOnboarding(
  props.appName,
)

const show = defineModel()
const articles = defineModel('articles')

const headingTitle = computed(() => {
  if (!isOnboardingStepsCompleted.value && !showHelpCenter.value) {
    return 'Getting started'
  } else if (showHelpCenter.value) {
    return 'Help center'
  }
})

const options = computed(() => {
  let items = [
    {
      icon: StepsIcon,
      label: 'Reset onboarding steps',
      onClick: resetOnboardingSteps,
      condition: () => showHelpCenter.value && isOnboardingStepsCompleted.value,
    },
  ]

  return items.filter((item) => item.condition())
})

const footerItems = computed(() => {
  let items = [
    {
      icon: HelpIcon,
      label: 'Help centre',
      onClick: () => {
        syncStatus()
        showHelpCenter.value = false
      },
      condition: !isOnboardingStepsCompleted.value && !showHelpCenter.value,
    },
    {
      icon: StepsIcon,
      label: 'Getting started',
      onClick: () => (showHelpCenter.value = false),
      condition: showHelpCenter.value && !isOnboardingStepsCompleted.value,
    },
  ]

  return items.filter((item) => item.condition)
})

function resetOnboardingSteps() {
  resetAll()
  isOnboardingStepsCompleted.value = true
  showHelpCenter.value = false
}

onMounted(() => {
  showHelpCenter.value = false
  if (isOnboardingStepsCompleted.value) {
    showHelpCenter.value = false
  }
})
</script>
