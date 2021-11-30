import { render } from '@testing-library/vue'
import Button from './Button.vue'

let wrapper

describe('Button.vue', () => {
  beforeEach(() => {
    wrapper = render(Button)
  })

  it('is called', () => {
    wrapper.getByRole('button')
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
