import React, { useEffect } from 'react'
import Container from '../componets/Container'
import {Button, Card, CardBody, CardFooter, Image, Skeleton} from "@nextui-org/react";
import { MdArrowRightAlt } from "react-icons/md";
import { FaRegStarHalfStroke, FaRegStar , FaStar} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import Marquee from "react-fast-marquee";
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import ice from '../assets/ice-bg.webp'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const location = useLocation()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList 
  
  useEffect(() => {
    dispatch(listProducts())
  }, [])
  

  return (
    <div className=' flex flex-col gap-6'>
      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-2 items-center'>
          <div className='flex flex-col gap-4 py-12 '>
            <p className='text-4xl font-black'>Indulge in Our Artisan Ice Cream Creations</p>
            <p className='text-sm opacity-50'>From classic flavors to modern innovations, our ice cream is crafted with love, premium ingredients, and creativity. Discover the joy of every scoop and treat yourself to the ultimate dessert experience.</p>
            <Button className='w-fit bg-[#54C1C4] text-black ' endContent={
              <MdArrowRightAlt/>
            }>
              Shop Now
            </Button>
          </div>
          <div className='h-[400px] w-full bg-gray-100 rounded-bl-[75px]  overflow-hidden'>
            <img src={ice} alt='' className='h-full w-full object-cover ' />
          </div>
        </div>
      </section>

      {/* <section className='h-fit w-full'>
        <div className='h-fit w-full items-center'>
          <div className='w-full flex flex-col gap-4 py-12 '>
            <Marquee className='flex items-center'>
              <div className='h-20 flex items-center'>
                <img src='https://static.vecteezy.com/system/resources/previews/014/018/566/non_2x/samsung-logo-on-transparent-background-free-vector.jpg' alt='' className='h-20 my-auto object-cover mx-8 opacity-25' />
              </div>
              <div className='h-20 flex items-center'>
                <img src='https://pngimg.com/uploads/apple_logo/apple_logo_PNG19688.png' alt='' className='h-20 my-auto object-cover mx-8 opacity-25' />
              </div>
              <div className='h-20 flex items-center'>
                <img src='https://pngimg.com/uploads/apple_logo/apple_logo_PNG19688.png' alt='' className='h-20 my-auto object-cover mx-8 opacity-25' />
              </div>
            </Marquee>
            
          </div>
        </div>
      </section> */}

      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6 flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <p className='text-4xl font-black'>Tranding</p>
              <Button className="text-base bg-[#54C1C4] text-black pointer-events-none flex-shrink-0" isIconOnly startContent={
                  <MdArrowRightAlt className='text-2xl'/>
                }>
              </Button>
            </div>
            {
              loading?
              <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 '>
                <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                  <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                    <Skeleton className='rounded-[4px]'>
                      <Link className='h-[150px]' to={'/shop/cat/product'}>
                        <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative '/>
                      </Link>
                    </Skeleton>
                    <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-10 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                        <PiShoppingCartSimpleBold className='text-xs'/>
                    }>
                    </Button>
                  </div>
                  <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                    

                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-sm font-semibold'>Product name </p>
                      </Skeleton>
                    </div>

  
                    <div className='flex flex-col'>
                      <div className='flex flex-wrap items-center'>
                        <Skeleton className='rounded-[6px]'>
                          <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                        </Skeleton>
                        {/* <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s> */}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                        </div>
                        <Skeleton className='rounded-[6px] opacity-0'>
                          <p className='text-sm opacity-50'>(3)</p>
                        </Skeleton>
                      </div>
                    </div>
                  </Link>
                </div>   
                <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                  <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                    <Skeleton className='rounded-[4px]'>
                      <Link className='h-[150px]' to={'/shop/cat/product'}>
                        <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative '/>
                      </Link>
                    </Skeleton>
                    <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-10 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                        <PiShoppingCartSimpleBold className='text-xs'/>
                    }>
                    </Button>
                  </div>
                  <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                    

                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-sm font-semibold'>Product name </p>
                      </Skeleton>
                    </div>

  
                    <div className='flex flex-col'>
                      <div className='flex flex-wrap items-center'>
                        <Skeleton className='rounded-[6px]'>
                          <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                        </Skeleton>
                        {/* <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s> */}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                        </div>
                        <Skeleton className='rounded-[6px] opacity-0'>
                          <p className='text-sm opacity-50'>(3)</p>
                        </Skeleton>
                      </div>
                    </div>
                  </Link>
                </div>   
                <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                  <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                    <Skeleton className='rounded-[4px]'>
                      <Link className='h-[150px]' to={'/shop/cat/product'}>
                        <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative '/>
                      </Link>
                    </Skeleton>
                    <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-10 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                        <PiShoppingCartSimpleBold className='text-xs'/>
                    }>
                    </Button>
                  </div>
                  <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                    

                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-sm font-semibold'>Product name </p>
                      </Skeleton>
                    </div>

  
                    <div className='flex flex-col'>
                      <div className='flex flex-wrap items-center'>
                        <Skeleton className='rounded-[6px]'>
                          <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                        </Skeleton>
                        {/* <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s> */}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                        </div>
                        <Skeleton className='rounded-[6px] opacity-0'>
                          <p className='text-sm opacity-50'>(3)</p>
                        </Skeleton>
                      </div>
                    </div>
                  </Link>
                </div>           
                <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                  <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                    <Skeleton className='rounded-[4px]'>
                      <Link className='h-[150px]' to={'/shop/cat/product'}>
                        <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative '/>
                      </Link>
                    </Skeleton>
                    <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-10 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                        <PiShoppingCartSimpleBold className='text-xs'/>
                    }>
                    </Button>
                  </div>
                  <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                    

                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-sm font-semibold'>Product name </p>
                      </Skeleton>
                    </div>

  
                    <div className='flex flex-col'>
                      <div className='flex flex-wrap items-center'>
                        <Skeleton className='rounded-[6px]'>
                          <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                        </Skeleton>
                        {/* <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s> */}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                          <Skeleton className='rounded-[6px]'>
                            <FaStar className='text-sm text-yellow-400'/>
                          </Skeleton>
                        </div>
                        <Skeleton className='rounded-[6px] opacity-0'>
                          <p className='text-sm opacity-50'>(3)</p>
                        </Skeleton>
                      </div>
                    </div>
                  </Link>
                </div>   
              </div>:
              products?
              <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 '>
                  {
                    products.map(i=>(
                      <div key={i._id} className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                        <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                          <Link to={`/shop/category/${i.slug}`} className='h-[150px]'>
                            <img src={
                              i.images[0].image 
                            } alt='' className='h-full w-full  rounded-[4px] object-cover hover:scale-105 duration-300 relative '/>
                          </Link>
                          <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-10 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                              <PiShoppingCartSimpleBold className='text-xs'/>
                          }>
                          </Button>
                        </div>
                        <Link to={`/shop/category/${i.slug}`} className='flex flex-col pt-3 gap-2'>
                          

                          <div className='flex flex-col gap-1'>
                            <p className='text-sm font-semibold'>{i.name}</p>
                          </div>

                
        
                          <div className='flex flex-col'>
                            <div className='flex flex-wrap items-center'>
                              <p className='text-lg font-semibold'>Rs {i.discount_price}</p> 
                              <s className='text-xs font-medium opacity-50 mt-1'>Rs {i.price}</s>
                            </div>
                            <div className='flex items-center gap-2'>
                              <div className='flex gap-1'>
                                <FaStar className='text-sm text-yellow-400'/>
                                <FaStar className='text-sm text-yellow-400'/>
                                <FaStar className='text-sm text-yellow-400'/>
                                <FaRegStarHalfStroke className='text-sm text-yellow-400'/>
                                <FaRegStar className='text-sm text-yellow-400'/>
                              </div>
                              <p className='text-sm opacity-50'>(3)</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  }           
              </div>:
              ''
            }
        </div>
      </section>


   
    </div>
  )
}

export default HomeScreen