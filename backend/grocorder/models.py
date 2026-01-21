from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=30,null=True)
    Last_name = models.CharField(max_length=30,null=True)
    Email = models.EmailField(max_length=254,unique=True,null=True)
    MobileNo = models.CharField(max_length=15,null=True)
    Password = models.CharField(max_length=100,null=True)
    reg_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.first_name} {self.Last_name}"
class Category(models.Model):
    category_name = models.CharField(max_length=30,null=True)
    Creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category_name

class Item(models.Model):
    Category = models.ForeignKey(Category, on_delete=models.CASCADE)
    Item_name = models.CharField(max_length=50)
    Price = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    Description = models.TextField(max_length=200,null=True,blank=True)
    image = models.ImageField(upload_to='item_images/')
    Quantity = models.CharField(max_length=100,null=True)
    is_available = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.Item_name} ({self.Quantity})"
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_order_placed = models.BooleanField(default=False)
    order_number = models.CharField(max_length=100,null=True)
    def __str__(self):
        return f"{self.order_number} ({self.user})"

class OrderAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)  
    address = models.TextField()
    order_time = models.DateTimeField(auto_now_add=True)
    order_final_status = models.CharField(max_length=200,null=True)
    def __str__(self):
        return f"{self.order_number} ({self.user})"  

class FoodTracking(models.Model):
    order_address = models.ForeignKey(OrderAddress, on_delete=models.CASCADE)
    remark = models.CharField(max_length=200,null=True)  
    status = models.CharField(max_length=200,null=True)
    status_date = models.DateTimeField(auto_now_add=True)
    order_cancelled_by_user = models.BooleanField(null=True)
    def __str__(self):
        return f"{self.order_address} - {self.status}"       

class PaymentDetails(models.Model):
    PAYMENT_CHOICES = [
        ('cod','Cash on Delivery'),
        ('online','Online Payment')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)  
    payment_mode = models.CharField(max_length=20,choices=PAYMENT_CHOICES)
    card_number = models.CharField(max_length=20,null=True,blank=True)
    expiry_date = models.CharField(max_length=10,null=True,blank=True)
    cvv = models.CharField(max_length=5,null=True,blank=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.order_number} ({self.payment_mode})"  

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Item, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=1)
    comment = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Review by {self.user.first_name} for {self.food.Item_name} - {self .rating} stars" 

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Item, on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user','food')
    def __str__(self):
        return f"{self.user.first_name} - {self.food.Item_name}"                   