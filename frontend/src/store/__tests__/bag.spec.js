import { describe, it, expect, beforeEach, vi } from 'vitest'

// In-memory localStorage so the suite behaves the same on every Node version
const store = new Map()
vi.stubGlobal('localStorage', {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear()
})

const { default: bag } = await import('../modules/bag')

const freshState = () => ({ items: [] })

describe('bag store', () => {
  beforeEach(() => localStorage.clear())

  it('adds a new line item and persists it to localStorage', () => {
    const state = freshState()
    bag.mutations.addToBag(state, { sku: 'MEN-SHIRTS-1', quantity: 2, size: 'M', color: '#000000' })

    expect(state.items).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('bag'))).toEqual(state.items)
  })

  it('treats the same SKU in a different size as a separate line item', () => {
    const state = freshState()
    bag.mutations.addToBag(state, { sku: 'MEN-SHIRTS-1', quantity: 1, size: 'M', color: '#000000' })
    bag.mutations.addToBag(state, { sku: 'MEN-SHIRTS-1', quantity: 1, size: 'L', color: '#000000' })

    expect(state.items).toHaveLength(2)
  })

  it('updates quantity when the same SKU, size and colour is added again', () => {
    const state = freshState()
    bag.mutations.addToBag(state, { sku: 'MEN-SHIRTS-1', quantity: 1, size: 'M', color: '#000000' })
    bag.mutations.addToBag(state, { sku: 'MEN-SHIRTS-1', quantity: 3, size: 'M', color: '#000000' })

    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(3)
  })

  it('removes items and clears the bag', () => {
    const state = freshState()
    bag.mutations.addToBag(state, { sku: 'A', quantity: 1, size: 'M', color: '#fff' })
    bag.mutations.addToBag(state, { sku: 'B', quantity: 1, size: 'M', color: '#fff' })

    bag.mutations.removeFromBag(state, 'A')
    expect(state.items.map(i => i.sku)).toEqual(['B'])

    bag.mutations.clearBag(state)
    expect(state.items).toEqual([])
    expect(localStorage.getItem('bag')).toBeNull()
  })

  it('computes total quantity and per-variant quantity', () => {
    const state = freshState()
    bag.mutations.addToBag(state, { sku: 'A', quantity: 2, size: 'M', color: '#fff' })
    bag.mutations.addToBag(state, { sku: 'B', quantity: 3, size: 'L', color: '#000' })

    expect(bag.getters.totalItems(state)).toBe(5)
    expect(bag.getters.getQuantity(state)('B', 'L', '#000')).toBe(3)
    expect(bag.getters.getQuantity(state)('B', 'S', '#000')).toBe(0)
  })
})
