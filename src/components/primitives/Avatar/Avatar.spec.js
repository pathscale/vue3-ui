import { shallowMount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

let wrapper

describe('Avatar', () => {
  beforeEach(() => {
    wrapper = shallowMount(Avatar)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
