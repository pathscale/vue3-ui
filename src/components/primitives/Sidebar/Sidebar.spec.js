import { shallowMount } from '@vue/test-utils'
import Sidebar from './Sidebar.vue'

let wrapper

describe('Sidebar', () => {
  beforeEach(() => {
    wrapper = shallowMount(Sidebar)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
