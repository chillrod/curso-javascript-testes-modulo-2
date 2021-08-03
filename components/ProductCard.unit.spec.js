import { mount } from '@vue/test-utils'

import ProductCard from '@/components/ProductCard'
import { makeServer } from '@/miragejs/server'

const mountProductCard = () => {
  let server
  const product = server.create('product', {
    title: 'Relógio Bonito',
    price: '22.00',
    image: 'http://placeimg.com/640/480/nature',
  })
  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
  }
}

describe('ProductCard - null', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mount the component', () => {
    const { wrapper } = mountProductCard()

    expect(wrapper.text()).toContain('Relógio Bonito')
    expect(wrapper.text()).toContain('22.00')
  })

  it('should  emit the event addToCart with product object gets clicked', async () => {
    const { wrapper, product } = mountProductCard()

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().addToCart).toBeTruthy()
    expect(wrapper.emitted().addToCart.length).toBe(1)
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }])
  })
})
