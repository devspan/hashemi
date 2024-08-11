'use client';

import { useCart } from '@/app/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="flex items-center p-4">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 mx-2 text-center"
                    />
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </div>
                  <Button variant="destructive" size="sm" className="ml-4" onClick={() => removeItem(item.id)}>Remove</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </p>
                <p className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}