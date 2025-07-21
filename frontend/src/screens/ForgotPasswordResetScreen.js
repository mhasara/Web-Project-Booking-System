import React, { useEffect, useState } from 'react'
import {Input} from "@nextui-org/input";
import { FaEye, FaEyeSlash  } from "react-icons/fa6";
import {Textarea} from "@nextui-org/input";
import {Button, Progress, Spinner} from "@nextui-org/react";
import { IoMdMail, IoMdLock  } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";
import {Checkbox} from "@nextui-org/checkbox";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/Logo.jpg'
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { getForgotLink, login, resetForgotPassword } from '../actions/userActions';
import Alert from '../componets/Alert';

const ForgotPasswordResetScreen = () => {

    const {uid} = useParams()
    const {token} = useParams()
    
    const [isPasswdVisible, setIsPasswdVisible] = React.useState(false);
    const toggleVisibility = () => setIsPasswdVisible(!isPasswdVisible);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [alert, setAlert] = useState(null)

    const userResetPassword = useSelector(state => state.userResetPassword)
    const { error, loading, message, success } = userResetPassword

    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      window.scroll(0,0);
      if(success){ 
        history('/login')
      }
    }, [location, success]);
    
    const submitHandler = () => {
      dispatch(resetForgotPassword(uid, token, password, rPassword))
      window.scroll(0,0)
    }
  return (
    <div className='h-fit min-h-screen flex items-center w-full'>      
      <section className='h-fit min-h-fit py-6 flex items-center justify-center w-full '>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-start md:justify-around gap-6 md:gap-0'>
          
          <div className='bg-white gap-4 shadow-[0px_4px_25px_rgba(0,0,0,0.05)] rounded-[8px] flex flex-col w-full sm:w-fit relative overflow-hidden mx-auto'>
            {
              loading?
              <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="w-full absolute top-0 z-30"
              />:
              ''
            }
            {
              error?
              <Alert titile={'Error'} content={error} varient={'red'} />:
              ''
            }
            {
              success?
              <Alert titile={'Success'} content={"Password reset link send successfully"} varient={'green'} />:
              ''
            }
            <div className={
              loading?
              'bg-white gap-4 px-6 py-8 rounded-[8px] flex flex-col w-full sm:w-fit relative opacity-50 pointer-events-none duration-200':
              'bg-white gap-4 px-6 py-8 rounded-[8px] flex flex-col w-full sm:w-fit relative opacity-100 duration-200'
            }>
              <Link to={'/'} className=''>
                <GiCancel className='absolute top-6 right-6 opacity-30' />
              </Link>
              
              <div className='flex flex-col items-center pb-4'>
                <img src={logo} alt='' className='h-16 w-fit object-contain'/>
                <p className='text-lg font-semibold'>Forgot password!</p>
                <p className='text-xs text-gray-400'>Enter your account id to continue</p>
              </div>
              <Input 
                labelPlacement="outside"
                placeholder="**********"
                type={
                  isPasswdVisible?
                  'text':
                  "password" 
                }
                label="Password" 
                className='w-full sm:w-[300px] rounded-[6px]' 
                radius='sm' 
                size='md'
                isInvalid={
                  error?
                  true:
                  false
                }
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                startContent={
                  <IoMdLock  className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                endContent={
                  <button 
                  
                  className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isPasswdVisible ? (
                      <FaEye  className="text-xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaEyeSlash  className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
              <Input 
                labelPlacement="outside"
                placeholder="**********"
                type={
                  isPasswdVisible?
                  'text':
                  "password" 
                }
                label="Re Password" 
                className='w-full sm:w-[300px] rounded-[6px]' 
                radius='sm' 
                size='md'
                isInvalid={
                  error?
                  true:
                  false
                }
                value={rPassword} 
                onChange={(e) => setRPassword(e.target.value)}
                startContent={
                  <IoMdLock  className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                // endContent={
                //   <button 
                  
                //   className="focus:outline-none" type="button" onClick={toggleVisibility}>
                //     {isPasswdVisible ? (
                //       <FaEye  className="text-xl text-default-400 pointer-events-none" />
                //     ) : (
                //       <FaEyeSlash  className="text-xl text-default-400 pointer-events-none" />
                //     )}
                //   </button>
                // }
              />
              <div className='flex items-center justify-between'>
              {/* <Checkbox size="sm" defaultSelected>Remember me</Checkbox> */}
              <Link to={'/forgot/password'} className='text-xs text-blue-600 font-medium'>Go back</Link>
              </div>
              <Button 
                // isLoading={
                //   loading?
                //   true:
                //   false
                // }
                onClick={submitHandler} endContent={
                  loading?
                  <Spinner size='sm' color='default' className='text-white'/>:
                  ''
                } className="rounded-[8px] font-medium bg-[#F02E62] text-white ">
                  Reset Password
              </Button> 
              <p className='text-xs'>Need to create an account? <Link to={"/register"} className='text-[#F02E62]'>Sign Up</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPasswordResetScreen