import { render, fireEvent } from '@testing-library/vue'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('render correctly', () => {
    expect(render(Button).html()).toMatchSnapshot()
  })

  it('emit a click event', async () => {
    const handleClick = jest.fn()
    const wrapper = render(<Button onClick={handleClick}>Click Me</Button>)
    await fireEvent.click(wrapper.getByText(/click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  it('should be medium', () => {
    const wrapper = render(Button, { props: { label: 'medium', size: 'is-medium' } })

    expect(wrapper.getByRole('button', { name: /medium/i })).toHaveClass('is-medium')
  })
  it('should be rounded when prop is set to true', () => {
    const wrapper = render(Button, { props: { label: 'rounded', rounded: true } })

    expect(wrapper.getByRole('button', { name: /rounded/i })).toHaveClass('is-rounded')
  })
})
