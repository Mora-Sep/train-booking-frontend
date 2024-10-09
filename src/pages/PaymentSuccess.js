const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Your payment was processed successfully. You can go back to the main
          page.
        </p>
        <p className="mt-2 text-lg text-gray-700">Please close this tab.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
