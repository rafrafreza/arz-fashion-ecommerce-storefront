describe('Storefront smoke test', () => {
  it('loads the home page with the brand header', () => {
    cy.visit('/')
    cy.contains('ARZ')
  })
})
