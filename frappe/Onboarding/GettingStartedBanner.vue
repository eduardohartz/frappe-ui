<template>
  <div
    v-if="!isSidebarCollapsed"
    class="flex flex-col gap-3 bg-surface-modal shadow-sm px-3 py-2.5 rounded-lg text-base"
  >
    <div
      v-if="stepsCompleted != totalSteps"
      class="inline-flex gap-2 text-ink-gray-9"
    >
      <StepsIcon class="my-0.5 h-4 shrink-0" />
      <div class="flex flex-col gap-0.5 text-p-sm">
        <div class="font-medium">
          {{ 'Getting started' }}
        </div>
        <div class="text-ink-gray-7">
          {{ `${stepsCompleted}/${totalSteps} steps` }}
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-1">
      <div class="flex justify-between items-center gap-1">
        <div class="flex items-center gap-2 shrink-0">
          <StepsIcon class="my-0.5 h-4" />
          <div class="font-medium text-ink-gray-9">
            {{ 'You are all set' }}
          </div>
        </div>
        <FeatherIcon
          name="x"
          class="h-4 cursor-pointer"
          @click="
            () => {
              showHelpCenter = false
              isOnboardingStepsCompleted = true
            }
          "
        />
      </div>
      <div class="text-ink-gray-7 text-p-sm">
        {{ 'All steps are completed successfully' }}
      </div>
    </div>
    <Button
      v-if="stepsCompleted != totalSteps"
      :label="stepsCompleted == 0 ? 'Start now' : 'Continue'"
      theme="blue"
      @click="openOnboarding"
    >
      <template #prefix>
        <FeatherIcon name="chevrons-right" class="size-4" />
      </template>
    </Button>
  </div>
  <Button v-else-if="stepsCompleted != totalSteps" @click="openOnboarding">
    <StepsIcon class="my-0.5 h-4 shrink-0" />
  </Button>
</template>
<script setup>
import StepsIcon from '../Icons/StepsIcon.vue'
import Button from '../../src/components/Button/Button.vue'
import FeatherIcon from '../../src/components/FeatherIcon.vue'
import { useOnboarding } from './onboarding'
import { showHelpCenter } from '../HelpCenter/helpCenter'
import { showHelpModal, minimize } from '../Help/help'

const props = defineProps({
  isSidebarCollapsed: {
    type: Boolean,
    default: false,
  },
  appName: {
    type: String,
    default: 'frappecrm',
  },
})

const { stepsCompleted, totalSteps, isOnboardingStepsCompleted } =
  useOnboarding(props.appName)

const openOnboarding = () => {
  minimize.value = false
  showHelpModal.value = false
}
</script>
