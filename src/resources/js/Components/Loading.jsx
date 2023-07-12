import { Circles } from 'react-loader-spinner';

export default  function Loading(){
    return (
        <div 
            className='absolute top-0 h-full w-screen bg-gray-200 flex items-center justify-center'
        >
            <Circles
                height="120"
                width="120"
                color="rgb(59 130 246)"
                ariaLabel="circles-loading"
                visible={true}
            />
        </div>
    );
} 