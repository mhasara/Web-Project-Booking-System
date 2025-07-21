import React, { useState } from 'react'
import Container from '../componets/Container'
import { Button, Chip, Navbar, Tab, Tabs } from '@nextui-org/react'
import { CiFilter, CiMenuFries } from "react-icons/ci";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {Slider} from "@nextui-org/slider";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { MdArrowRightAlt, MdCancel } from 'react-icons/md';
import {Pagination} from "@nextui-org/react";

const ProductsScreen = () => {
  const [filter, setFilter] = useState(false);
  const [gridCount, setGridCount] = useState(2);
  const [value, setValue] = React.useState([100, 300]);

  return (
    <div className='h-fit w-full relative py-2'>

      <section className='h-fit w-full'>
        <div className='h-fit w-full max-w-[1100px] mx-auto px-6 flex flex-col gap-4'>
            <div className='flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
              <div className='flex flex-col items-center'>
                <div className='w-full flex items-center justify-between py-4'>
                  <p className='text-xl font-bold'>Filtered</p>

                  <div className='flex flex-row gap-2'>
                    <div className='col-span-3'>
                      <Button onClick={() => setFilter(!filter) } isIconOnly endContent={<CiFilter className='text-xl'/>} variant='flat' className='w-full text-sm font-medium opacity-50 rounded-[8px]' size='md'></Button>
                    </div>

                    <Dropdown>
                      <DropdownTrigger>
                        <div>
                          <Button isIconOnly endContent={<CiMenuFries className='text-xl'/>} variant='flat' radius='none' className='w-full text-sm font-medium opacity-50 rounded-[8px]' size='md'><p className=''></p></Button>
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">New file</DropdownItem>
                        <DropdownItem key="copy">Copy link</DropdownItem>
                        <DropdownItem key="edit">Edit file</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                          Delete file
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> 

                  </div>
                </div>
                <div className={
                  filter?
                  'h-fit overflow-hidden w-full bg-gray-50 duration-300 px-2 rounded-[8px]':
                  'h-[0px] md:h-fit overflow-hidden w-full bg-gray-50 duration-300 px-2 rounded-[8px]'
                }>
                  <Accordion variant='light' defaultExpandedKeys={["1","2","3","4"]}>
                    <AccordionItem key={'1'} title={
                      <div className='flex items-center justify-between'>
                        <p className='text-xs md:text-sm font-semibold'>Category</p>
                      </div>
                    } >
                      <div className='flex flex-wrap gap-2'>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Apple</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Samsung</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Huwawi</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Honer</Chip>
                      </div>
                    </AccordionItem>
                    <AccordionItem key={'2'} title={
                      <div className='flex items-center justify-between'>
                        <p className='text-xs md:text-sm font-semibold'>Brand</p>
                      </div>
                    } >
                      <div className='flex flex-wrap gap-2'>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Huwawi</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50' >Honer</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 bg-[#54C1C4]' endContent={
                          <MdCancel className='text-base' />
                        }>Apple</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 bg-[#54C1C4]' endContent={
                          <MdCancel className='text-base' />
                        }>Samsung</Chip>
                      </div>
                    </AccordionItem>
                    <AccordionItem key={'3'} title={
                      <div className='flex items-center justify-between'>
                        <p className='text-xs md:text-sm font-semibold'>Colors</p>
                      </div>
                    } >
                      <div className='flex flex-wrap gap-2'>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50'  startContent={
                          <div className='h-6 w-6 bg-black rounded-full'>

                          </div>
                        }>Huwawi</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 text-opacity-50'  startContent={
                          <div className='h-6 w-6 bg-black rounded-full'>

                          </div>
                        }>Honer</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 bg-[#54C1C4]' endContent={
                          <MdCancel className='text-base' />
                        } startContent={
                          <div className='h-6 w-6 bg-black rounded-full'>

                          </div>
                        }>Apple</Chip>
                        <Chip size='sm' variant='flat' className='px-1 py-4 bg-[#54C1C4]' endContent={
                          <MdCancel className='text-base' />
                        } startContent={
                          <div className='h-6 w-6 bg-black rounded-full'>

                          </div>
                        }>Samsung</Chip>
                      </div>
                    </AccordionItem>
                    <AccordionItem key={'4'} title={
                      <div className='flex items-center justify-between'>
                        <p className='text-xs md:text-sm font-semibold'>Price Range</p>
                      </div>
                    } >
                      <div className='max-w-full overflow-hidden flex flex-wrap gap-2'>
                        <Slider 
                          size='sm'
                          label="Price"
                          formatOptions={{style: "currency", currency: "USD"}}
                          step={10}
                          maxValue={1000}
                          minValue={0}
                          value={value} 
                          onChange={setValue}
                          className="max-w-full"
                        />
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2 md:col-span-2 lg:col-span-3 gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:py-4'>
                <div className='grid grid-cols-2 gap-2 md:col-span-2 lg:col-span-3 gap-y-4 md:grid-cols-2 lg:grid-cols-3'>
                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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

                    <div  className='h-fit w-full flex flex-col rounded-[16px] bg-gray-50 p-2'>
                      <div className='h-[150px] w-full rounded-[8px] overflow-hidden bg-white relative'>
                        <Link className='h-[150px] relative' to={'/shop/cat/product'}>
                          <img src='https://static-01.daraz.lk/p/4dbbe6982c89675213a27ca6f2968d77.jpg_400x400q75.jpg_.webp' alt='' className='h-full w-full object-contain rounded-[4px] hover:scale-105 duration-300 relative z-0'/>
                        </Link>
                        {/* <Button size='sm' className="text-base border-[2px] border-[#54C1C4] border-opacity-25 hover:border-opacity-100 bg-transparent focus:bg-[#54C1C4] hover:bg-[#54C1C4] absolute z-20 top-2 right-2 text-[#54C1C4] focus:text-black hover:text-black" isIconOnly startContent={
                            <PiShoppingCartSimpleBold className='text-xs'/>
                        }>
                        </Button> */}
                      </div>
                      <Link to={'/shop/cat/product'} className='flex flex-col pt-3 gap-2'>
                        

                        <div className='flex flex-col'>
                          <p className='text-xs md:text-sm font-semibold'>Product name </p>
                          <p className='text-xs font-medium opacity-50'>/10kg /20kg</p>  
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <div className='h-2 w-2 rounded-full bg-red-600'></div>
                        </div>
      
                        <div className='flex flex-col'>
                          <div className='flex flex-wrap items-center'>
                            <p className='text-lg font-semibold'>Rs 5,999.00</p> 
                            <s className='text-xs font-medium opacity-50 mt-1'>Rs 6,999.00</s>
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
                    
                </div>
                <div className='flex items-center md:col-span-2 lg:col-span-3 justify-center py-4'>
                  <Pagination size='sm' showControls total={10} initialPage={1} className='flex w-full md:hidden' />
                  <Pagination size='md' showControls total={10} initialPage={1} className='w-full hidden md:flex' />
                </div>
              </div>
            </div>
            
        </div>
      </section>

    </div>
  )
}

