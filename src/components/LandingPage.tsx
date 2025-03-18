import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black w-full">
        <div className="absolute inset-0 w-full">
          <img 
            className="object-cover w-full h-full" 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop" 
            alt="Luxury Hotel" 
          />
        </div>

        <div className="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>
        <div className="absolute inset-0 block bg-black/60 md:hidden"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left md:max-w-xl lg:max-w-2xl md:pl-8">
            <p className="text-lg font-semibold text-white/90">BY INSPIRED HOSPITALITY</p>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Transform Your Hotel Audits with Digital Excellence
            </h2>
            <p className="mt-4 text-base text-gray-200">
              Streamline your hospitality audits with our comprehensive digital solution. 
              Track, manage, and elevate your service standards with ease.
            </p>

            <form action="#" method="POST" className="mt-8 lg:mt-12">
              <div className="flex flex-col items-center sm:flex-row sm:justify-start max-w-md">
                <div className="flex-1 w-full">
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="block w-full h-[50px] pl-10 pr-4 text-base text-black placeholder-gray-500 transition-all duration-200 bg-white border-gray-200 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/signin')}
                  className="w-full sm:w-auto mt-4 sm:mt-0 sm:rounded-l-none h-[50px] px-8 font-medium"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
              Everything you need for world-class hospitality audits
            </h2>
          </div>

          <div className="grid grid-cols-1 text-center sm:grid-cols-2 gap-y-8 lg:grid-cols-4 sm:gap-12 mt-12">
            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-primary/10 rounded-full">
                <svg className="text-primary w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold">Real-time Tracking</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Monitor audit progress in real-time with detailed analytics and actionable insights.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-orange-100 rounded-full">
                <svg className="text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold">Customizable Standards</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Tailor audit criteria to your brand's unique service standards and requirements.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
                <svg className="text-green-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold">Comprehensive Reports</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Generate detailed reports with recommendations to maintain service excellence.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-blue-100 rounded-full">
                <svg className="text-blue-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold">Fast & Efficient</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Streamline your audit process with our intuitive and responsive platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Partners Section */}
      <section className="py-10 bg-muted/30 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold sm:text-4xl">
              Trusted by World-Class Hotels & Resorts
            </h2>
          </div>

          <div className="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
            <div className="flex items-center justify-center">
              <img className="object-contain w-full h-8" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop" alt="Hotel Partner" />
            </div>
            <div className="flex items-center justify-center">
              <img className="object-contain w-full h-8" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop" alt="Hotel Partner" />
            </div>
            <div className="flex items-center justify-center">
              <img className="object-contain w-full h-8" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop" alt="Hotel Partner" />
            </div>
            <div className="flex items-center justify-center">
              <img className="object-contain w-full h-8" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop" alt="Hotel Partner" />
            </div>
          </div>

          <p className="mt-10 text-base text-center text-muted-foreground md:mt-20">
            and many more luxury properties worldwide
          </p>
        </div>
      </section>
    </div>
  );
};
