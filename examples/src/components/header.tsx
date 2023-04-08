import Link from 'next/link'
import React from 'react'

const header = () => {
  return (
    <nav className='border-2'>
      <ul className='flex p-5'>
        <li className='mr-5'>
          <Link href='/' className='underline'>
            CHECKBOX ver
          </Link>
        </li>
        <li>
          <Link href='/index2' className='underline'>
            HIDDEN ver
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default header
