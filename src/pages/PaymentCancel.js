const PaymentCancel = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-4 text-lg text-gray-700">
          It looks like your payment was canceled. Try again in the main page.
        </p>
        <p className="mt-2 text-lg text-gray-700">Please close this tab.</p>
      </div>
    </div>
  );
};

export default PaymentCancel;
