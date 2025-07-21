import requests

from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress, Town, VariantCombination
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime

from django.db import transaction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems', [])

    if not orderItems:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    # (1) Create order
    shippingAddress = Town.objects.get(postal_code=data['postal_code'])

    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'], 
        shippingPrice=shippingAddress.price,
    )

    # (2) Create shipping address
    shipping = ShippingAddress.objects.create(
        order=order,
        town=shippingAddress,
        fname=data['shippingAddress']['fName'],
        address=data['shippingAddress']['address'],
        number=data['shippingAddress']['number'],
        country=data['shippingAddress']['country'],
    )

    price = 0
    order_items_details = []  # Store product details for the message

    # (3) Create order items and set order to orderItem relationship
    for i in orderItems:
        product = Product.objects.get(slug=i['product'])
        price += float(product.discount_price)  # Increment the price
        OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=i['qty'],
            price=i['price'],
        )

        # Add product details to the list for the message
        order_items_details.append(f"""
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">{product.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{i['qty']}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${float(i['price']):.2f}</td>
            </tr>
        """)

        # (4) Update stock
        product.countInStock -= i['qty']
        product.save()

    # (5) Update total price of the order
    order.totalPrice = price + float(order.shippingPrice)
    order.save()

    # (6) Prepare the email message with HTML formatting
    product_details_html = "".join(order_items_details)  # Join all product details in a single HTML string
    message_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
            <h2 style="text-align: center; color: #2a9df4;">Order Confirmation</h2>
            <p>Dear {user.first_name},</p>
            <p>Thank you for your order. Here are the details of your purchase:</p>

            <h3 style="color: #2a9df4;">Shipping Address</h3>
            <p>
                {shipping.fname}<br/>
                {shipping.address}, {shipping.town.name}<br/>
                {shipping.country}
            </p>

            <h3 style="color: #2a9df4;">Products Ordered</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f4f4f4;">
                        <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {product_details_html}
                </tbody>
            </table>

            <h3 style="color: #2a9df4;">Order Summary</h3>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Total Price: <strong>Rs{order.totalPrice:.2f}</strong></p>

            <p>Your order has been successfully placed, and we will notify you once it is shipped.</p>

            <p>Best regards,<br/>Your Store Team</p>
        </div>
    </body>
    </html>
    """

    # (7) Send email to customer using the PHP server
    try:
        # PHP API endpoint
        php_email_api_url = 'http://localhost/send_email.php'  # Your PHP email endpoint

        # Email details to be sent to the PHP script
        email_data = {
            'email': user.email,  # Send the user's email
            'subject': 'Order Confirmation',
            'message': message_body  # Send the formatted message body
        }

        # Make POST request to the PHP script
        response = requests.post(php_email_api_url, data=email_data)

        # Check response from the PHP mailer
        if response.status_code == 200 and response.json().get('status') == 'success':
            print('Email sent successfully')
        else:
            print(f'Failed to send email: {response.status_code} {response.text}')

    except Exception as e:
        print(f'Failed to send email: {e}')

    # (8) Return the order details as the response
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')
