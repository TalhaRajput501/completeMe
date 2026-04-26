'use client'
import { OrderType } from '@/models/orders.model'
import React, { useEffect, useState } from 'react'
import { Calendar, CheckCircle, ChevronDown, ChevronUp, CreditCard, Eye, MapPin, Package, Phone, User, XCircle } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { getOrderProductImages } from '@/lib/actions/orders.actions'



export default function EachOrder({ order,expandedOrder,  setExpandedOrder }: { order: OrderType, expandedOrder: string, setExpandedOrder: React.Dispatch<React.SetStateAction<string>> }) {

  const [productImages, setProductImages] = useState<string[]>([])

  useEffect(() => {
    async function fetchImage()  {
      try {
        console.log("Fetching product images for order: ", order._id);
        const images =  await Promise.all(order.products.map((product) => getOrderProductImages(String(product.productId))));
        console.log("Fetched product images for order: ", images);
        setProductImages(images.flat());
      } catch (error) {
        console.error("Error fetching order product images:", error);
      }

    }
    fetchImage()
  },[])





  return (
    <div  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-3">
                  {/* Order Header */}
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-lg font-semibold text-slate-800">
                                Order #{String(order._id).slice(0,8).toUpperCase()}
                              </h3>
                              <StatusBadge status={order.status} />
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {/* {formatDate(order.createdAt)} */}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Package className="w-4 h-4" />
                                {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Customer Info - if available */}
                        {order.customerInfo && (
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <User className="w-4 h-4" />
                              {order.customerInfo.name}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-4 h-4" />
                              {order.customerInfo.phone}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Order Total & Actions */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-slate-600">Total Amount</p>
                          <p className="text-2xl font-bold text-slate-800">${order.totalAmount.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => setExpandedOrder(expandedOrder === String(order._id) ? '' : String(order._id))}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          {expandedOrder === String(order._id) ? (
                            <ChevronUp className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === String(order._id) && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
                      {/* Payment Info */}
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Payment Information
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-slate-600">Payment Intent ID:</span>
                            <p className="font-mono text-slate-800 mt-1">{order.paymentIntentId}</p>
                          </div>
                          {/* <div>
                            <span className="text-slate-600">Last Updated:</span>
                            <p className="text-slate-800 mt-1">{formatDate(order.updatedAt)}</p>
                          </div> */}
                        </div>
                      </div>

                      {/* Delivery Address - if available */}
                      {order.customerInfo?.address && (
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Delivery Address
                          </h4>
                          <p className="text-slate-700">{order.customerInfo.address}</p>
                        </div>
                      )}

                      {/* Products List */}
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {/* {prouctImages.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                              {item.productId.images?.[0] && (
                                <img
                                  src={item.productId.images[0]}
                                  alt={item.productId.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <h5 className="font-medium text-slate-800">{item.productId.name}</h5>
                                <p className="text-sm text-slate-600 mt-1">
                                  Quantity: {item.orderedQuantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-slate-800">
                                  ${(item.orderedQuantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))} */}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                          <Eye className="w-4 h-4" />
                          View Full Details
                        </button> */}

                        {order.status === 'pending' && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                            <Package className="w-4 h-4 cursor-pointer" />
                            Mark as Processing
                          </button>
                        )}

                        {order.status === 'processing' && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                            <CheckCircle className="w-4 h-4" />
                            Mark as Delivered
                          </button>
                        )}

                        {(order.status === 'pending' || order.status === 'processing') && (
                          <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                            <XCircle className="w-4 h-4" />
                            Cancel Order
                          </button>
                        )}
                      </div>

                    </div>
                  )}

                </div>
  )
}
