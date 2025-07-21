from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django_quill.fields import QuillField
from django_ckeditor_5.fields import CKEditor5Field


# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('User must have email')

        if not username:
            raise ValueError('User must have an username')
        
        user=self.model(
            username = username,
            email = self.normalize_email(email),
        )

        user.set_password(password)
        user.save()
        return user


    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email = self.normalize_email(email),
            password = password,
            
        )

        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_student = False
        user.is_superadmin = True
        user.save()
        return user


class UserAccount(AbstractBaseUser): 
    username = models.CharField(max_length=100, unique=True, blank=True, null=True,)
    email = models.EmailField(max_length=50, blank=True, null=True, unique=True)
    phone_number = models.IntegerField(blank=True, null=True, unique=True)
    date_of_birth = models.DateField(blank=True, null=True,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_admin       =   models.BooleanField(default=False)
    is_staff       =   models.BooleanField(default=False)
    is_student       =   models.BooleanField(default=False)
    is_active      =   models.BooleanField(default=True)
    is_superadmin  =   models.BooleanField(default=False)

    objects         =   UserAccountManager()

    USERNAME_FIELD  =   'email'
        
    REQUIRED_FIELDS =   ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True
 

class ProductCategory(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, unique=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png', upload_to='product/category/' )

    def __str__(self):
        return str(self.name)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )

class ProductBrand(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, unique=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png', upload_to='product/brand/' )

    def __str__(self):
        return str(self.name)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )

class Product(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(blank=True, null=True, unique=True)
    brand = models.ForeignKey(ProductBrand, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True)
    description = CKEditor5Field('Text', config_name='extends')
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    discount_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    top_products = models.BooleanField(null=True, blank=True, default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )

class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True )
    image = models.ImageField(null=True, blank=True, upload_to='products/')
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name

class VariantType(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, unique=True)
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )

class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True )
    variant_type = models.ForeignKey(VariantType, on_delete=models.SET_NULL, null=True )
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, )
    color_code = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='verient/')
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.variant_type.name} : {self.name}"
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )
    
class VariantCombination(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    variant1 = models.ForeignKey(Variant, related_name='variant1', on_delete=models.SET_NULL, null=True, blank=True)
    variant2 = models.ForeignKey(Variant, related_name='variant2', on_delete=models.SET_NULL, null=True, blank=True)
    variant3 = models.ForeignKey(Variant, related_name='variant3', on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        parts = []

        if self.product:
            parts.append(str(self.product.name))
        if self.variant1:
            parts.append(str(self.variant1.name))
        if self.variant2:
            parts.append(str(self.variant2.name))
        if self.variant3:
            parts.append(str(self.variant3.name))
        
        # Add price to parts
        parts.append(f"${self.price:.2f}")

        return " - ".join(parts)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField( 
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True )
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True )
    variant = models.ForeignKey(VariantCombination, on_delete=models.SET_NULL, null=True )
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class OrderItemVeriant(models.Model):
    order_item = models.ForeignKey(OrderItem, on_delete=models.SET_NULL, null=True, blank=True)
    variant = models.ForeignKey(Variant, on_delete=models.SET_NULL, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_item

class Country(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, )

    def __str__(self):
        return  self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )
    
class Province(models.Model):
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, )

    def __str__(self):
        return  self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )
    
class District(models.Model):
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True, )

    def __str__(self):
        return  self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )

class Town(models.Model):
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True)
    postal_code = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(blank=True, null=True )
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return  self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs )
    

class ShippingAddress(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True )
    town = models.ForeignKey(Town, on_delete=models.SET_NULL, null=True )
    address = models.CharField(max_length=200, null=True, blank=True)
    fname = models.CharField(max_length=200, null=True, blank=True, default='')
    number = models.CharField(max_length=200, null=True, blank=True, default='')
    country = models.CharField(max_length=200, null=True, blank=True, default='')
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.order)
