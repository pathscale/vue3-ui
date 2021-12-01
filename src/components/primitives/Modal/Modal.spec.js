import { shallowMount } from '@vue/test-utils'
import Modal from './Modal.vue'

let wrapper

describe('Modal', () => {
  beforeEach(() => {
    wrapper = shallowMount(Modal)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
