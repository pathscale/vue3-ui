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
})
