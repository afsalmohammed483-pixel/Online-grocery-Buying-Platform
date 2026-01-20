from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from .models import *

# Create your views here.
@api_view(['POST'])
def admin_login_api(request):
    username=request.data.get('username')
    password=request.data.get('password')
    user = authenticate(username=username,password=password)
    if user is not None and user.is_staff:
        return Response({'message': 'Admin login successful',"username":username},status=200)
    return Response({'message': 'Invalid credentials'},status=401)

@api_view(['POST'])
def add_category(request):
    category_name = request.data.get('category_name')
    Category.objects.create(category_name=category_name)
    return Response({'message': 'Category Added Succesfully'},status=201)

from .serializers import *

@api_view(['GET'])
def list_categories(request):
   categories = Category.objects.all()
   serializer = CategorySerializer(categories,many=True)
   return Response(serializer.data)

from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import ProductSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def add_product(request):
    serializer = ProductSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product Added Succesfully'},status=201)
    return Response({"message":"Validation failed","errors":serializer.errors},status=400)
@api_view(['GET'])
def list_foods(request):
   foods = Item.objects.all()
   serializer = ProductSerializer(foods,many=True)
   return Response(serializer.data)
@api_view(['GET'])
def food_search(request):
   query = request.GET.get('q','')
   foods = Item.objects.filter(Item_name__icontains=query)
   serializer = ProductSerializer(foods,many=True)
   return Response(serializer.data)
import random
@api_view(['GET'])
def random_foods(request):
    foods = list(Item.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    serializer = ProductSerializer(limited_foods, many=True)
    return Response(serializer.data)
from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register_user(request):
    first_name = request.data.get('first_name')
    Last_name = request.data.get('Last_name')
    MobileNo = request.data.get('MobileNo')
    Email = request.data.get('Email')
    Password = request.data.get('Password') 
    if User.objects.filter(Email=Email).exists() or User.objects.filter(MobileNo=MobileNo).exists():
        return Response({'message': 'Email and Phone Number Already Registered'},status=400)
    User.objects.create(first_name= first_name ,Last_name=Last_name,Email=Email,MobileNo=MobileNo,
                        Password= make_password(Password))
    return Response({"message":"Regitration Successful"},status=201)
from django.db.models import Q
from django.contrib.auth.hashers import check_password
@api_view(['POST'])
def login_user(request):
    identifier = request.data.get('Emailcont')
    Password = request.data.get('Password')
    try:
        user = User.objects.get(Q(Email=identifier) | Q(MobileNo = identifier))
        if check_password(Password,user.Password):
          return Response({'message': 'Login Succesful',"userId":user.id,"userName":f'{user.first_name}{user.Last_name}'},status=200)
        else:
           return Response({"message":"Invalid Credentials"},status=401)
    except:
        return Response({"message":"Invalid Credentials"},status=401)
from django.shortcuts import get_object_or_404    
@api_view(['GET'])
def food_details(request,id):
    food = get_object_or_404(Item,id=id)
    serializer = ProductSerializer(food)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get('userId')
    food_id = request.data.get('foodId')
    try:
        user = User.objects.get(id=user_id)
        food = Item.objects.get(id=food_id)
        
        
        # Ensure we pass the Item instance (not the id) and don't use an invalid
        # `default` argument. Use `get_or_create` with the correct kwargs.
        order, created = Order.objects.get_or_create(
            user=user,
            food=food,
            is_order_placed=False,
        )

        if not created:
            order.quantity = order.quantity + 1
            order.save()

        return Response({'message': 'Item Added to Cart Succesfully'}, status=200)
        
    except:
        return Response({"message":"Something went wrong"},status=404)
from .serializers import CartOrdersSerializer   

@api_view(['GET'])
def get_cart_items(request,user_id):
    orders = Order.objects.filter(user_id=user_id,is_order_placed=False).select_related('food')    
    serializer = CartOrdersSerializer(orders,many=True)
    return Response(serializer.data)
@api_view(['PUT'])
def update_cart_quantity(request):
    order_id = request.data.get('orderId')
    quantity = request.data.get('quantity')
    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.quantity = int(quantity)
        order.save()
        return Response({"message": "Quantity updated Successfully", "orderId": order.id, "quantity": order.quantity}, status=200)
    except Order.DoesNotExist:
        return Response({"message": "Order not found"}, status=404)
    except Exception:
        return Response({"message": "Something went wrong"}, status=400)
@api_view(['DELETE'])
def delete_cart_item(request,order_id):
    
    try:  
        order = Order.objects.get(id=order_id , is_order_placed=False)
        order.delete()
        return Response({"message":"Item Deleted from the Cart"},status=200)
    except:
        return Response({"message":""},status=404)
    
    
def make_unique_order_number():
    while True:
        num = str(random.randint(1000000000,9999999999))
        if not OrderAddress.objects.filter(order_number=num).exists():
            return num
    
@api_view(['POST'])
def place_order(request):
    user_id = request.data.get('userId')
    address = request.data.get('address')
    payment_mode = request.data.get('paymentMode')
    card_number = request.data.get('cardNumber')
    expiry = request.data.get('expiry')
    cvv = request.data.get('cvv')
    try:
        order = Order.objects.filter(user_id=user_id, is_order_placed=False)
        order_number = make_unique_order_number()
        order.update(order_number=order_number, is_order_placed=True)

        OrderAddress.objects.create(
            user_id = user_id,
            order_number = order_number,
            address = address
        )

        PaymentDetails.objects.create(
            user_id = user_id,
            order_number = order_number,
            payment_mode = payment_mode,
            card_number = card_number if payment_mode == 'online' else None,
            expiry_date = expiry if payment_mode == 'online' else None,
            cvv = cvv if payment_mode == 'online' else None,

        )
      

        return Response({'message': f'Order Placed Successfully! Order No: {order_number}'}, status=201)
        
    except:
        return Response({"message":"Something went wrong"},status=404)
from .serializers import MyOrdersListSerializer
@api_view(['GET'])
def user_orders(request,user_id):
    orders = OrderAddress.objects.filter(user_id=user_id).order_by('-id')    
    serializer = MyOrdersListSerializer(orders,many=True)
    return Response(serializer.data)
from .serializers import OrderSerializer
@api_view(['GET'])
def order_by_order_number(request,order_number):
    orders = Order.objects.filter(order_number=order_number,is_order_placed=True).select_related('food')
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def get_order_address(request, order_number):
    try:
        address = OrderAddress.objects.get(order_number=order_number)
    except OrderAddress.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderAddressSerializer(address)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)
