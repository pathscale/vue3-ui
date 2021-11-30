import { render } from '@testing-library/vue'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renders props.label and type when passed', () => {
    const type = 'primary'
    const { getByText, container } = render(Button, {
      props: { label: type, type: `is-${type}` },
    })

    getByText(type)
    expect(container.firstChild.classList.contains(`is-${type}`)).toBe(true)
  })
})
