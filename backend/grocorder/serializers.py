from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','Creation_date']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='Category.category_name',read_only=True)
    image = serializers.ImageField(required=False)
    is_available =serializers.BooleanField(required=False,default=True)
    class Meta:
        model = Item
        fields = ['id','Category','category_name','Item_name','Price','Description','image','Quantity','is_available']   
class CartOrdersSerializer(serializers.ModelSerializer):
    food = ProductSerializer()
    class Meta:
        model = Order
        fields = ['id','food','quantity']
class MyOrdersListSerializer(serializers.ModelSerializer):
    order_final_status = serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields = ['order_number','order_time','order_final_status']
    def get_order_final_status(self,obj):
        return obj.order_final_status or "Waiting For Shop Confirmation.."
    

class OrderSerializer(serializers.ModelSerializer):
    food = ProductSerializer()
    class Meta:
        model = Order
        fields = ['food','quantity']
      
    
