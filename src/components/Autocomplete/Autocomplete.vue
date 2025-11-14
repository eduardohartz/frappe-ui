<template>
  <Combobox
    v-model="selectedValue"
    :multiple="multiple"
    nullable
    :by="compareFn"
    v-slot="{ open: isComboboxOpen }"
  >
    <Popover
      class="w-full"
      v-model:show="showOptions"
      ref="rootRef"
      :placement="placement"
      :match-target-width="true"
    >
      <template
        #target="{ open: openPopover, togglePopover, close: closePopover }"
      >
        <slot
          name="target"
          v-bind="{
            open: openPopover,
            close: closePopover,
            togglePopover,
            isOpen: isComboboxOpen,
          }"
        >
          <div class="space-y-1.5 w-full">
            <label v-if="props.label" class="block text-ink-gray-5 text-xs">
              {{ props.label }}
            </label>
            <button
              class="flex justify-between items-center gap-2 bg-surface-gray-2 hover:bg-surface-gray-3 px-2 py-1 border border-transparent rounded focus:border-outline-gray-4 focus:outline-none focus:ring-outline-gray-3 focus:ring-2 w-full h-7 transition-colors"
              :class="{ 'bg-surface-gray-3': isComboboxOpen }"
              @click="() => togglePopover()"
            >
              <div class="flex items-center overflow-hidden">
                <slot name="prefix" />
                <span
                  class="text-ink-gray-8 text-base truncate leading-5"
                  v-if="displayValue"
                >
                  {{ displayValue }}
                </span>
                <span class="text-ink-gray-4 text-base leading-5" v-else>
                  {{ placeholder || '' }}
                </span>
                <slot name="suffix" />
              </div>
              <FeatherIcon
                name="chevron-down"
                class="w-4 h-4 text-ink-gray-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </slot>
      </template>
      <template #body="{ isOpen, togglePopover }">
        <div v-show="isOpen">
          <div
            class="relative bg-surface-modal shadow-2xl mt-1 rounded-lg text-base"
            :class="bodyClasses"
          >
            <ComboboxOptions
              class="px-1.5 pb-1.5 max-h-[15rem] overflow-y-auto"
              :class="{ 'pt-1.5': hideSearch }"
              static
            >
              <div
                v-if="!hideSearch"
                class="top-0 z-10 sticky flex items-stretch space-x-1.5 bg-surface-modal py-1.5"
              >
                <div class="relative w-full">
                  <ComboboxInput
                    ref="searchInput"
                    class="hover:bg-surface-gray-4 focus:bg-surface-gray-3 w-full text-ink-gray-8 form-input"
                    type="text"
                    :value="query"
                    @change="query = $event.target.value"
                    autocomplete="off"
                    placeholder="Search"
                  />
                  <div
                    class="inline-flex right-0 absolute justify-center items-center w-7 h-7"
                  >
                    <LoadingIndicator
                      v-if="props.loading"
                      class="w-4 h-4 text-ink-gray-5"
                    />
                    <button v-else @click="clearAll">
                      <FeatherIcon name="x" class="w-4 text-ink-gray-8" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-for="group in groups"
                :key="group.key"
                v-show="group.items.length > 0"
              >
                <div
                  v-if="group.group && !group.hideLabel"
                  class="top-10 sticky bg-surface-modal px-2.5 py-1.5 font-medium text-ink-gray-5 text-sm truncate"
                >
                  {{ group.group }}
                </div>
                <ComboboxOption
                  as="template"
                  v-for="(option, idx) in group.items.slice(
                    0,
                    props.maxOptions,
                  )"
                  :key="idx"
                  :value="option"
                  :disabled="option.disabled"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      'flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base',
                      {
                        'bg-surface-gray-3': active,
                        'opacity-50': option.disabled,
                      },
                    ]"
                  >
                    <div class="flex flex-1 items-center gap-2 overflow-hidden">
                      <div
                        v-if="$slots['item-prefix'] || props.multiple"
                        class="flex flex-shrink-0"
                      >
                        <slot
                          name="item-prefix"
                          v-bind="{ active, selected, option }"
                        >
                          <FeatherIcon
                            name="check"
                            v-if="isOptionSelected(option)"
                            class="w-4 h-4 text-ink-gray-7"
                          />
                          <div v-else class="w-4 h-4" />
                        </slot>
                      </div>
                      <span class="flex-1 text-ink-gray-7 truncate">
                        {{ getLabel(option) }}
                      </span>
                    </div>

                    <div
                      v-if="$slots['item-suffix'] || option?.description"
                      class="flex-shrink-0 ml-2"
                    >
                      <slot
                        name="item-suffix"
                        v-bind="{ active, selected, option }"
                      >
                        <div
                          v-if="option?.description"
                          class="text-ink-gray-5 text-sm"
                        >
                          {{ option.description }}
                        </div>
                      </slot>
                    </div>
                  </li>
                </ComboboxOption>
              </div>
              <li
                v-if="groups.length == 0"
                class="px-2.5 py-1.5 rounded-md text-ink-gray-5 text-base"
              >
                No results found
              </li>
            </ComboboxOptions>

            <div
              v-if="$slots.footer || props.showFooter || multiple"
              class="p-1 border-t"
            >
              <slot name="footer" v-bind="{ togglePopover }">
                <div v-if="multiple" class="flex justify-end items-center">
                  <Button
                    v-if="!areAllOptionsSelected"
                    label="Selecionar Todos"
                    @click.stop="selectAll"
                  />
                  <Button
                    v-if="areAllOptionsSelected"
                    label="Limpar Todos"
                    @click.stop="clearAll"
                  />
                </div>
                <div v-else class="flex justify-end items-center">
                  <Button label="Clear" @click.stop="clearAll" />
                </div>
              </slot>
            </div>
          </div>
        </div>
      </template>
    </Popover>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { computed, nextTick, ref, watch } from 'vue'
