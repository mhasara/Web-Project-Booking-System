import React, { useEffect, useState } from 'react'
import Container from '../componets/Container'
import { Button, ButtonGroup, Chip, Skeleton, Spinner, Tab, Tabs } from '@nextui-org/react'
import { MdArrowRightAlt } from 'react-icons/md'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
import { FiPlus, FiMinus  } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from 'react-icons/io';
import { CiDeliveryTruck, CiHome } from 'react-icons/ci';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import parse from 'html-react-parser';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { getProductVariantPrice, listProductDetails, listProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = () => {
  const {pName} = useParams()

  const dispatch = useDispatch()
  const history = useNavigate()
  const location = useLocation()

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [sPrice, setSPrice] = useState(0)
  const [ePrice, setEPrice] = useState(0)

  const [variant1, setVariant1] = useState('v1');
  const [variant2, setVariant2] = useState('v2');
  const [variant3, setVariant3] = useState('v3');

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productVariantCominationPrice = useSelector(state => state.productVariantCominationPrice)
  const { loading:productVariantCominationPriceLoading, error:productVariantCominationPriceError, variantComination } = productVariantCominationPrice

  useEffect(() => {
    if(pName){
      dispatch(listProductDetails(pName))
    }
  }, [pName])
  
  useEffect(() => {
    if(pName){
      dispatch(getProductVariantPrice(pName, variant1, variant2, variant3))
    }
  }, [pName, variant1,variant2, variant3])

  useEffect(() => {
    if((variantComination)){
      if(variantComination.length >= 1){
        setEPrice(variantComination[0].price)
      } else{
        setEPrice(variantComination.price)
      }
    }
  }, [variantComination])

  useEffect(() => {
    if (ePrice) {
      const timer = setTimeout(() => {
        setSPrice(ePrice);
      }, 1000); // Delay of 1 seconds (1000 milliseconds)
  
      // Cleanup the timer if the component unmounts or if ePrice changes before the timer completes
      return () => clearTimeout(timer);
    }
  }, [ePrice]);
  
  const addToCartHandler = () =>{
    if(product,qty){
      dispatch(addToCart(product.slug, qty))
    }
  }

  const productList = useSelector(state => state.productList)
  const { loading: productListLoading, error:productListError, products } = productList 
  
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 5);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 10);

  const startDay = startDate.getDate();
  const startMonthName = startDate.toLocaleString('default', { month: 'long' });

  const endDay = endDate.getDate();
  const endMonthName = endDate.toLocaleString('default', { month: 'long' });
  return (
    <div className='h-fit w-full flex flex-col gap-8'>
      {
        loading?
        <section className='h-fit w-full'>
          <div className='h-fit w-full max-w-[1100px] mx-auto px-6 flex flex-col gap-2 py-2'>
            <Skeleton className='rounded-[6px] max-w-[300px]'>
              <Breadcrumbs className='py-4'>
                  <BreadcrumbItem className='font-medium'>Shop</BreadcrumbItem>
                  <BreadcrumbItem className='font-medium'>Category</BreadcrumbItem>
                  <BreadcrumbItem className='font-medium'>Product</BreadcrumbItem>
              </Breadcrumbs>
            </Skeleton>
            <div className='h-fit w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start'>
              <div className='flex flex-col gap-4 lg:gap-2 lg:col-span-5'>
                <div className='h-[350px] w-full bg-white  overflow-hidden '>
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper}}
                    modules={[FreeMode, Thumbs]}
                    className=''
                  >
                    <SwiperSlide className='overflow-hidden'>
                      <Skeleton className='rounded-[6px]'>
                        <img src={"https://swiperjs.com/demos/images/nature-2.jpg"} className='h-[350px] w-full object-cover  ' />
                      </Skeleton>
                    </SwiperSlide>
                    <SwiperSlide className='overflow-hidden'>
                      <Skeleton className='rounded-[6px]'>
                        <img src={"https://swiperjs.com/demos/images/nature-3.jpg"} className='h-[350px] w-full object-cover  ' />
                      </Skeleton>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                    </SwiperSlide> */}
                  </Swiper>
                  
                </div>
                <div className='w-full flex items-center gap-4 h-[65px]'>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10} 
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full"
                  >
  
                    <SwiperSlide className='h-[65px] w-[65px] rounded-[8px] overflow-hidden border-[1px]'>
                      <Skeleton className='rounded-[6px]'>
                        <img src={"https://swiperjs.com/demos/images/nature-1.jpg"} className='h-[65px] w-[65px] object-cover mx-auto scale-95' />
                      </Skeleton>
                    </SwiperSlide>
                    <SwiperSlide className='h-[65px] w-[65px] rounded-[8px] overflow-hidden border-[1px]'>
                     <Skeleton className='rounded-[6px]'>
                      <img src={"https://swiperjs.com/demos/images/nature-2.jpg"} className='h-[65px] w-[65px] object-cover mx-auto scale-95' />
                     </Skeleton>
                    </SwiperSlide>
                    {/* <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className='gap-4 lg:gap-8 lg:col-span-7 grid grid-cols-1 lg:grid-cols-11'>
                <div className='flex flex-col gap-2 lg:col-span-6'>
                  <div className='flex flex-col gap-3 '>
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'> 
                        <p className='text-lg font-bold'>product.name</p>
                      </Skeleton>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-sm opacity-50'>product.description</p>
                      </Skeleton> 
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Skeleton className='rounded-[6px]'>
                        <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'>
                          <div className='flex gap-1'>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStarHalfStroke className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                          </div>
                        </Chip>
                      </Skeleton>
                      <Skeleton className='rounded-[6px]'>
                        <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'><p className='font-medium text-[#54C1C4]'>Brand name</p></Chip>
                      </Skeleton>
                      <Skeleton className='rounded-[6px]'>
                        <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'>
                          <div className='flex items-center gap-1'>
                            <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                            <p className='text-green-600'>In Stock</p>
                          </div>                    
                        </Chip>
                      </Skeleton>
                    </div>
                  </div> 

                  <div className='h-[1px] w-full bg-gray-100'></div>

                  <div className='flex justify-between items-center py-2'>
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='rounded-[6px]'>
                        <p className='text-2xl font-bold'>Rs 1954.00</p> 
                      </Skeleton>
                      <Skeleton className='rounded-[6px]'> 
                        <s className='text-xs font-medium opacity-50'>Rs 4,999.00</s>
                      </Skeleton>
                    </div>
                    <ButtonGroup size='sm'>
                      <Button isIconOnly className='bg-gray-100'><FiMinus/></Button>
                      <Button isIconOnly disabled className='bg-white'>1</Button>
                      <Button isIconOnly className='bg-gray-100'><FiPlus/></Button>
                    </ButtonGroup>
                  </div>

                  <div className='h-[1px] w-full bg-gray-100'></div>

                  <div className='h-fit flex flex-wrap gap-4 py-2'>
                    {
                      loading?
                      '':
                      product.variants?
                      _.uniqBy(product.variants, 'variant_type._id').map(i =>(
                        <div className='gap-1 flex flex-col rounded-[16px]'>
                          <p className='font-semibold text-xs opacity-50'>{i.variant_type.name}</p>
                          <div className=''>
                            <Tabs aria-label="Options"
                              classNames={{
                                tabList: "gap-4 w-full relative rounded-none px-0 bg-gray-100 rounded-full p-2",
                                cursor: "w-full flex items-center justify-center border-[4px] border-[#54C1C4] rounded-full",
                                tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                                tabContent: "group-data-[selected=true]:text-black"
                              }}
                            >
                              {
                                product.variants.filter(f => f.variant_type._id==i.variant_type._id).map(i2=>(
                                  <Tab key={i2._id} title={
                                    <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'> 
                                      <p className='font-semibold text-xs text-black'>{i2.name}</p>
                                    </div> 
                                  }>
                                  </Tab>
                                ))
                              }
                              
                            </Tabs>
                          </div>
                        </div>
                      )):
                      ''
                    }
                    

                      {/* <div className='gap-1 flex flex-col rounded-[16px]'>
                        <p className='font-semibold text-xs opacity-50'>size</p>
                        <div className=''>
                          <Tabs aria-label="Options"
                            classNames={{
                              tabList: "gap-4 w-full relative rounded-none px-0 bg-gray-100 rounded-full p-2",
                              cursor: "w-full border-[4px] border-[#54C1C4] rounded-full",
                              tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                              tabContent: "group-data-[selected=true]:text-black"
                            }}
                          >
                            <Tab key="blue" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-black'>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="black" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-blue-500'>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="gray" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-gray-500'>
                              </div> 
                            }>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>

                      <div className='gap-1 flex flex-col rounded-[16px]'>
                        <p className='font-semibold text-xs opacity-50'>Size</p>
                        <div className=''>
                          <Tabs aria-label="Options"
                            classNames={{
                              tabList: "gap-4 w-full relative rounded-none px-0 bg-gray-100 rounded-full p-2",
                              cursor: "w-full flex items-center justify-center border-[4px] border-[#54C1C4] rounded-full",
                              tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                              tabContent: "group-data-[selected=true]:text-black"
                            }}
                          >
                            <Tab key="10" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>10kg</p>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="15" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>15kg</p>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="20" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>20kg</p>
                              </div> 
                            }>
                            </Tab>
                          </Tabs>
                        </div>
                      </div> */}
                  </div>

                  <div className='h-[1px] w-full bg-gray-100'></div>
                  <div className='flex flex-col gap-4 '>
                    {/* <div className='flex justify-between items-start py-2'>
                      <div className='flex flex-col'>
                        <p className='text-2xl font-bold'>Rs 2,999.00</p>
                        <s className='text-xs font-medium opacity-50'>Rs 4,999.00</s>
                      </div>
                      <ButtonGroup size='sm'>
                        <Button isIconOnly className='bg-gray-100'><FiMinus/></Button>
                        <Button isIconOnly disabled className='bg-white'>1</Button>
                        <Button isIconOnly className='bg-gray-100'><FiPlus/></Button>
                      </ButtonGroup>
                    </div> */}
                    {/* <div className='flex flex-col-reverse  gap-2'>
                      <div className='h-fit w-fit max-w-[150px] bg-orange-600 rounded-bl-[16px] p-4 text-black flex justify-center'>
                        <div className='w-fit '>
                            <p className='w-fit text-xs font-semibold '>Min. Spend Rs. 499 Capped at Rs. 200</p>
                        </div>
                      </div>
                    </div> */}

                    <div className='flex items-center gap-2'>
                      
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2 lg:col-span-5'>
                  {/* <div className='h-[1px] w-full bg-gray-100'></div> */}
                  <div className='bg-gray-100 p-4 rounded-[16px] flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <p className='text-black font-semibold text-sm'>Delivery</p>
                        <div className='flex flex-col'>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-2'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <CiDeliveryTruck className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>Standerd Delivery</p>
                                  <p className='text-xs opacity-50'>July 30</p>
                                </div>
                              </div>
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-2'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <IoLocationOutline className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>Delivery to</p>
                                  <p className='text-xs opacity-50'>Western, Colombo 1-15, Colombo 01 - Fort</p>
                                </div>
                              </div>
                              
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-black font-bold text-sm'>Services</p>
                        <div className='flex flex-col'>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-2'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <CiHome className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>14 Days free and easy return</p>
                                  <p className='text-xs opacity-50'>Change of mind is not applicable</p>
                                </div>
                              </div>
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div> 
                  <div className='flex flex-col gap-4 '>
                    <Button className='bg-[#54C1C4] font-medium'>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        :
        product?
        <section className='h-fit w-full'>
          <div className='h-fit w-full max-w-[1100px] mx-auto px-6 flex flex-col gap-2 py-2'>
            <Breadcrumbs className='py-4'>
              <BreadcrumbItem className='font-medium'>Shop</BreadcrumbItem>
              <BreadcrumbItem className='font-medium'>Category</BreadcrumbItem>
              <BreadcrumbItem className='font-medium'>Product</BreadcrumbItem>
            </Breadcrumbs>
            <div className='h-fit w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start'>
              <div className='flex flex-col gap-4 lg:gap-2 lg:col-span-5'>
                <div className='h-[350px] w-full bg-white  overflow-hidden border-[1px]'>
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper}}
                    modules={[FreeMode, Thumbs]}
                    className=''
                  >
                    {
                      product.images?
                      product.images.map(i=>(
                        <SwiperSlide key={i._id} className='overflow-hidden'>
                          <img src={i.image} className='h-[350px] w-full object-cover  ' />
                        </SwiperSlide>
                      )):
                      ''
                    }
                    {/* <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                    </SwiperSlide> */}
                  </Swiper> 
                </div>
                <div className='w-full flex items-center gap-4 h-[65px]'>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10} 
                    slidesPerView={6}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full"
                  >
  
                    {
                      product.images? 
                      product.images.map(i=>( 
                        <SwiperSlide key={i._id} className='h-[65px] w-[65px] rounded-[8px] overflow-hidden border-[1px]'>
                          <img src={i.image} className='h-[65px] w-[65px] object-cover mx-auto scale-95' />
                        </SwiperSlide>
                      )):
                      ''
                    }
                    {/* <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className='rounded-[8px] overflow-hidden h-8'>
                      <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className='gap-4 lg:gap-8 lg:col-span-7 grid grid-cols-1 lg:grid-cols-11'>
                <div className='flex flex-col gap-2 lg:col-span-6'>
                  <div className='flex flex-col gap-3 '>
                    <div className='min-h-fit max-w-full flex flex-col gap-1 overflow-hidden'>
                      <p className='text-lg font-bold'>{product.name}</p>
                      <p className='text-sm opacity-50'>{product.description?parse(product.description):''}</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'>
                        <div className='flex gap-1'>
                          <FaStar className='text-yellow-400'/>
                          <FaStar className='text-yellow-400'/>
                          <FaStar className='text-yellow-400'/>
                          <FaRegStarHalfStroke className='text-yellow-400'/>
                          <FaRegStar className='text-yellow-400'/>
                        </div>
                      </Chip>
                      <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'><p className='font-medium text-[#54C1C4]'>{product.category ? product.category.name: 'category'}</p></Chip>
                      <Chip variant='solid' size='sm' className='bg-[#54C1C4] bg-opacity-15 px-2 py-4 flex flex-row items-center gap-1'>
                        {
                          product.countInStock==0?
                          <div className='flex items-center gap-1'>
                            <div className='h-2 w-2 bg-red-600 rounded-full'></div>
                            <p className='text-red-600'>Out of Stock</p>
                          </div>:
                          <div className='flex items-center gap-1'>
                            <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                            <p className='text-green-600'>In Stock</p>
                          </div>
                        }                    
                      </Chip>
                    </div>
                  </div> 

                  <div className='h-[1px] w-full bg-gray-100'></div>

                  <div className='flex justify-between items-center py-2'>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center gap-1'>
                        <p className='text-2xl font-bold'>Rs {product.discount_price}</p>
                       
                      </div>
                      <s className='text-xs font-medium opacity-50'>Rs {product.price}</s>
                    </div>
                    <ButtonGroup size='sm'>
                      <Button onClick={() => setQty(qty-1) } isIconOnly disabled={qty ==1? true: false} className='bg-gray-100'><FiMinus/></Button> 
                      <Button isIconOnly disabled className='bg-white'>{qty}</Button>
                      <Button onClick={() => setQty(qty+1) } isIconOnly disabled={product.countInStock == qty || product.countInStock==0? true: false} className='bg-gray-100'><FiPlus/></Button>
                    </ButtonGroup>
                  </div>

                  <div className='h-[1px] w-full bg-gray-100'></div>

                  <div className='h-fit flex flex-wrap gap-4 py-2'>
                    {
                      loading?
                      '':
                      product.variants?
                      _.uniqBy(product.variants, 'variant_type._id').map((i,index) =>(
                        <div className='gap-1 flex flex-col rounded-[16px]'>
                          <p className='font-semibold text-xs opacity-50'>{i.variant_type.name}</p>
                          <div className=''>
                            {
                              i.variant_type.slug=='color'?
                              <Tabs aria-label="Options"
                                classNames={{
                                  tabList: "gap-4 w-full relative rounded-none px-0 bg-white",
                                  cursor: "w-full flex items-center justify-center border-[4px] border-[#54C1C4]",
                                  tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                                  tabContent: "group-data-[selected=true]:text-black"
                                }}
                                selectedKey={
                                  index==0?
                                  variant1:
                                  index==1?
                                  variant2:
                                  index==2?
                                  variant3:
                                  ''
                                }
                                onSelectionChange={
                                  index==0?
                                  setVariant1:
                                  index==1?
                                  setVariant2:
                                  index==2?
                                  setVariant3:
                                  ''
                                }
                              >
                                {
                                  product.variants.filter(f => f.variant_type._id==i.variant_type._id).map(i2=>(
                                    <Tab key={i2.slug} title={
                                      <div className={`h-10 lg:h-8 w-10 lg:w-8 rounded-[4px] border-[1px] border-white`} style={{ backgroundColor: i2.color_code }}>
                                      </div> 
                                    }>
                                    </Tab>
                                  ))
                                }
                                
                              </Tabs>:
                              <Tabs aria-label="Options"
                                classNames={{
                                  tabList: "gap-4 w-full relative rounded-none px-0 bg-white",
                                  cursor: "w-full flex items-center justify-center border-[4px] border-[#54C1C4]",
                                  tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                                  tabContent: "group-data-[selected=true]:text-black"
                                }}
                                selectedKey={
                                  index==0?
                                  variant1:
                                  index==1?
                                  variant2:
                                  index==2?
                                  variant3:
                                  ''
                                }
                                onSelectionChange={
                                  index==0?
                                  setVariant1:
                                  index==1?
                                  setVariant2:
                                  index==2?
                                  setVariant3:
                                  ''
                                }
                              >
                                {
                                  product.variants.filter(f => f.variant_type._id==i.variant_type._id).map(i2=>(
                                    <Tab key={i2.slug} title={
                                      <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'> 
                                        <p className='font-semibold text-xs text-black'>{i2.name}</p>
                                      </div> 
                                    }>
                                    </Tab>
                                  ))
                                }
                                
                              </Tabs>
                            }
                          </div>
                        </div>
                      )):
                      ''
                    }
                    

                      {/* <div className='gap-1 flex flex-col rounded-[16px]'>
                        <p className='font-semibold text-xs opacity-50'>size</p>
                        <div className=''>
                          <Tabs aria-label="Options"
                            classNames={{
                              tabList: "gap-4 w-full relative rounded-none px-0 bg-gray-100 rounded-full p-2",
                              cursor: "w-full border-[4px] border-[#54C1C4] rounded-full",
                              tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                              tabContent: "group-data-[selected=true]:text-black"
                            }}
                          >
                            <Tab key="blue" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-black'>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="black" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-blue-500'>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="gray" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 border-[2px] border-white rounded-full bg-gray-500'>
                              </div> 
                            }>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>

                      <div className='gap-1 flex flex-col rounded-[16px]'>
                        <p className='font-semibold text-xs opacity-50'>Size</p>
                        <div className=''>
                          <Tabs aria-label="Options"
                            classNames={{
                              tabList: "gap-4 w-full relative rounded-none px-0 bg-gray-100 rounded-full p-2",
                              cursor: "w-full flex items-center justify-center border-[4px] border-[#54C1C4] rounded-full",
                              tab: "max-w-fit px-0 h-12 lg:h-10 min-w-12 lg:min-w-10 flex items-center justify-center",
                              tabContent: "group-data-[selected=true]:text-black"
                            }}
                          >
                            <Tab key="10" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>10kg</p>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="15" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>15kg</p>
                              </div> 
                            }>
                            </Tab>
                            <Tab key="20" title={
                              <div className='h-10 lg:h-8 w-10 lg:w-8 rounded-full flex items-center justify-center'>
                                <p className='font-semibold text-xs text-black'>20kg</p>
                              </div> 
                            }>
                            </Tab>
                          </Tabs>
                        </div>
                      </div> */}
                  </div>

                  <div className='h-[1px] w-full bg-gray-100'></div>
                  <div className='flex flex-col gap-4 '>
                    {/* <div className='flex justify-between items-start py-2'>
                      <div className='flex flex-col'>
                        <p className='text-2xl font-bold'>Rs 2,999.00</p>
                        <s className='text-xs font-medium opacity-50'>Rs 4,999.00</s>
                      </div>
                      <ButtonGroup size='sm'>
                        <Button isIconOnly className='bg-gray-100'><FiMinus/></Button>
                        <Button isIconOnly disabled className='bg-white'>1</Button>
                        <Button isIconOnly className='bg-gray-100'><FiPlus/></Button>
                      </ButtonGroup>
                    </div> */}
                    {/* <div className='flex flex-col-reverse  gap-2'>
                      <div className='h-fit w-fit max-w-[150px] bg-orange-600 rounded-bl-[16px] p-4 text-black flex justify-center'>
                        <div className='w-fit '>
                            <p className='w-fit text-xs font-semibold '>Min. Spend Rs. 499 Capped at Rs. 200</p>
                        </div>
                      </div>
                    </div> */}

                    <div className='flex items-center gap-2'>
                      
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2 lg:col-span-5'>
                  {/* <div className='h-[1px] w-full bg-gray-100'></div> */}
                  <div className='bg-gray-100 p-4 rounded-[16px] flex flex-col gap-4'>

                    <div className='flex flex-col gap-4'>
                        <p className='text-black font-semibold text-sm'>Delivery</p>
                        <div className='flex flex-col'>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-4'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <CiDeliveryTruck className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>Standerd Delivery</p> 
                                  <p className='text-xs opacity-50'>{`${startDay} ${startMonthName}`} - {`${endDay} ${endMonthName}`}</p>
                                </div>
                              </div>
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-4'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <IoLocationOutline className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>Delivery to</p>
                                  <p className='text-xs opacity-50'>Island wide Delivery</p>
                                </div>
                              </div>
                              
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                        </div>
                    </div>

                    {/* <div className='flex flex-col gap-2'>
                        <p className='text-black font-bold text-sm'>Services</p>
                        <div className='flex flex-col'>
                          <div className='flex gap-6 items-center justify-between border-t-[1px] border-gray-200 py-2'>
                              <div className='flex items-center gap-6'>
                                <div className='h-fit w-4'>
                                  <div className='h-fit w-4'>
                                      <CiHome className='text-xl'/>
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-xs text-black'>14 Days free and easy return</p>
                                  <p className='text-xs opacity-50'>Change of mind is not applicable</p>
                                </div>
                              </div>
                              <div className='w-4'>
                                <IoIosArrowForward className='text-xl opacity-25'/>
                              </div>
                          </div>
                        </div>
                    </div> */}
                  </div> 
                  <div className='flex flex-col gap-4 '>
                    <Button disabled={product.countInStock==0 ? true: false} onClick={addToCartHandler} className={product.countInStock==0 ? 'bg-[#54C1C4]  bg-opacity-50 text-opacity-25 font-medium':'bg-[#54C1C4] font-medium'}>
                      {product.countInStock==0 ? 'Out of Stock': 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>:
        ''
      }

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

export default ProductScreen