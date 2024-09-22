import React from 'react'
import AdminPortal from './AdminPortal'

describe('<AdminPortal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AdminPortal />)
  })
})