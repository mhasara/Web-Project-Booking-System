import React, { useEffect, useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Chip, ButtonGroup, Skeleton} from "@nextui-org/react";
import logo from '../assets/Logo.jpg'
import { CiMenuBurger, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import {Tabs, Tab} from "@nextui-org/react"; 
import {Badge} from "@nextui-org/badge";
import { Progress } from "@nextui-org/react";
import { useLoaderData, useLocation, useNavigate ,Link} from 'react-router-dom';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn} from "@nextui-org/react";
import {GrFormAdd, GrFormSubtract, GrFormEdit} from 'react-icons/gr'
import {MdArrowRightAlt, MdOutlineArrowDropDown, MdOutlineCancel} from 'react-icons/md'
import {Input} from "@nextui-org/react";
import { RiSearch2Line } from 'react-icons/ri';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { HiOutlineUser, HiOutlineUserCircle, HiUser } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { removeFromCart } from '../actions/cartActions';
import CountUp from 'react-countup';
import { PRODUCT_VARIANT_COMINATION_PRICE_RESET } from '../constants/productConstants';

const Header = () => {
    const [navbar, setNavbar] = useState(false);

    const [search, setSearch] = useState('');

    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { loading, error, cartItems } = cart 
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    useEffect(() => {
        dispatch({ type: PRODUCT_VARIANT_COMINATION_PRICE_RESET })
    }, [location])
    

  return (
    <Navbar maxWidth='2xl' className={
        location.pathname == '/login' || location.pathname.startsWith('/password/reset/confirm') || location.pathname == '/forgot/password' || location.pathname == '/create/activation/link' || location.pathname == '/register'?
        'h-36 md:h-24 bg-white shadow-md hidden flex-col z-50':
        'h-36 md:h-24 bg-white shadow-md flex flex-col z-50'
    }>
        <div className='h-fit w-full flex flex-col md:flex-row py-4 gap-4 md:items-center'>
            <div className='h-fit w-full flex justify-between items-center'>
                <div className='flex gap-4'>
                    <Link to={'/'} className='h-20 w-fit'>
                        <img src={logo} alt='' className='h-20 w-fit object-contain' />
                    </Link>
                    <div className='lg:flex items-center gap-4 hidden'>
                    
                       
                    </div> 
                </div>
                <div className='w-fit md:hidden flex gap-2'>
                    <Link to={'/cart'}>
                        <Badge content="5" className='text-xs' color="primary" size='md' variant="shadow">
                            <Button className="text-base md:hidden bg-[#54C1C4] text-black pointer-events-none flex-shrink-0" isIconOnly startContent={
                                <PiShoppingCartSimpleBold className='text-black'/>
                            }>
                            </Button>
                        </Badge>
                    </Link>
                    {/* <Button className="text-base md:hidden bg-[#54C1C4] text-black pointer-events-none flex-shrink-0" isIconOnly startContent={
                        <HiOutlineUser className='text-black'/>
                    }>
                    </Button> */}

                    <Popover placement="bottom-start" backdrop='blur'>
                        <PopoverTrigger>
                            <NavbarItem>
                                <Button className="text-base md:hidden bg-[#54C1C4] text-black pointer-events-none flex-shrink-0" isIconOnly startContent={
                                    <HiMenuAlt3 className='text-black'/>
                                }>
                                </Button>
                            </NavbarItem>
                        </PopoverTrigger>
                        <PopoverContent className=''>
                            <div className="px-1 py-2">
                            <div className="text-small font-bold">Popover Content</div>
                            <div className="text-tiny">This is the popover content</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                     
                </div>
            </div>
            <div className='h-fit w-full flex gap-2'>
                
                <div className='h-fit w-full relative'>
                 
                    <div className={
                        search != ''?
                        'absolute w-full bg-gray-50 h-fit top-14 rounded-[16px] flex flex-col p-4 gap-4':
                        'absolute w-full bg-gray-50 h-fit top-14 rounded-[16px] hidden flex-col p-4 gap-4'
                    }>
                      
                        
                    </div>
                </div>

                <div className='w-fit hidden md:flex gap-2 relative z-50'>
                    <Dropdown >
                        <DropdownTrigger>
                            <NavbarItem>
                                <Badge content={
                                    <CountUp end={cartItems.length} />
                                } className='text-xs cursor-pointer' color="primary" size='md' variant="shadow">
                                    <Button size='md' className="text-base text-black bg-[#54C1C4] pointer-events-none cursor-pointer flex-shrink-0" isIconOnly startContent={
                                        <PiShoppingCartSimpleBold className='text-black'/>
                                    }>
                                    </Button>
                                </Badge>
                            </NavbarItem>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description" className='flex flex-col gap-2 py-1 rounded-[24px]'>
                            {
                                cartItems?
                                cartItems.map(i=>(
                                    <DropdownItem className='border-none rounded-[8px] py-2'>
                                        <div className='h-fit flex gap-4 justify-between '>
                                           <div className='h-16 w-16 bg-gray-200 rounded-[4px]'>
                                                <div className='h-16 w-16 bg-gray-200 rounded-[4px] overflow-hidden'>
                                                    <img src={i.image?i.image.image:''} alt='' className='h-full w-full' />
                                                </div>
                                            </div>
                                            <div className='min-w-full flex flex-col gap-2 '>
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex flex-col gap-0'>
                                                        <p className='font-semibold text-sm break-words'>{i.name}</p>
                                                        
                                                        
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className='h-fit w-full flex items-center justify-between'>
                                            <ButtonGroup size='sm'>
                                                <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiMinus/></Button>
                                                <Button isIconOnly disabled className='bg-transparent h-6 w-4 text-xs'>{i.qty}</Button>
                                                <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiPlus/></Button>
                                            </ButtonGroup>
                                            <Button onClick={()=>removeFromCartHandler(i.product)} isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiTrash2/></Button>
                                        </div>
                                    </DropdownItem>
                                ))
                                :
                                ''
                            }

                            {
                                cartItems.length==0?
                                <DropdownItem className='border-none'>
                                    <Link to={'/cart'} className='flex items-center justify-between gap-4 w-[250px] p-2 border-y-[1px] border-gray-200'>
                                        <p>No items</p>
                                        <MdArrowRightAlt/>
                                    </Link>
                                </DropdownItem>:
                                <DropdownItem className='border-none'>
                                    <Link to={'/cart'} className='flex items-center justify-between gap-4 w-[250px] p-2 border-y-[1px] border-gray-200'>
                                        <p>Show all</p>
                                        <MdArrowRightAlt/>
                                    </Link>
                                </DropdownItem>
                            }

                            {
                                cartItems.length ==0?
                                <DropdownItem className='border-none mb-1'>
                                    <div className='w-full '>
                                        <p className='text-lg font-bold '>Your cart is empty</p>
                                        <p className='text-xs text-black opacity-50 font-medium'>Shop products</p>
                                    </div>
                                    
                                </DropdownItem>:
                                <DropdownItem  className='border-none mb-1'>
                                 
                                </DropdownItem>
                            }

{
                                cartItems.length ==0?
                                '':
                                <DropdownItem className='p-0 rounded-[14px] border-none'>
                                    <Link to={'/cart/checkout'} className='w-full'>
                                        <Button className='w-full bg-[#54C1C4]'>
                                            <p className='font-medium text-black'>Checkout</p>
                                        </Button>
                                    </Link>
                                </DropdownItem>
                            }
                            
                        </DropdownMenu>
                    </Dropdown>
                    
                    <NavbarItem>
                        {
                            userInfo?
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button size='md' className="text-base text-black bg-[#54C1C4] flex-shrink-0" isIconOnly startContent={
                                        <HiOutlineUser className='text-black'/>
                                    }>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions">
                                   
                                    <DropdownItem onClick={() => dispatch(logout())} key={'logout'}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                                
                            </Dropdown>:
                            <Link to={'/login'}>
                                <Button size='md' className="text-base text-black bg-[#54C1C4] flex-shrink-0" isIconOnly startContent={
                                    <HiOutlineUser className='text-black'/>
                                }>
                                </Button>
                            </Link>
                        }
                    </NavbarItem>
                </div>
            </div>
        </div>
    </Navbar>
  )
}

export default Header


// <Navbar className='py-4'>
//         <NavbarBrand>
//             <img src={logobw} alt='' className='h-12'></img>
//         </NavbarBrand>
//         <NavbarContent>
//             <NavbarItem className='border-b-2 border-rose-600 hover:border-rose-500 duration-200'>
//                 <Link color="foreground" href="#" className='text-sm text-black'>
//                     Home
//                 </Link>
//             </NavbarItem>
//             <NavbarItem>
//                 <Link color="foreground" href="#" className='text-sm text-black'>
//                     Cart
//                 </Link>
//             </NavbarItem>
//         </NavbarContent>
//     </Navbar>