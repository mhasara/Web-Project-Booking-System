import React from 'react'

const Container = (props) => {
  return (
    <section className='relative h-fit w-full'>
        <img src={props.bg} alt='' className={
          props.bg?
          'h-full w-full object-cover absolute':
          'h-full w-full object-cover absolute hidden'
        } />
        <div className='h-fit w-full max-w-[1100px] mx-auto px-4 sm:px-6 overflow-hidden'>
            {props.children}
        </div>
    </section>
  )
}

export default Container