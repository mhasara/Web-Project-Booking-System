import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from '@nextui-org/react'
import React from 'react'

const ProfileScreen = () => {
  return (
    <div className='h-fit w-full flex flex-col gap-8'>
      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6'>
          <Breadcrumbs className='py-4'>
            <BreadcrumbItem className='font-medium'>Home</BreadcrumbItem>
            <BreadcrumbItem className='font-medium'>My Account</BreadcrumbItem>
          </Breadcrumbs> 
          <div className='h-fit w-full grid grid-cols-1 md:grid-cols-6 gap-8 items-start'>
            <div className='w-full h-fit md:col-span-2  '>
              <Tabs isVertical={true} aria-label="Tabs variants" className='min-w-full'>
                <Tab key="photos" title="Photos" className='min-w-full'/>
                <Tab key="music" title="Music" className='min-w-full'/>
                <Tab key="videos" title="Videos" className='min-w-full'/>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileScreen