from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),

    # path('create/', views.createProduct, name="product-create"),
    # path('upload/', views.uploadImage, name="image-upload"),

    # path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),
    path('<str:slug>/<str:v1>/<str:v2>/<str:v3>/', views.getVariantCombinations, name="product-variant-comination"),

    # path('update/<str:pk>/', views.updateProduct, name="product-update"),
    # path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]
