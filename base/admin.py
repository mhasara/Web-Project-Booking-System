from django.contrib import admin
from .models import *
import admin_thumbnails

# Register your models here.

@admin_thumbnails.thumbnail('image')
class ProductGalleryInline(admin.TabularInline):
    model = ProductImages
    extra = 1

# @admin_thumbnails.thumbnail('name') 
# class VariantInline(admin.TabularInline):
#     model = Variant
#     extra = 1

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name', 'category__name')
    inlines = [ProductGalleryInline]

admin.site.register(Product, ProductAdmin)



 
# admin.site.register(VariantCombination, VariantCombinationAdmin)
admin.site.register(ProductBrand)
admin.site.register(ProductCategory)
# admin.site.register(VariantType)
# admin.site.register(Variant)

# admin.site.register(Review)

@admin_thumbnails.thumbnail('name')
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin_thumbnails.thumbnail('order')
class ShippingAddressInline(admin.TabularInline):
    model = ShippingAddress
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display=['user', 'isPaid', 'isDelivered']
    list_editable=['isPaid', 'isDelivered']
    inlines = [OrderItemInline, ShippingAddressInline]


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
# admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

admin.site.register(Country)
admin.site.register(Province)
admin.site.register(District)
admin.site.register(Town)
