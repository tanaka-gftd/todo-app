import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard(props) {

    //ローディング表示用
    const [isLoading, setIsLoading] = useState(false);

    //フロント側でタスクリストの名前を表示する用
    const [taskListFront, setTaskListFront]= useState([]);

    //DBから情報を抽出するために、現在のユーザーID取得
    let userId = usePage().props.auth.user.id;

    //DBから、ユーザIDを条件にタスクリストの名前を取ってきて、フロント側で保存する
    const  getTaskList =  async () => {
        setIsLoading(true);
        try {
            //axiosで、バックエンドのDBからレコードを持ってくる(レスポンスが返るのをawaitで待つ)
            const response =  await axios.get(`/api/tasklist/${userId}`);
            //DBから取り出したレコードから、タスクリストの名前だけの配列を作成し、フロント側で保持する
            const taskListFromDB = response.data.map((entry) => entry.title);
            setTaskListFront([]);  //データ保持前に、一旦中身をリセット
            setTaskListFront([...taskListFromDB]);
        } catch (error){
            console.error('データを取り出せませんでした', error);
        } finally {
            setIsLoading(false);
        };
    };

    //初回レンダリング時にDBからデータを取ってくる
    useEffect(() => {
        getTaskList();
    },[]);
    
    //バックエンドとのやり取り中はローディング画面を挿入するようにしたいので、一旦タスクページ全体を変数に格納
    const MainAria = () => {
        return (
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
            >
                <Head title="タスクページ" />
    
                <div className="py-12">
                    <div className="max-w-8xl mx-auto px-8 flex justify-between">
                        <div className="p-8 bg-white shadow w-4/12">
                            <TaskPageLeftSide 
                                taskListFront={taskListFront}
                                getTaskList={getTaskList}
                            />
                        </div>
    
                        <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                            <TaskPageCenter/>
                        </div>
    
                        <div className="p-8 bg-white shadow w-4/12">
                            <TaskPageRightSide/>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    };

    //バックエンドとのやりとり中かどうかで、表示する画面を切り替える(ここで返されるのがDashBoardコンポーネント)
    return (
        <>
            {isLoading ? ( <Loading/>):(<MainAria/>)} 
        </>
    );
}