@api_view(['PUT'])
def update_user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Profile Updated Successfully'},status=200)
    return Response(serializer.errors,status=400)

@api_view(['POST'])
def change_password(request, user_id):
    current_password=request.data.get('current_password')
    new_password=request.data.get('new_password')
    user = User.objects.get(id=user_id)

    if not check_password(current_password,user.Password):
        return Response({'message':'Current Password is Incorrect'},status=400)
    
    user.Password = make_password(new_password)
    
    user.save()
        
    return Response({'message':'Password Changed Successfully!'},status=200)

from .serializers import OrderSummarySerializer
@api_view(['GET'])
def orders_not_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def orders_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status="Order Confirmed").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def food_being_prepared(request):
    orders = OrderAddress.objects.filter(order_final_status="Food being prepared").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)  

@api_view(['GET'])
def food_pickup(request):
    orders = OrderAddress.objects.filter(order_final_status="Food Pickup").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)    

@api_view(['GET'])
def food_delivered(request):
    orders = OrderAddress.objects.filter(order_final_status="Food Delivered").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def order_cancelled(request):
    orders = OrderAddress.objects.filter(order_final_status="Order Cancelled").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def all_orders(request):
    orders = OrderAddress.objects.all().order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)   

@api_view(['POST'])
def order_between_dates(request):
    from_date = request.data.get('from_date')
    to_date = request.data.get('to_date')
    status = request.data.get('status')

    orders = OrderAddress.objects.filter(order_time__date__range=[from_date,to_date])
    if status == 'not_confirmed':
       orders = orders.filter(order_final_status__isnull=True)
    elif status != 'all':
       orders = orders.filter(order_final_status = status)
    serializer = OrderSummarySerializer(orders.order_by('-order_time'),many=True)


    return Response(serializer.data)   
from .serializers import OrderDetailSerializer,OrderedFoodSerializer,FoodTrackingSerializer
@api_view(['GET'])
def view_order_detail(request,order_number):
    try:
        order_address = OrderAddress.objects.select_related('user').get(order_number=order_number)
        ordered_foods = Order.objects.filter(order_number=order_number).select_related('food')
        tracking = FoodTracking.objects.filter(order__order_number=order_number)
    except:
        return Response({'error':'Something went wrong'},status=404)


    return Response({
          'order' : OrderDetailSerializer(order_address).data,
          'foods' : OrderedFoodSerializer(ordered_foods,many=True).data,
          'tracking' : FoodTrackingSerializer(tracking,many=True).data,

          
      }) 

@api_view(['POST'])
def update_order_status(request):
    order_number = request.data.get('order_number')
    new_status = request.data.get('status')
    remark = request.data.get('remark')

    try:
        address = OrderAddress.objects.get(order_number=order_number)
        order = Order.objects.filter(order_number=order_number).first()
        if not order:
            return Response({'error': 'Order Not Found'},status=404)
        FoodTracking.objects.create(order=order,remark=remark,status=new_status,order_cancelled_by_user=False)
        address.order_final_status =new_status
        address.save()
        return Response({'message': 'Order Status Updated Successfully'})
    except OrderAddress.DoesNotExist:
        return Response({'error': 'Invalid Order Number'},status=400)
    
@api_view(['GET'])
def search_orders(request):
   query = request.GET.get('q','')
   if query:
          orders = OrderAddress.objects.filter(order_number__icontains=query).order_by('-order_time')
   else:  
       orders = []    
   serializer = OrderSummarySerializer(orders,many=True)
   return Response(serializer.data)     

@api_view(['GET','PUT','DELETE'])
def category_detail(request,id):
    try:
       category= Category.objects.get(id=id)
    except Category.DoesNotExist:
       return Response({'error':'Category not Found'},status=404)
    if request.method == 'GET':
          
      serializer = CategorySerializer(category)
      return Response(serializer.data)
    elif request.method == 'PUT':
          
      serializer = CategorySerializer(category,data=request.data)
      if serializer.is_valid():
          serializer.save()
      return Response({'message':'Category Updated Succesfully'},status=200)
    elif request.method == 'DELETE':
          
        category.delete()
        return Response({'error':'Category Deleted Succesfully'},status=200)




