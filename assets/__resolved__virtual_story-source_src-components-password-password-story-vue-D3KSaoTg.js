const __resolved__virtual_storySource_srcComponentsPasswordPasswordStoryVue = `<script setup lang="ts">
import { Password } from './index'
import { ref } from 'vue'

const value = ref('')
<\/script>

<template>
  <Story title="Password" :layout="{ width: 500, type: 'grid' }">
    <div class="p-2">
      <Password v-model="value" />
    </div>
  </Story>
</template>
`;
export {
  __resolved__virtual_storySource_srcComponentsPasswordPasswordStoryVue as default
};
