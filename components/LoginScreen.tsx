import React, { useState, FormEvent, ChangeEvent } from 'react';

interface LoginScreenProps {
  onLoginSuccess: (phoneNumber: string) => void;
}

const BrandIcon = () => (
    <div className="mx-auto w-24 h-24 flex items-center justify-center">
        <img src="/aquabridge.png" alt="Aqua Bridge Logo" className="w-full h-full object-contain" />
    </div>
);


const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    // Only update state if the length is within the limit
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
     // Only update state if the length is within the limit
    if (numericValue.length <= 6) {
      setOtp(numericValue);
    }
  };

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    // For this simulation, any 6-digit OTP is fine.
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(phoneNumber);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-sky-50 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-sky-100/50 my-auto">
        <div className="text-center mb-10">
           <BrandIcon />
           <h1 className="text-3xl font-bold text-gray-800 mt-6">Aqua Bridge</h1>
           <p className="text-sky-600 mt-1 font-medium">Empowering Aquaculture Farmers</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sr-only">Mobile Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+91</span>
                 </div>
                 <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="w-full p-4 pl-14 bg-sky-50 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors text-gray-900 placeholder-gray-400"
                    placeholder="98765 43210"
                    disabled={isLoading}
                    required
                 />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:from-sky-300 disabled:to-blue-300 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center">
               <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
               <p className="text-sm text-gray-500 mt-1">An OTP was sent to +91 {phoneNumber}</p>
            </div>
            <div>
                <input
                    type="tel" 
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full p-4 bg-sky-50 border border-sky-100 rounded-lg text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors text-gray-900 placeholder-gray-400"
                    placeholder="· · · · · ·"
                    disabled={isLoading}
                    required
                />
            </div>
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={isLoading || otp.length < 6} className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:from-sky-300 disabled:to-blue-300 disabled:cursor-not-allowed flex items-center justify-center">
               {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
               {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
             <button type="button" onClick={() => { setStep('phone'); setError(''); setOtp(''); }} className="text-sm text-center w-full text-sky-600 hover:underline disabled:text-gray-400" disabled={isLoading}>
                Change Number
             </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;