export default ProductsScreen


// <div className='h-fit w-full relative md:pt-[88px]'>
//       <div className='w-full max-w-[1100px] mx-auto md:px-4'>
//         <div className={
//           filter?
//           'absolute w-full md:w-[250px] ml-0 h-screen bg-transparent z-50 md:z-30 flex md:mt-2':
//           'absolute w-full -ml-[100%] md:w-[250px] h-screen bg-transparent z-50 md:z-30 flex md:mt-2'
//         }>

//           {/* filter */}
//           <div className={
//             filter?
//             'h-full w-full flex flex-col border-t-1 gap-1 divide-y-1 md:max-w-full md:w-full bg-white duration-300 px-6 py-4':
//             'h-full w-full flex flex-col border-t-1 gap-1 divide-y-1 md:w-full bg-white duration-300 overflow-hidden px-6 py-4 '
//           }>
//               <Accordion defaultExpandedKeys={["1"]} isCompact className='w-full '>
//                 <AccordionItem  className='text-base font-semibold ' key="1" aria-label="Categories" startContent="Categories">
//                   <div className='flex flex-col gap-1 py-2'>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>Art of summer</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>Art of winter</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>logo looks</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                   </div>
//                 </AccordionItem>
//               </Accordion>

//               <Accordion defaultExpandedKeys={["1"]} isCompact className='w-full '>
//                 <AccordionItem  className='text-base font-semibold ' key="1" aria-label="Price range" startContent="Price range">
//                   <div className='flex flex-col gap-1  overflow-hidden text-xs font-normal'>
//                     <Slider 
//                       label="Rs"
//                       size="sm"
//                       step={50} 
//                       minValue={0} 
//                       maxValue={1000} 
//                       defaultValue={[100, 500]} 
//                       className="max-w-md text-xs"
//                     />
//                   </div>
//                 </AccordionItem>
//               </Accordion>

