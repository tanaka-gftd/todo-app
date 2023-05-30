import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => {
    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>ページコンポーネント</div>
                        <div className='card-body'>これは遷移確認用ページコンポーネントです</div>
                        <Link to={'/'} className='btn btn-primary'>Homeへ遷移</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;