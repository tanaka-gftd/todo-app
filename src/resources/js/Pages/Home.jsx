import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">ホームコンポネント</div>
                        <div className="card-body">これは遷移確認用ホームコンポーネントです</div>
                        <Link to={'/page'} className='btn btn-primary'>Pageへ遷移</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;