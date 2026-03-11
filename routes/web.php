<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::get('/all-items', function () {
    $preorder = request()->query('preorder');
    return Inertia::render('AllItemsPage', [
        'preorder' => $preorder,
    ]);
});

Route::get('/category/{categoryId}', function (string $categoryId) {
    return Inertia::render('CategoryPage', [
        'categoryId' => $categoryId,
    ]);
});

Route::get('/shop/{shopId}', function (string $shopId) {
    return Inertia::render('ShopPage', [
        'shopId' => $shopId,
    ]);
});

Route::get('/product/{productId}', function (string $productId) {
    return Inertia::render('ProductDetailPage', [
        'productId' => $productId,
    ]);
});

Route::get('/cart', function () {
    return Inertia::render('CartPage');
});

Route::get('/checkout', function () {
    return Inertia::render('CheckoutPage');
});

Route::get('/profile', function () {
    return Inertia::render('ProfilePage');
});

Route::get('/contact', function () {
    return Inertia::render('ContactPage');
});

Route::get('/delivery', function () {
    return Inertia::render('DeliveryPage');
});

Route::get('/returns', function () {
    return Inertia::render('ReturnsPage');
});

Route::get('/faq', function () {
    return Inertia::render('FAQPage');
});

Route::get('/order-tracking/{orderNumber?}', function (?string $orderNumber = null) {
    return Inertia::render('OrderTrackingPage', [
        'orderNumber' => $orderNumber,
    ]);
});
