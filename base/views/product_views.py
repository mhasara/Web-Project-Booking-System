from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review, VariantCombination
from base.serializers import ProductSerializer, VariantCombinationSerializer

from rest_framework import status
from django.db.models import Q

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(slug=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getVariantCombinations(request, slug, v1, v2, v3):
    try:
        filters = Q(product__slug=slug)

        if v1 != 'v1':
            filters &= Q(variant1__slug=v1)

        if v2 != 'v2':
            filters &= Q(variant2__slug=v2)

        if v3 != 'v3':
            filters &= Q(variant3__slug=v3)

        variants = VariantCombination.objects.filter(filters)

        if variants.count() == 0:
            return Response({'detail': 'No variants found'}, status=status.HTTP_404_NOT_FOUND)
        elif variants.count() == 1:
            # Serialize the single object
            variant = variants.first()
            serializer = VariantCombinationSerializer(variant)
            return Response(serializer.data)
        else:
            # Serialize the queryset
            serializer = VariantCombinationSerializer(variants, many=True)
            return Response(serializer.data)
    
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)