import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfessionalsList from '../../src/components/ProfessionalsList.jsx'

describe('Home', () => {
  const professionals = [
    {
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra libero vel pulvinar finibus. Integer nec nibh tellus. Maecenas sollicitudin malesuada justo ac lacinia.",
      id: "8793908e-3c9b-431b-8562-258cca7f016b",
      created_at: "2021-08-24T22:45:44.401Z",
      updated_at: "2021-08-24T22:45:44.401Z",
      user: {
        email: "john@doe.com",
        name: "John Doe",
        gender: "male",
        age: 28,
        avatar_url: "https://randomuser.me/portraits/men/2.jpg",
        id: "d029d5e1-196d-4a39-9e96-756ddf0081ae",
        created_at: "2021-08-24T22:45:44.432Z",
        updated_at: "2021-08-24T22:45:44.432Z"
      },
      expertise: [
        {
          name: "Natação",
          id: "78b86c59-0fa7-4d34-989d-2248d2cffe7c",
          created_at: "2021-08-23T17:26:07.282Z",
          updated_at: "2021-08-23T17:26:07.282Z"
        },
        {
          name: "Atletismo",
          id: "6b244a6f-69b9-4bfe-8b4b-10488bb17f3d",
          created_at: "2021-08-23T17:28:07.808Z",
          updated_at: "2021-08-23T17:28:07.808Z"
        }
      ]
    }
  ]

  it('renders the professional name', () => {
    render(<ProfessionalsList professionals={professionals} isLoading={false} />)

    const name = screen.getByText(/John Doe/i)

    expect(name).toBeInTheDocument()
  })

  it('should show a message when no professional is found', () => {
    render(<ProfessionalsList professionals={[]} isLoading={false} />)

    const message = screen.getByText(/Nenhum profissional encontrado/i)

    expect(message).toBeInTheDocument()
  })

  it('should show skeleton loaders while loading the professionals', () => {
    const {debug} = render(<ProfessionalsList professionals={null} isLoading />)

    debug()
  })
})