import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';


export default function TaskPageCenter(props) {

    //タスクリストをクリックした後に表示
    const ClickedTaskList = () => {

        //タスク詳細設定フォーム用
        const { data, setData, post, processing, reset } = useForm({
            taskListId: props.clickedTaskListId,  //選択されたタスクリストのID
            taskName: '',
            priority: "0",  //優先度の初期値は0(優先度なし) *セレクトボックスのvalueにint型は設定できない？
            deadline: '',
            comment: '',
            isDone: false  //初期値は未達成を示すfalse
        });

         //タスク詳細設定用モーダルの表示フラグ
        const [showTaskDetailModalFlag, setShowTaskDetailModalFlag] = useState(false);

        //タスク詳細設定用モーダルを表示する
        const showTaskDetailModal = () => {
            setShowTaskDetailModalFlag(true);
        };

        //タスク詳細設定用モーダルを閉じる
        const closeModal = () => {
            reset('taskListId', 'taskName', 'priority', 'deadline', 'comment');
            setShowTaskDetailModalFlag(false);
        };

        //入力された内容や選ばれた内容を保持
        const handleOnChange = (e) => {
            setData(e.target.name, e.target.value);
        };

        //タスクを登録
        const submit = (e) => {
            e.preventDefault();
            //tasklistのIDをURLパラメータとして送信
            post(route('task.register', data.taskListId), {
                onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
                onError: (errors) => {console.error(errors)},
                onFinish: () => props.setIsLoading(false)  //ダッシュボード画面に切り替え
            });
        };

        //優先度表示用コンポーネントを作成、propsで優先度を表す数値を受け取っている
        //switch構文によるレンダーは出来ないようなので、else ifで対処する
        const PriorityColor = ({num}) => {
            if(num === 3){
                return (<p className='text-green-500'>優先度 低</p>)
            } else if(num === 2){
                return (<p className='text-yellow-600'>優先度 中</p>)
            } else if(num === 1){
                return (<p className='text-red-500'>優先度 高</p>)
            } else {
                return (<p>優先度 なし</p>)
            }
        };


        return (
            <>
                <div className="flex justify-between">
                    <p className='text-4xl mt-4'>{props.clickedTaskListTitle}</p>
                    <SecondaryButton 
                        className='mt-4 border-solid border-2 border-blue-500'
                        onClick={()=>showTaskDetailModal()}
                    >
                        <p className='text-xl text-blue-700 mt-1'>＋</p>
                        <p className='text-xl text-blue-700 mt-1'>タスクを追加</p>
                    </SecondaryButton>
                </div>

                <ul className='mt-16'>
                    {props.tasks.map((value, index) => {
                        //表示するタスクは、左エリアでクリックされたタスクリストのIDと一致しているものだけとする
                        if(value.task_list_id === props.clickedTaskListId){
                            return (
                                <li 
                                    key={index} 
                                    className='border-b-2 border-neutral-400 mt-4'
                                    onClick={()=>{props.setClickedTaskId(value.task_id)}} 
                                >
                                    <p 
                                        className="text-3xl cursor-pointer"
                                        style={{fontWeight: props.clickedTaskId === value.task_id ? 'bold' : 'normal'}}
                                    >
                                        {value.task_name}
                                    </p>
                                    <div className="flex my-2 text-2xl">
                                        <p className="mr-4">期限</p>
                                        <p className='mr-12'>{value.deadline}</p>
                                        <PriorityColor num={value.priority}/>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>

                <Modal show={showTaskDetailModalFlag} onClose={closeModal}>
                    <div className='mx-20 my-10'>
                        <form onSubmit={submit}>
                            <InputLabel htmlFor="taskName" value="taskName" className="sr-only" />
                            <TextInput
                                id="taskName"
                                type="text"
                                name="taskName"
                                className="text-2xl w-full leading-5 py-4 my-5"
                                placeholder="タスクを追加"
                                onChange={handleOnChange}
                                required
                            />

                            <div className="flex justify-left items-center mt-5">
                                <InputLabel  htmlFor="priority" value="優先度" className="text-xl mr-10"/>
                                <select 
                                    name="priority" 
                                    className="text-xl" 
                                    onChange={handleOnChange} 
                                    required
                                >
                                    <option value="0">なし</option>
                                    <option value="1">高</option>
                                    <option value="2">中</option>
                                    <option value="3">低</option>
                                </select>
                            </div>

                            <div className="flex justify-left items-center mt-10 mb-20">
                                <InputLabel  htmlFor="deadline" value="期限" className="text-xl mr-10"/>
                                <input 
                                    name="deadline" 
                                    type="date" /* ここで送信される日付はUTC(協定世界時)なので注意 */
                                    className="text-xl" 
                                    onChange={handleOnChange} 
                                    required
                                />
                            </div>

                            <InputLabel htmlFor="comment" value="comment" className="sr-only" />
                            <TextInput
                                id="comment"
                                type="text"
                                name="comment"
                                className="text-2xl w-full leading-5 py-4 my-5"
                                placeholder="コメント"
                                onChange={handleOnChange}
                                required
                            />

                            <div className="my-10 flex justify-end">
                                <PrimaryButton className="w-48">
                                    <span className='text-lg m-auto leading-10' disabled={processing}>タスクを登録</span>
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    <p 
                        onClick={()=>closeModal()}
                        className="cursor-pointer absolute top-5 right-5 text-4xl"
                    >
                        ×
                    </p>
                </Modal>
            </>
        );
    };


    //タスクリスト未作成 or タスクリスト未選択の時に表示
    //タスクリスト未作成か、タスクリスト未選択の判定には、props.taskLists(配列)のlengthで判定
    const UnsetTaskList = () => {
        return (
            <>
                {props.taskLists.length === 0 ?
                    (<p className='text-2xl py-4'>タスクリストを作成してください</p>)
                    :(<p className='text-2xl py-4'>タスクリストを選択してください</p>)
                }
            </>
        );
    };


    //ページ左側のタスクリストをクリックしたかどうかで、表示を切り替える
    return (
        <>
            {props.clickedTaskListId ? (<ClickedTaskList/>) : (<UnsetTaskList/>)}
        </>
    );
}