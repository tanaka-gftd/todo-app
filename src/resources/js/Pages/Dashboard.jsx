import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState } from 'react';
import Loading from '@/Components/Loading';
import NotificationModal from './TaskPageParts/NotificationModal';


export default function Dashboard(props) {

    //DBからpropsでタスクリストを受け取り、フロント側で保管
    const taskLists = props.taskLists;

    //DBからpropsでタスクを受け取り、フロント側で保管
    const tasks = props.tasks;

    //DBからpropsでタグを受け取り、フロント側で保管
    const tag = props.tag;

    //ローディング画面表示のフラグ(trueでローディング画面に切り替えるようにする)
    const [isLoading, setIsLoading] = useState(false);

    //クリックしたタスクリストのIDを保管する
    const [clickedTaskListId, setClickedTaskListId] = useState();

    //クリックしたタスクリストの名前を保管する
    const [clickedTaskListTitle, setClickedTaskListTitle] = useState();

    //クリックしたタスクのIDを保管する
    const [clickedTaskId, setClickedTaskId] = useState();

    //タスクの期限が迫っていることを知らせる通知用モーダルの表示フラグ(初期値はtrueで表示)
    const [showNotificationModalFlag, setShowNotificationModalFlag] = useState(true);

    //期限に合わせてタスクの表示を切り替えるフラグ 
    //「すべてのタスク」が1、「今日が期限のタスク」が2、「1週間以内に期限がくるタスク」が3
    //(stateに0を指定した場合はうまく動作しない？)
    const [showTask, setShowTask] = useState();

    //期限が今日までのタスクを格納する配列
    const todayTask = [];

    //期限が1週間以内のタスクを格納する配列
    const weekTask = [];


    /* 
        バックエンドとのやり取り中はローディング画面に切り替わるようにしたいので、
        タスクページの内、表示を担う部分はMainAriaコンポーネントとして定義しておく。

        また、バックエンドからデータを貰うのはDashboardコンポーネントなので、
        バックエンドからのデータを表示する（正確には表示をする各コンポーネントの親となる）MainAriaコンポーネントは、
        Dashboardコンポーネント内で定義しておく。
        こうした方が、バックエンドからのデータを子コンポーネントへとpropsで渡しやすい。
    */
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
                                tag={tag}
                                clickedTaskListId={clickedTaskListId}
                                setClickedTaskId={setClickedTaskId}
                                setClickedTaskListId={setClickedTaskListId}
                                setClickedTaskListTitle={setClickedTaskListTitle}
                                setIsLoading={setIsLoading}
                                showTask={showTask}
                                setShowTask={setShowTask}
                            />
                        </div>
    
                        <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                            <TaskPageCenter
                                tasks={tasks}
                                tag={tag}
                                taskLists={taskLists}
                                clickedTaskListId={clickedTaskListId}
                                clickedTaskListTitle={clickedTaskListTitle}
                                setClickedTaskId={setClickedTaskId}
                                setIsLoading={setIsLoading}
                                clickedTaskId={clickedTaskId}
                                todayTask={todayTask}
                                weekTask={weekTask}
                                showTask={showTask}
                                setClickedTaskListId={setClickedTaskListId}
                            />
                        </div>
    
                        <div className="p-8 bg-white shadow w-4/12">
                            <TaskPageRightSide
                                tasks={tasks}
                                clickedTaskId={clickedTaskId}
                                setIsLoading={setIsLoading}
                            />
                        </div>
                    </div>
                </div>

                <NotificationModal 
                    tasks={tasks}
                    showNotificationModalFlag={showNotificationModalFlag}
                    setShowNotificationModalFlag={setShowNotificationModalFlag}
                />
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