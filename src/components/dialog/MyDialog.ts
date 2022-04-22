import { defineComponent, Fragment, h } from 'vue'
import './dialog.css'

export const MyDialog = defineComponent({
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    return () =>
      h('div', { class: ['modal', props.modelValue ? '' : 'is-hidden'] }, [
        h(
          'div',
          {
            class: ['dialog', props.modelValue ? '' : 'is-hidden']
          },
          [
            h('div', { class: 'dialog-header' }, [
              h('div', null, [
                h('span', { class: 'title' }, props.title),
                h(Fragment, null, slots.header?.())
              ]),
              h(
                'button',
                {
                  class: 'close-button',
                  onClick: () => {
                    emit('update:modelValue', false)
                  }
                },
                '❌'
              )
            ]),
            h('div', { class: 'dialog-body' }, slots.default?.())
          ]
        )
      ])
  }
})
