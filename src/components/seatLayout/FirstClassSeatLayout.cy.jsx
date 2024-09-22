import React from 'react'
import FirstClassSeatLayout from './FirstClassSeatLayout'

describe('<FirstClassSeatLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FirstClassSeatLayout />)
  })
})