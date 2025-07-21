import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi';

const Alert = ({titile, content, varient}) => {
  const [isPasswdVisible, setIsPasswdVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPasswdVisible(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={
      !isPasswdVisible?
      `h-fit w-auto py-4 px-6 absolute top-4 right-4 left-4 z-40 border-[1px] border-${varient}-500/10 rounded-[8px] bg-${varient}-50 opacity-0 duration-500 -mt-2`:
      `h-fit w-auto py-4 px-6 absolute top-4 right-4 left-4 z-40 border-[1px] border-${varient}-500/10 rounded-[8px] bg-${varient}-50 opacity-100 duration-500 mt-0`
    }>
      <div className='flex flex-col gap-1'>
        <p className={`text-${varient}-500 text-sm font-medium`}>{titile}</p>
        <p className={`text-${varient}-500/75 text-xs`}>{content}</p>
      </div>
      <Button isIconOnly to={'/'} className='absolute top-0 right-0 opacity-30 bg-transparent rounded-full' size='sm'>
        <GiCancel className='' />
      </Button>
    </div>
  )
}

export default Alert