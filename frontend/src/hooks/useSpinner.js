import { useState } from 'react'

const useSpinner = () => {
    const [isLoading, setIsLoading] = useState(null);

    const spinner = () => {
        setIsLoading(true);
           // Simulate a loading state
           const timer = setTimeout(() => {
            setIsLoading(false);
          }, 2000);
      
          return () => clearTimeout(timer);
    }
   

  return {spinner, isLoading};
}

export default useSpinner