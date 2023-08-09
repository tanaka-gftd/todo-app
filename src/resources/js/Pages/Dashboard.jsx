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

    //タスクの期限通知のために、タスクIDを保管する配列
    const over = [];  //期限過ぎ
    const justBefore = [];  //期限直前
    const soon = [];  //そろそろ期限

    //タスク期限チェック
    tasks.map((value) => {
        const deadline = new Date(value.deadline);  //期限日時のDateオブジェクト
        const now = new Date();  //現在のDateオブジェクト
        const diff = deadline.getTime() - now.getTime();  //現在から期限までのミリ秒を求める
        const millisecondDay = 1000*60*60*24;  //1日をミリ秒で換算
        
        if(!value.is_done){  //未完了のタスクのみチェック
            switch (true) {
                case diff < 0:  //期限過ぎ
                    over.push(value);
                break;
                case diff <= millisecondDay*1/2:  //期限まで残り12時間を切った
                    justBefore.push(value)
                break;
                case diff <= millisecondDay:  //期限まで残り24時間を切った
                    soon.push(value);
                break;
                default:
                break;
            };
        };
    });


    //バックエンドとのやり取り中はローディング画面に切り替わるようにしたいので、一旦タスクページ全体を変数に格納
    const MainAria = () => {

        //タスクの期限の通知がない場合は、通知用モーダルを表示させない
        if((over.length === 0)&&(justBefore.length === 0)&&(soon.length === 0)){
            setShowNotificationModalFlag(false)
        };

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

                <Modal show={showNotificationModalFlag} onClose={closeModal} addStyle={'h-3/6'}>
                    <div className='mx-20 my-10'>
                        <p onClick={()=>closeModal()} className="cursor-pointer absolute top-5 right-5 text-4xl">
                            ×
                        </p>
                        <div className="text-2xl">
                            <p className="mb-8 text-2xl">タスクの期限についての通知があります</p>
                            <div style={{display: over.length === 0 ? 'none' : ''}}>
                                <p className='mt-4'>期限を過ぎたタスク</p>
                                <ul className='border-b-2 border-neutral-400'>
                                    {over.map((value, index)=>{
                                        return (
                                            <li key={index} className='mt-2'>
                                                <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                                <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                                <p className="text-xl ml-10">期限：{value.deadline} </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div style={{display: justBefore.length === 0 ? 'none' : ''}}>
                                <p className='mt-4'>期限直前のタスク（期限まで12時間以下）</p>
                                <ul className='border-b-2 border-neutral-400'>
                                    {justBefore.map((value, index)=>{
                                        return (
                                            <li key={index} className='mt-2'>
                                                <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                                <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                                <p className="text-xl ml-10">期限：{value.deadline} </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div style={{display: soon.length === 0 ? 'none' : ''}}>
                                <p className='mt-4'>そろそろ期限のタスク（期限まで24時間以下）</p>
                                <ul className='border-b-2 border-neutral-400'>
                                    {soon.map((value, index)=>{
                                        return (
                                            <li key={index} className='mt-2'>
                                                <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                                <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                                <p className="text-xl ml-10">期限：{value.deadline} </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
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