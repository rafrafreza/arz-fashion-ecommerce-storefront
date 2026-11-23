import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutSection from '../CheckoutSection.vue'

const mountWith = (bagItems) =>
  mount(CheckoutSection, {
    props: {
      user: { name: 'Test', phone: '9999999999', address: 'Somewhere' },
      bagItems,
      isLoggedIn: true
    }
  })

describe('CheckoutSection pricing', () => {
  it('charges delivery below the free-shipping threshold', () => {
    const wrapper = mountWith([{ sku: 'A', price: 400, quantity: 2, deliveryTime: 3 }])
    expect(wrapper.vm.subtotal).toBe(800)
    expect(wrapper.vm.deliveryCharges).toBe(99)
    expect(wrapper.vm.total).toBe(899)
  })

  it('waives delivery above the free-shipping threshold', () => {
    const wrapper = mountWith([{ sku: 'A', price: 1000, quantity: 1, deliveryTime: 3 }])
    expect(wrapper.vm.deliveryCharges).toBe(0)
  })

  it('applies percentage and fixed coupons', async () => {
    const wrapper = mountWith([{ sku: 'A', price: 1000, quantity: 2, deliveryTime: 3 }])

    wrapper.vm.couponCode = 'flat10'
    wrapper.vm.applyCoupon()
    expect(wrapper.vm.discountAmount).toBe(200)

    wrapper.vm.couponCode = 'SAVE100'
    wrapper.vm.applyCoupon()
    expect(wrapper.vm.discountAmount).toBe(100)
  })

  it('rejects unknown coupon codes', () => {
    const wrapper = mountWith([{ sku: 'A', price: 1000, quantity: 1, deliveryTime: 3 }])
    wrapper.vm.couponCode = 'NOPE'
    wrapper.vm.applyCoupon()
    expect(wrapper.vm.couponError).toBe('Invalid coupon code')
    expect(wrapper.vm.discountAmount).toBe(0)
  })

  it('quotes the slowest item as the delivery estimate', () => {
    const wrapper = mountWith([
      { sku: 'A', price: 100, quantity: 1, deliveryTime: 3 },
      { sku: 'B', price: 100, quantity: 1, deliveryTime: 6 }
    ])
    expect(wrapper.vm.deliveryTimeText).toBe('6 business days')
  })
})
