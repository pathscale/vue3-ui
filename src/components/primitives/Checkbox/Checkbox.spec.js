import { shallowMount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

let wrapper

describe('Checkbox', () => {
  beforeEach(() => {
    wrapper = shallowMount(Checkbox)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has an input checkbox', () => {
    expect(wrapper.html()).toContain('input type="checkbox"')
  })

  it('emit input event with value when value change', async () => {
    wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBeTruthy()

    wrapper.vm.value = false
    await wrapper.vm.$nextTick()

    const valueEmitted = wrapper.emitted()['update:modelValue'][2]
    expect(valueEmitted).toContainEqual(false)
  })

  it('method focus() gives focus to the input element', async () => {
    wrapper.vm.$refs.input.focus = jest.fn()
    wrapper.vm.focus()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$refs.input.focus).toHaveBeenCalledTimes(1)
  })
})
