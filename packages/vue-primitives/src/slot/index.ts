import { Comment, type VNode, defineComponent, warn } from 'vue'
import { getRawChildren } from '~/utils/getRawChildren.ts'

export const Slot = defineComponent({
  name: 'Slot',
  setup(_, { slots }) {
    return () => {
      if (!slots.default)
        return null

      const children = slots.default && getRawChildren(slots.default())

      if (!children || !children.length)
        return

      let child: VNode | undefined = children[0]

      if (children.length > 1) {
        let hasFound = false
        // locate first non-comment child
        for (const c of children) {
          if (c.type !== Comment) {
            if (__DEV__ && hasFound) {
              // warn more than one non-comment child
              warn(
                '<Slot> can only be used on a single element or component.',
              )
              break
            }
            child = c
            hasFound = true
            if (!__DEV__)
              break
          }
        }
      }

      return child
    }
  },
})
