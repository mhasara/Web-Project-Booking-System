import React, { useEffect } from 'react'
import Container from '../componets/Container'
import { CiLocationArrow1, CiSquareMinus, CiSquarePlus, CiTrash } from "react-icons/ci";
import { BreadcrumbItem, Breadcrumbs, Button, ButtonGroup, Checkbox, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

const CartScreen = () => {

  const history = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { loading, error, cartItems } = cart 

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className='w-full'>
      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6'>
          <Breadcrumbs className='py-4'>
            <BreadcrumbItem className='font-medium'>Cart</BreadcrumbItem>
          </Breadcrumbs>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='w-full flex flex-col'>
              <div className='flex md:hidden flex-col divide-y-1 border-b-1 '>
                <Table removeWrapper className='w-full overflow-hidden'>
                  <TableHeader className='max-w-full'>
                    <TableColumn className='max-w-fit '>
                      <Button variant='light' radius='none' className='w-full md:w-fit px-0 flex items-center md:justify-start gap-2 justify-start py-1 font-bold text-xs border-y-1 md:border-0 text-left'>
                        <p className='hidden md:flex'>Continue shopping</p>
                        <p className='md:hidden'>Continue </p>
                      </Button>
                    </TableColumn>
                    <TableColumn className='max-w-fit '>
                      <p className='text-xs font-semibold flex items-center'>
                        Product
                      </p>
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                    <TableCell>
                      <div className='h-16 md:h-24 w-16 md:w-24  lg:w-40 flex flex-col gap-4'>
                        <div className='h-16 md:h-24 w-16 md:w-24 rounded-[8px] bg-black'>
                          <div className='h-16 md:h-24 w-16 md:w-24 rounded-[8px] bg-black'>

                          </div>
                        </div>
                        <Checkbox defaultSelected></Checkbox>
                        
                      </div>
                    </TableCell>
                    <TableCell className='max-w-full' >
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-start justify-between gap-2 text-sm font-semibold'>
                          <p className='text-sm'>LCY | Two Toned Diagonal Jacquard Polo Shirt </p>
                        </div>
                        <div className='text-xs text-gray-500'>
                          M / ICE BLUE
                        </div>
                        <div className='font-semibold text-base text-gray-500 py-2'>
                          Rs 3,900.00
                        </div>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <ButtonGroup size='md' >
                            <Button isIconOnly className='bg-gray-100 text-xs'><FiMinus/></Button>
                            <Button isIconOnly disabled className='bg-transparent text-xs'>1</Button>
                            <Button isIconOnly className='bg-gray-100 text-xs'><FiPlus/></Button>
                        </ButtonGroup>
                        <Button isIconOnly startContent={
                            <CiTrash/>
                          } className='w-fit bg-[#54C1C4]'>
                          </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className='hidden md:flex flex-col divide-y-1 border-b-1 '>
                <Table removeWrapper className='w-full overflow-hidden'>
                  <TableHeader className='max-w-full'>
                    <TableColumn className='max-w-fit '>
                      <Button variant='light' radius='none' className='w-full md:w-fit px-0 flex items-center md:justify-start gap-2 justify-start py-1 font-bold text-xs border-y-1 md:border-0 text-left'>
                        <p className='hidden md:flex'>Continue shopping</p>
                        <p className='md:hidden'>Continue </p>
                      </Button>
                    </TableColumn>
                    <TableColumn className='max-w-fit '>
                      <p className='text-xs font-semibold flex items-center'>
                        Product
                      </p>
                    </TableColumn>
                    <TableColumn >
                      <p className='text-xs font-semibold flex items-center'>
                        Count
                      </p>
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
              
                    {
                      // loading?
                      // <TableRow key="1">
                      //   <TableCell>
                      //     <div className='h-16 md:h-24 w-16 md:w-24  lg:w-40 flex items-center'>
                      //       <Checkbox defaultSelected></Checkbox>
                      //       <Skeleton className='w-fit rounded-[8px]'>
                      //         <div className='h-16 md:h-24 w-16 md:w-24 rounded-[8px] bg-black'>

                      //         </div>
                      //       </Skeleton>
                      //     </div>
                      //   </TableCell>
                      //   <TableCell className='max-w-full' >
                      //     <div className='flex flex-col gap-1'>
                      //       <div className='flex items-start justify-between gap-2 text-sm font-semibold'>
                      //         <Skeleton className='w-fit rounded-[6px]'>
                      //           <p className='text-sm'>LCY | Two Toned Diagonal Jacquard Polo Shirt </p>
                      //         </Skeleton>
                      //       </div>
                      //       <Skeleton className='w-fit rounded-[6px]'>
                      //         <div className='text-xs text-gray-500'>
                      //           M M / ICE BLUE ICE BLUE / ICE BLUE
                      //         </div>
                      //       </Skeleton>
                      //       <Skeleton className='w-fit rounded-[6px]'>
                      //         <div className='font-semibold text-base text-gray-500 py-2'>
                      //           Rs 663,900.00
                      //         </div>
                      //       </Skeleton>
                      //     </div>
                      //   </TableCell>
                      //   <TableCell >
                      //     <div className='w-full flex flex-col justify-start gap-4'>
                      //       <Skeleton className='rounded-[12px]'>
                      //         <ButtonGroup size='md' className='mr-auto' >
                      //             <Button isIconOnly className='bg-gray-100 text-xs'><FiMinus/></Button>
                      //             <Button isIconOnly disabled className='bg-transparent text-xs'>1</Button>
                      //             <Button isIconOnly className='bg-gray-100 text-xs'><FiPlus/></Button>
                      //         </ButtonGroup>
                      //       </Skeleton>
                      //       <Skeleton className='w-fit rounded-[12px]'>
                      //         <Button isIconOnly startContent={
                      //           <CiTrash/>
                      //         } className='w-fit bg-[#54C1C4]'>
                      //         </Button>
                      //       </Skeleton>
                      //     </div>
                          
                      //   </TableCell>
                      // </TableRow>:
                      cartItems!=0?
                      cartItems.map(i =>(
                        <TableRow key={i.product}>
                          <TableCell>
                            <div className='h-16 md:h-24 w-16 md:w-24  lg:w-40 flex items-center'>
                              <Checkbox defaultSelected></Checkbox>
                              <div className='h-16 md:h-24 w-16 md:w-24 rounded-[8px] bg-black'>

                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='max-w-full' >
                            <div className='flex flex-col gap-1'>
                              <div className='flex items-start justify-between gap-2 text-sm font-semibold'>
                                <p className='text-sm'>{i.name} </p>
                              </div>
                              <div className='text-xs text-gray-500'>
                              {
                                  i.variant?
                                  <p className='opacity-50 text-xs break-words'>{i.variant.variant1? i.variant.variant1.name: ''} / {i.variant.variant2? i.variant.variant2.name:''} / {i.variant.variant3 ?i.variant.variant3.name:''}</p>:
                                  ''    
                              }
                              </div>
                              <div className='font-semibold text-base text-gray-500 py-2'>
                                Rs {i.variant.price? i.variant.price:''}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell >
                            <div className='w-full flex flex-col justify-start gap-4'>
                              <ButtonGroup size='md' className='mr-auto' >
                                  <Button isIconOnly className='bg-gray-100 text-xs'><FiMinus/></Button>
                                  <Button isIconOnly disabled className='bg-transparent text-xs'>1</Button>
                                  <Button isIconOnly className='bg-gray-100 text-xs'><FiPlus/></Button>
                              </ButtonGroup>
                              <Button onClick={()=>removeFromCartHandler(i.product)} isIconOnly startContent={
                                  <CiTrash/>
                                } className='w-fit bg-[#54C1C4]'>
                                </Button>
                            </div>
                            
                          </TableCell>
                        </TableRow>
                      ))
                      :
                      ''
                    }
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className='w-full md:max-w-[300px] flex flex-col gap-6'>
              <div className='flex flex-col '>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Subtotal</p>
                  <p className='font-semibold text-xl '>Rs {cartItems.reduce((acc, item) => acc + item.qty * item.variant.price, 0).toFixed(2)} ({cartItems.reduce((acc, item) => acc + item.qty, 0)})items</p>
                </div>
                <p className='text-xs text-gray-600'>Shipping & taxes calculated at checkout</p>
              </div>
              <Link to={'/cart/checkout'} className='min-w-full'>
                  <Button className='w-full bg-[#54C1C4]'>
                      <p className='font-medium'>Checkout</p>
                  </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartScreen