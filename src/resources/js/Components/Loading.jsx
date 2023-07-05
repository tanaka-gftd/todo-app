import { Oval } from 'react-loader-spinner';

export default  function Loading(){
    return (
      <div 
          className='absolute top-0  h-screen w-screen bg-gray-500/75 flex items-center justify-center z-50'
      >
          <div>
              <Oval
                  ariaLabel="loading-indicator"
                  height={100}
                  width={100}
                  strokeWidth={5}
                  strokeWidthSecondary={1}
                  color="#3b82f6"
                  secondaryColor="#f3f4f6"
              />
          </div>
      </div>
    );
} 