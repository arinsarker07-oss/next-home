import React from 'react';

const StripeForm = () => {
    return (
            <form action="/api/checkout_sessions" method="POST">
                <section>
                    <button
                        type="submit"
                        className="w-50 cursor-pointer bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs h-11 rounded-xl transition-colors shadow-sm"
                    >
                        Proceed to Pay
                    </button>
                </section>
            </form>
    );
};

export default StripeForm;