import { Popover } from '../Popover'
import { Button } from '../Button'
import FeatherIcon from '../FeatherIcon.vue'
import LoadingIndicator from '../LoadingIndicator.vue'
import type {
  AutocompleteOptionGroup,
  AutocompleteOption,
  AutocompleteProps,
  Option,
} from './types'

const props = withDefaults(defineProps<AutocompleteProps>(), {
  multiple: false,
  maxOptions: 50,
  hideSearch: false,
  compareFn: (a, b) => a.value === b.value,
})
const emit = defineEmits(['update:modelValue', 'update:query', 'change'])

const searchInput = ref()
const showOptions = ref(false)
const query = ref('')

const groups = computed(() => {
  if (!props.options?.length) return []

  let groups: AutocompleteOptionGroup[]
  if (isOptionGroup(props.options[0])) {
    groups = props.options as AutocompleteOptionGroup[]
  } else {
    groups = [
      {
        group: '',
        items: sanitizeOptions(props.options as AutocompleteOption[]),
        hideLabel: false,
      },
    ]
  }

  return groups
    .map((group, i) => {
      return {
        key: i,
        group: group.group,
        hideLabel: group.hideLabel,
        items: filterOptions(sanitizeOptions(group.items || [])),
      }
    })
    .filter((group) => group.items.length > 0)
})

const allOptions = computed(() => {
  return groups.value.flatMap((group) => group.items)
})

const sanitizeOptions = (options: AutocompleteOption[]) => {
  if (!options) return []
  // in case the options are just values, convert them to objects
  return options.map((option) => {
    return isOption(option)
      ? option
      : { label: option.toString(), value: option }
  })
}

const filterOptions = (options: Option[]) => {
  if (!query.value) return options
  return options.filter((option) => {
    return (
      option.label.toLowerCase().includes(query.value.trim().toLowerCase()) ||
      option.value
        .toString()
        .toLowerCase()
        .includes(query.value.trim().toLowerCase())
    )
  })
}

const selectedValue = computed({
  get() {
    if (!props.multiple) {
      return (
        findOption(props.modelValue as AutocompleteOption) ||
        // if the modelValue is not found in the option list
        // return the modelValue as is
        makeOption(props.modelValue as AutocompleteOption)
      )
    }
    // in case of `multiple`, modelValue is an array of values
    // if the modelValue is a list of values, convert them to options
    const values = (props.modelValue || []) as AutocompleteOption[]
    return isOption(values[0])
      ? values
      : values.map((v) => findOption(v) || makeOption(v))
  },
  set(val) {
    query.value = ''
    if (val && !props.multiple) showOptions.value = false
    if (!props.multiple) {
      emit('update:modelValue', val)
      return
    }
    emit('update:modelValue', val)
  },
})

const findOption = (option: AutocompleteOption) => {
  if (!option) return option
  const value = isOption(option) ? option.value : option
  return allOptions.value.find((o) => o.value === value)
}

const makeOption = (option: AutocompleteOption) => {
  return isOption(option) ? option : { label: option, value: option }
}

const getLabel = (option: AutocompleteOption) => {
  if (isOption(option)) {
    return option?.label || option?.value
  }
  return option
}

const displayValue = computed(() => {
  if (!selectedValue.value) return ''
  if (!props.multiple) {
    return getLabel(selectedValue.value as AutocompleteOption)
  }
  return (selectedValue.value as AutocompleteOption[])
    .map((v) => getLabel(v))
    .join(', ')
})

const isOptionSelected = (option: AutocompleteOption) => {
  if (!selectedValue.value) return false
  const value = isOption(option) ? option.value : option
  if (!props.multiple) {
    return selectedValue.value === value
  }
  return (selectedValue.value as AutocompleteOption[]).find((v) =>
    isOption(v) ? v.value === value : v === value,
  )
}

const areAllOptionsSelected = computed(() => {
  if (!props.multiple) return false
  return (
    allOptions.value.length ===
    (selectedValue.value as AutocompleteOption[])?.length
  )
})

const selectAll = () => {
  selectedValue.value = allOptions.value
}

const clearAll = () => {
  selectedValue.value = props.multiple ? [] : undefined
}

const isOption = (option: AutocompleteOption) => {
  return typeof option === 'object'
}

const isOptionGroup = (option: any) => {
  return typeof option === 'object' && 'items' in option && 'group' in option
}

watch(
  () => query.value,
  () => {
    emit('update:query', query.value)
  },
)

watch(
  () => showOptions.value,
  () => {
    if (showOptions.value) {
      nextTick(() => searchInput.value?.$el.focus())
    }
  },
)

const rootRef = ref()

const togglePopover = () => {
  showOptions.value = !showOptions.value
}

defineExpose({
  rootRef,
  togglePopover,
})
</script>
