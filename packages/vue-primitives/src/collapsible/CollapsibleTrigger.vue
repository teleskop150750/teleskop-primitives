<script setup lang="ts">
import { useAttrs } from 'vue'
import type { CollapsibleTriggerProps } from './CollapsibleTrigger.ts'
import { useCollapsibleContext } from './Collapsible.ts'
import { getState } from './utils.ts'
import Primitive from '~/primitive/Primitive.vue'
import { composeEventHandlers } from '~/utils/composeEventHandlers.ts'

defineOptions({
  name: 'CollapsibleTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button',
})
const attrs = useAttrs()

const context = useCollapsibleContext()

const onClick = composeEventHandlers((e) => {
  (attrs.onClick as Function | undefined)?.(e)
}, context.onOpenToggle)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    type="button"
    :aria-controls="context.contentId"
    :aria-expanded="context.open.value || false"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled?.value ? '' : undefined"
    :disabled="context.disabled?.value"
    v-bind="{
      ...attrs,
      onClick,
    }"
  >
    <slot />
  </Primitive>
</template>
