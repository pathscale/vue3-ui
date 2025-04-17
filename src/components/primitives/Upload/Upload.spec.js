import { shallowMount } from '@vue/test-utils'
import Upload from './Upload.vue'

let wrapper

describe('Upload', () => {
  beforeEach(() => {
    wrapper = shallowMount(Upload)
  })

  it('is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
