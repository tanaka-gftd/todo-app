import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import Checkbox from "@/Components/Checkbox";


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
            isDone: false, //初期値は未達成を示すfalse
            tagsArray: []
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

        //タグはチェックボックスで設定
        const handleOnCheckbox = (e) => {
            //チェックしたら追加、チェックを外したら削除
            if(e.target.checked){
                setData('tagsArray', [...data.tagsArray, e.target.value]);
            } else {
                setData(
                    'tagsArray', 
                    data.tagsArray.filter((item) => {
                        return item !== e.target.value;
                    })
                );
            }
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
                <p className='text-2xl mt-4'>タスクリスト名</p>
                <div className="flex justify-between mb-10">
                    <p className='text-3xl mt-2'>{props.clickedTaskListTitle}</p>
                    <SecondaryButton 
                        className='border-solid border-2 border-blue-500'
                        onClick={()=>showTaskDetailModal()}
                    >
                        <p className='text-xl text-blue-700 mt-1'>＋</p>
                        <p className='text-xl text-blue-700 mt-1'>タスクを追加</p>
                    </SecondaryButton>
                </div>

                <p className='text-2xl mt-10 border-b-2 border-neutral-400'>タスク一覧</p>

                <ul className='mt-2'>
                    {props.tasks.map((value, index) => {
                        //表示するタスクは、左エリアでクリックされたタスクリストのIDと一致しているものだけとする
                        if(value.task_list_id === props.clickedTaskListId){
                            return (
                                <li 
                                    key={index} 
                                    className='border-b-2 border-neutral-400 mt-4'
                                    onClick={()=>{props.setClickedTaskId(value.task_id)}} 
                                >
                                    <div className="flex items-center">
                                        <p>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"><path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/></svg>
                                        </p>
                                        <p 
                                            className="text-3xl cursor-pointer ml-2"
                                            style={{fontWeight: props.clickedTaskId === value.task_id ? 'bold' : 'normal'}}
                                        >
                                            {value.task_name}
                                        </p>
                                    </div>
                                    
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
                                    type="datetime-local" /* datetime-localのタイムゾーンは、ユーザーのローカル*/
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

                            <p className='mt-5 text-xl'>一つのタスクにタブは二つまで設定できます</p>
                            <p className='text-xl'>（タグ設定なし可）</p>
                            <div className='flex flex-wrap'>
                                {props.tag.map((value, index) => { /*タグを選ぶチェックボックス表示していく*/
                                    return (
                                        <label className='flex items-center mr-10 mt-2' key={index}>
                                            <Checkbox 
                                                name='tagsArray' 
                                                value={value.id} 
                                                onChange={handleOnCheckbox}
                                                className='mr-2'
                                            />
                                            <p className='mr-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                                </svg>
                                            </p>
                                            <p className='text-2xl'>{value.tag}</p>
                                        </label>
                                    );
                                })}
                            </div>
                            
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
                    (<p className='text-xl py-4'>タスクリストを作成してください</p>)
                    :(<p className='text-xl py-4'>タスクリストを選択してください</p>)
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