import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState } from 'react';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';


export default function Dashboard(props) {

    //DBからpropsでタスクリストを受け取り、フロント側で保管
    const taskLists = props.taskLists;

    //DBからpropsでタスクを受け取り、フロント側で保管
    const tasks = props.tasks;

    //ローディング画面表示のフラグ(trueでローディング画面に切り替えるようにする)
    const [isLoading, setIsLoading] = useState(false);

    //クリックしたタスクリストのIDを保管する
    const [clickedTaskListId, setClickedTaskListId] = useState();

    //クリックしたタスクリストの名前を保管する
    const [clickedTaskListTitle, setClickedTaskListTitle] = useState();

    //クリックしたタスクのIDを保管する
    const [clickedTaskId, setClickedTaskId] = useState();

    //タスクの期限が迫っていることを知らせる通知用モーダルの表示フラグ
    const [showNotificationModalFlag, setShowNotificationModalFlag] = useState(true);

    //タスクリスト名設定用モーダルを閉じる
    const closeModal = () => {
        setShowNotificationModalFlag(false);
    };


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
                                clickedTaskListId={clickedTaskListId}
                                setClickedTaskId={setClickedTaskId}
                                setClickedTaskListId={setClickedTaskListId}
                                setClickedTaskListTitle={setClickedTaskListTitle}
                                setIsLoading={setIsLoading}
                            />
                        </div>
    
                        <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                            <TaskPageCenter
                                tasks={tasks}
                                taskLists={taskLists}
                                clickedTaskListId={clickedTaskListId}
                                clickedTaskListTitle={clickedTaskListTitle}
                                setClickedTaskId={setClickedTaskId}
                                setIsLoading={setIsLoading}
                                clickedTaskId={clickedTaskId}
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

                <Modal show={showNotificationModalFlag} onClose={closeModal}>
                    <div className='mx-20 my-10'>
                        <p onClick={()=>closeModal()} className="cursor-pointer absolute top-5 right-5 text-4xl">
                            ×
                        </p>
                        <p className="text-2xl">期限が迫っているタスクがあります。</p>
                        <p className="text-2xl">以下のタスクを確認してください。</p>
                    </div>
                </Modal>
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