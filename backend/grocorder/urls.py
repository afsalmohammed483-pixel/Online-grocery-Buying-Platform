from django.urls import path
from .views import *
urlpatterns = [
    path('admin-login/', admin_login_api),
    path('add-category/',add_category),
    path('categories/',list_categories),
    path('add-product/',add_product),
    path('foods/',list_foods),
    path('food_search/',food_search),
    path('random_foods/',random_foods),
    path('register/',register_user),
    path('login/',login_user),
    path('food/<int:id>/',food_details),
    path('cart/add/',add_to_cart),
    path('cart/<int:user_id>/',get_cart_items),
    path('cart/update_quantity/',update_cart_quantity),
    path('cart/delete/<int:order_id>/',delete_cart_item),
    path('place_order/',place_order),
    path('orders/<int:user_id>/',user_orders),
    path('orders/by_order_number/<str:order_number>/',order_by_order_number),
    path('orders/by_order_address/<str:order_number>/', get_order_address),
    path('user/<int:user_id>/',get_user_profile),
    path('user_update/<int:user_id>/',update_user_profile),
    path('change_password/<int:user_id>/',change_password),
    path('orders-not-confirmed/',orders_not_confirmed),
    path('orders-confirmed/',orders_confirmed),
    path('food_being-prepared/',food_being_prepared),
    path('foodpickup/',food_pickup),
    path('orders-delivered/',food_delivered),
    path('order-cancelled/',order_cancelled),
    path('all-foods/',all_orders),
    path('order-between-dates/',order_between_dates),
    path('view-order-detail/<str:order_number>/',view_order_detail),
    path('update-order-status/',update_order_status)



]