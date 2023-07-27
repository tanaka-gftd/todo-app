import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState } from 'react';
import Loading from '@/Components/Loading';


export default function Dashboard(props) {

    //DBからpropsでタスクリストを受け取り、フロント側で保管
    const taskLists = props.taskLists;

    //DBからpropsでタスクを受け取り、フロント側で保管
    const tasks = props.tasks;

    //ローディング画面表示のフラグ(trueでローディング画面に切り替えるようにする)
    const [isLoading, setIsLoading] = useState(false);

     //クリックしたタスクリストのタスクIDを保管する
    const [clickedTaskListId, setClickedTaskListId] = useState();

    //クリックしたタスクリストの名前を保管する
    const [clickedTaskListTitle, setClickedTaskListTitle] = useState();


    //バックエンドとのやり取り中はローディング画面に切り替わるようにしたいので、一旦タスクページ全体を変数に格納
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
                                taskLists={taskLists}
                                clickedTaskId={clickedTaskListId}
                                setClickedTaskListId={setClickedTaskListId}
                                setClickedTaskListTitle={setClickedTaskListTitle}
                                setIsLoading={setIsLoading}
                                
                            />
                        </div>
    
                        <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                            <TaskPageCenter
                                taskLists={taskLists}
                                tasks={tasks}
                                clickedTaskListId={clickedTaskListId}
                                clickedTaskListTitle={clickedTaskListTitle}
                                setIsLoading={setIsLoading}
                            />
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
            {isLoading ? (<Loading/>):(<MainAria/>)} 
        </>
    );
}