//               <Accordion defaultExpandedKeys={["1"]} isCompact className='w-full '>
//                 <AccordionItem  className='text-base font-semibold ' key="1" aria-label="Color" startContent="Color">
//                   <div className='flex flex-col gap-1 py-2'>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>Black</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>White</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>Pink</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                   </div>
//                 </AccordionItem>
//               </Accordion>

//               <Accordion defaultExpandedKeys={["1"]} isCompact className='w-full '>
//                 <AccordionItem  className='text-base font-semibold ' key="1" aria-label="Size" startContent="Size">
//                   <div className='flex flex-col gap-1 py-2'>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>xs</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>sm</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>m</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>lg</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                     <div className='flex justify-between items-center overflow-hidden'>
//                       <p className='text-xs font-normal'>xl</p>
//                       <Checkbox defaultSelected size="sm" className='text-sm -mr-[16px]'></Checkbox>
//                     </div>
//                   </div>
//                 </AccordionItem>
//               </Accordion>
              

//           </div>


//           <button onClick={() => setFilter(!filter)} className={
//             filter?
//             'h-full w-[20%] bg-black bg-opacity-25 md:hidden duration-300':
//             'h-full w-[20%] bg-black bg-opacity-25 md:hidden duration-300'
//           }>

//           </button>
//         </div>
//       </div>
//       <Container>
//         <div className='flex items-center justify-between my-2 font-medium border-1 md:ml-[266px] mt-[96px] md:mt-0'>
//           <div className='max-h-fit flex divide-x-1 overflow-hidden'>
//             <Button onClick={() => setFilter(!filter)} endContent={<CiFilter/>} variant='bordered' radius='none' className='text-xs border-0 ' size='md'>Filter</Button>
//             <Button endContent={<CiMenuFries/>} variant='bordered' radius='none' className='text-xs border-0 ' size='md'>Sort</Button>
//             <div className='h-[40px] w-[1px] border-l-1'></div>
//           </div>
//           <div className='flex items-center px-2'>
//             <Button onClick={() => setGridCount(1) } isIconOnly size='sm' variant='light'>
//               <div className='h-[14px] w-[14px] bg-black'></div>
//             </Button>
//             <Button onClick={() => setGridCount(2) } isIconOnly size='sm' variant='light'>
//               <TfiLayoutGrid2Alt className='text-[14px] mt-[2px]' />
//             </Button>
//             <Button onClick={() => setGridCount(3) } isIconOnly size='sm' variant='light' className='hidden md:flex'>
//               <TfiLayoutGrid3Alt className='text-[14px]' />
//             </Button>
//             <Button onClick={() => setGridCount(4) } isIconOnly size='sm' variant='light' className='hidden md:flex'>
//               <TfiLayoutGrid4Alt className='text-[15px] ' />
//             </Button>
            
            
//           </div>
//         </div>

//         <div className={`h-fit grid md:grid-cols-${gridCount} grid-cols-${gridCount} gap-2 md:gap-4 md:ml-[266px]`}>
//           <div className='h-[200px] w-full bg-black'>

//           </div>
//           <div className='h-[200px] w-full bg-black'>

//           </div>
//           <div className='h-[200px] w-full bg-black'>

//           </div>
//         </div>

//       </Container>
//     </div>