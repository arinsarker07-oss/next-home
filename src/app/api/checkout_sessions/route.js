import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');

        // ১. ফর্ম থেকে পাঠানো ডাইনামিক ডেটা রিড করা
        const formData = await req.formData();
        const price = formData.get('price'); // প্রোপার্টির প্রাইস
        const propertyName = formData.get('propertyName'); // প্রোপার্টির নাম

        // ২. স্ট্রাইপ সেশন তৈরি (price_data ব্যবহার করে)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'bdt', // আপনার ড্যাশবোর্ড অনুযায়ী 'usd' বা 'bdt' দিন
                        product_data: {
                            name: propertyName, // ডাইনামিক প্রোপার্টি টাইটেল
                        },
                        // স্ট্রাইপ পয়সা/cents হিসাব করে, তাই অ্যামাউন্টকে ১০০ দিয়ে গুণ করতে হবে
                        unit_amount: Number(price) * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/properties/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/properties`, // ক্যানসেল ইউআরএল যোগ করতে পারেন
        });

        // ব্রাউজারকে স্ট্রাইপ পেমেন্ট পেজে রিডাইরেক্ট করা
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}