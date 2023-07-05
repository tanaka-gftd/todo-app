import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState } from 'react';
import Loading from '@/Components/Loading';

export default function Dashboard(props) {
    //ローディング表示用
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading)
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="タスクページ" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto px-8 flex justify-between">
                    <div className="p-8 bg-white shadow w-4/12">
                        <TaskPageLeftSide setIsLoading={setIsLoading}/>
                    </div>

                    <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                        <TaskPageCenter/>
                    </div>

                    <div className="p-8 bg-white shadow w-4/12">
                        <TaskPageRightSide/>
                    </div>
                </div>
            </div>

            {isLoading ? ( <Loading/>):(<>ローディング終了確認</>)}
        </AuthenticatedLayout>
    );
}