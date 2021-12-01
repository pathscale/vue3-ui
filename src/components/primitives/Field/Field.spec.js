import { shallowMount } from '@vue/test-utils'
import Field from './Field.vue'

let wrapper

describe('Field', () => {
  beforeEach(() => {
    wrapper = shallowMount(Field)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
