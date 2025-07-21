import React, { useEffect, useState } from 'react'
import Container from '../componets/Container'
import { Button, ButtonGroup, Card, CardBody, Chip, DateInput, DatePicker, Input, Radio, RadioGroup, Select, SelectItem, Tab, Tabs } from '@nextui-org/react'
import { MdArrowRightAlt } from 'react-icons/md'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
import { FiPlus, FiMinus, FiTrash2  } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from 'react-icons/io';
import { CiDeliveryTruck, CiHome } from 'react-icons/ci';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { addShippingAddress, getAddressList } from '../actions/userActions';
import { saveShippingAddress } from '../actions/cartActions';
import _ from 'lodash';
import CountUp from 'react-countup';
import Alert from '../componets/Alert';
import { GiCancel } from 'react-icons/gi';


const CheckOutScreen = () => {

  const history = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [fName, setFName] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [town, setTown] = useState('')


  const [nCountry, setNCountry] = useState('')
  const [nProvince, setNProvince] = useState('')
  const [nDistrict, setNDistrict] = useState('')
  const [nTown, setNTown] = useState('')

  const [alert, setAlert] = useState(null)

  const [itemsPrice, setItemPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [taxPrice, setTaxPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [provinceList, setProvinceList] = useState('')
  const [districtList, setDistrictList] = useState('')
  const [townList, setTownList] = useState('')

  const [paymentMethod, setPaymentMethod] = useState('')

  const cart = useSelector(state => state.cart) 
  const { loading, error, cartItems } = cart 

  const orderCreate = useSelector(state => state.orderCreate)
  const { loading: orderLoading, error:orderError, success:orderSuccess, order  } = orderCreate 

  const shippingAddressList = useSelector(state => state.shippingAddressList)
  const { loading: shippingAddressListLoading, error: shippingAddressListError, addresses } = shippingAddressList 

  useEffect(() => {
    if (cartItems.length > 0) {
      
      dispatch({
        type: 'UPDATE_CART_PRICES',
        payload: {
          itemsPrice,
          shippingPrice, 
          taxPrice,
          totalPrice,
        },
      });
    }
  }, [cartItems, dispatch, nTown])

  

  useEffect(() => {
    if(cartItems.length==0){
      history('/')
    }
  }, [cartItems])
  
  

  const placeOrder = () => {
    window.scroll(0,0);
    if(fName != ''|| address != '' || number != '' || province != ''||town.currentKey){
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: paymentMethod,
        postal_code: town.currentKey,
      }))
    } else {
      setAlert('Please fill all the required filed')
      setTimeout(() => {
        setAlert(null); // or setAlert('') depending on your implementation
      }, 5000); 
    }
  }

  useEffect(() => {
    if(country){
      setNCountry(country.anchorKey)
    }
  }, [country])

  useEffect(() => {
    if(province){
      setNProvince(province.anchorKey)
    }
  }, [province])

  useEffect(() => {
    if(district){
      setNDistrict(district.anchorKey)
    }
  }, [district])

  useEffect(() => {
    if(town){
      setNTown(town.anchorKey)
    }
  }, [town])

  useEffect(() => {
    if(nTown!='' && addresses){
      setShippingPrice(addresses.find(f => f.postal_code==nTown))
    }
    if(cartItems){
      setItemPrice(cartItems.reduce((acc, item) => acc + Number(item.discount_price) * item.qty, 0).toFixed(2))
    }
  }, [nTown, cartItems])

  useEffect(() => {
    if(totalPrice==0){
      setTotalPrice(Number(itemsPrice))
    } else {
      setTotalPrice(Number(itemsPrice) + Number(shippingPrice.price))
    }
  }, [itemsPrice, shippingPrice])
  
  

  useEffect(() => {
    dispatch(saveShippingAddress({
      fName:fName,
      address:address,
      number:number, 
      province:nProvince,
      town:nTown,
      country:nCountry

    }))
  }, [fName, address, number, province,town,country])
  
  useEffect(() => {
    dispatch(getAddressList('sri-lanka', 'province', 'district', 'town')) 
  }, [dispatch])   
 
  useEffect(() => { 
    if (addresses) { 
      setProvinceList(_.uniqBy(addresses, 'district.province.slug'))
      setDistrictList(_.uniqBy(addresses, 'district.slug').filter(f=>f.district.province.slug == nProvince))
      setTownList(addresses.filter(f=>f.district.slug == nDistrict))
    }
  }, [addresses, nProvince, nDistrict ])  
  
  

  return (
    <div className='h-fit w-full flex flex-col gap-8'>
      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6'>
          <Breadcrumbs className='py-4'>
            <BreadcrumbItem className='font-medium'>Cart</BreadcrumbItem>
            <BreadcrumbItem className='font-medium'>Checkout</BreadcrumbItem>
          </Breadcrumbs> 
          <div className='h-fit w-full grid grid-cols-1 md:grid-cols-6 gap-8 items-start'>
            
            <div className='w-full flex flex-col gap-4 md:col-span-4 relative'>

              {
                alert?
                <Alert varient={'red'} titile={'Something went wrong'} content={alert}/>:
                ''
              }
              
              <div className='w-full flex flex-col gap-4 lg:gap-2 md:col-span-4 relative'>
                
                <Accordion variant="splitted" size="sm"  className='w-full p-0' >
                  <AccordionItem subtitle={
                    <div className='py-2'>
                      <p className='text-sm font-semibold'>{fName}</p>
                      <p className='text-sm font-semibold'>{number}</p>
                      <p className='text-sm '>N0 {address}, {province}, {district}</p> 
                    </div>
                  } className='w-full ' key="1" aria-label="Shipping Address" title={
                    <p className='text-lg font-bold text-[#54C1C4]' subtitle="Press to expand">Shipping Address</p>
                  }>
                    <div className='flex flex-col gap-4  pb-2 rounded-[16px]'>
                        <div className='flex flex-col gap-4'>
                          <p className='text-sm font-semibold'>Country</p>
                          <div className=''>
                            <Select 
                              label="Select Country" 
                              className="w-full md:w-1/2" 
                              size='sm'
                              selectedKeys={country}
                              onSelectionChange={setCountry}
                            >
                              <SelectItem key={1}>
                                Sri Lanka
                              </SelectItem>
                            </Select>
                          </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                          <p className='text-sm font-semibold'>Contact information
                          </p>
                          <div className='flex flex-col md:flex-row gap-4'>
                            <Input size='sm' type="text" label="Full Name" 
                            value={fName} 
                            onChange={(e) => setFName(e.target.value)}
                            description={
                              <p className=''>Please enter a contact name</p>
                            } />
                            <Input size='sm' type="number" label="Mobile Number" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)}
                            startContent={
                              <p className='text-sm'>+94</p>
                            } />
                          </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                          <p className='text-sm font-semibold'>Address</p>
                          <div className='flex flex-col md:flex-row gap-4'>
                            <Input size='sm' type="text" label="Address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                            description={
                              <p className=''>Please enter a contact Address</p>
                            } />
                            
                          </div>
                          <div className='flex flex-row gap-4'>
                            <Select 
                              label="Province" 
                              className="w-full md:max-w-xs" 
                              size='sm'
                              selectedKeys={province}
                              onSelectionChange={setProvince}
                            >
                              {
                                provinceList!=''?
                                provinceList.map(i=>(
                                  <SelectItem key={i.district.province.slug}>
                                    {i.district.province.name}
                                  </SelectItem>
                                )):
                                ''
                              }
                            </Select>
                            <Select 
                              label="Distric" 
                              className="w-full md:max-w-xs" 
                              size='sm'
                              selectedKeys={district}
                              onSelectionChange={setDistrict}
                            > 
                              {
                                districtList!=''?
                                districtList.map(i=>(
                                  <SelectItem key={i.district.slug}>
                                    {i.district.slug}
                                  </SelectItem>
                                )):
                                ''
                              }
                            </Select>
                            <Select 
                              label="Town" 
                              className="w-full md:max-w-xs" 
                              size='sm'
                              selectedKeys={town}
                              onSelectionChange={setTown}
                            >
                              {
                                townList?
                                townList.map(i=>(
                                  <SelectItem key={i.postal_code}>
                                    {`${i.name}(${i.postal_code})`}
                                  </SelectItem> 
                                )):
                                ''
                              }
                            </Select>
                          </div>
                        </div>
                    </div>
                  </AccordionItem>
                
                  <AccordionItem subtitle={
                    <div className='py-2'>
                      <p className='text-sm font-semibold'>{cartItems.reduce((acc, item) => acc + item.qty, 0)} products</p>
                    </div>
                    }
                    className='w-full ' key="3" aria-label="Products" title={
                      <p className='text-lg font-bold text-[#54C1C4]' >Products</p>
                    }>
                    <div className='flex flex-col gap-4 pb-2 rounded-[16px]'>
                      {
                        cartItems?
                        cartItems.map(i=>(
                          <div className='flex flex-col items-center gap-4 w-full cursor-pointer rounded-[16px] '>
                            <div className='h-fit w-full flex items-center gap-6'>
                                <div className='h-24 w-24 bg-gray-200 rounded-[8px]'>
                                    <div className='h-24 w-24 bg-gray-200 rounded-[8px] overflow-hidden border-[1px]'>
                                      <img src={i.image?i.image.image:''} alt='' className='w-full h-full'/>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col md:flex-row md:items-center justify-between gap-2'>
                                    <div className='flex flex-col gap-0'>
                                        <p className='font-semibold text-xl'>{i.name}</p>
                                        
                                    </div>
                                    <div className='flex flex-col'>
                                    </div>
                                </div>
                            </div>
                          </div>
                        )):
                        ''
                      }
                    </div> 
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className='w-full flex flex-col gap-4 lg:gap-2 md:col-span-2'>
            <div variant="faded" aria-label="Dropdown menu with description" className='flex flex-col gap-2 py-2 rounded-[24px]'>
                {/* <div className='flex flex-col items-center gap-2 w-[250px] hover:bg-gray-50 border-[1px] border-transparent hover:border-black/5 duration-300 cursor-pointer rounded-[16px] p-[8px]'>
                    <div className='h-fit w-full flex gap-4'>
                        <div className='h-16 w-16 bg-gray-200 rounded-[8px]'>
                            <div className='h-16 w-16 bg-gray-200 rounded-[8px]'>
                            
                            </div>
                        </div>
                        <div className='h-fit w-full flex flex-col gap-2 '>
                            <div className='h-fit w-full flex flex-col gap-1'>
                                <div className='h-fit w-full flex flex-col gap-0'>
                                    <p className='font-semibold text-sm break-words'>Product name</p>
                                    <p className='opacity-50 text-xs break-words'> / black / large</p>
                                </div>
                                <p className='font-bold'>Rs 5,777<span className='opacity-50 text-sm'>x 3</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='h-fit w-full flex items-center justify-between'>
                        <ButtonGroup size='sm'>
                            <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiMinus/></Button>
                            <Button isIconOnly disabled className='bg-transparent h-6 w-4 text-xs'>1 </Button>
                            <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiPlus/></Button>
                        </ButtonGroup>
                        <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiTrash2/></Button>
                    </div>
                </div>
                
                <div className='flex flex-col items-center gap-2 w-[250px] hover:bg-gray-50 border-[1px] border-transparent hover:border-black/5 duration-300 cursor-pointer rounded-[16px] p-2'>
                    <div className='h-fit w-full flex gap-4'>
                        <div className='h-16 w-16 bg-gray-200 rounded-[8px]'>
                            <div className='h-16 w-16 bg-gray-200 rounded-[8px]'>
                            
                            </div>
                        </div>
                        <div className='h-fit w-full flex flex-col gap-2 '>
                            <div className='h-fit w-full flex flex-col gap-1'>
                                <div className='h-fit w-full flex flex-col gap-0'>
                                    <p className='font-semibold text-sm break-words'>Product name</p>
                                    <p className='opacity-50 text-xs break-words'> / black / large</p>
                                </div>
                                <p className='font-bold'>Rs 5,777<span className='opacity-50 text-sm'>x 3</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='h-fit w-full flex items-center justify-between'>
                        <ButtonGroup size='sm'>
                            <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiMinus/></Button>
                            <Button isIconOnly disabled className='bg-transparent h-6 w-4 text-xs'>1 </Button>
                            <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiPlus/></Button>
                        </ButtonGroup>
                        <Button isIconOnly className='bg-gray-100 h-6 w-4 text-xs'><FiTrash2/></Button>
                    </div>
                </div> */}

                <div className='w-full'>
                  <p className='w-full text-base font-semibold'>Order summary</p>
                  <div className='w-full py-4 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <p className='text-sm capitalize font-semibold opacity-50'>Items Price</p>
                      <p className='text-sm capitalize font-semibold'>Rs {itemsPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-sm capitalize font-semibold opacity-50'>Shipping Price</p>
                      {
                        shippingPrice.price?
                        <p className='text-sm capitalize font-semibold'>Rs {shippingPrice.price}</p>:
                        <p className='text-sm capitalize font-semibold text-red-500'>Please select your Town</p>
                      }
                    </div>
                    {/* <div className='flex justify-between'>
                      <p className='text-sm capitalize font-semibold opacity-50'>Tax</p>
                      <p className='text-sm capitalize font-semibold text-green-500'>{taxPrice}</p>
                    </div> */}
                    {/* <div className='flex justify-between'>
                      <p className='text-sm capitalize font-semibold opacity-50'>Coupon Aplied</p>
                      <p className='text-sm capitalize font-semibold'>Rs 0.00</p>
                    </div> */}
                    <div className='h-[1px] w-full bg-black/5'></div>
                    <div className='flex justify-between py-2'>
                      <p className='text-base capitalize font-semibold opacity-50'>Total</p>
                      <p className='text-base capitalize font-semibold'>Rs {<CountUp duration={0.15} start={totalPrice} end={totalPrice} decimals={2} />}</p>
                    </div>
                    <div className='h-[1px] w-full bg-black/5'></div>
                  </div>
                </div>

                <div className='w-full flex flex-col items-center justify-between gap-2'>
                    <Button onClick={() => placeOrder()} className='min-w-full w-full bg-[#54C1C4]'>
                        <p className='font-medium'>Checkout</p>
                    </Button>
                </div>
                
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CheckOutScreen