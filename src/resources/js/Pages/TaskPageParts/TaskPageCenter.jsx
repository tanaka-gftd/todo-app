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

        const { data, setData, post, processing, errors, reset } = useForm({
            taskID: props.taskListIdAndTitle[0],
            taskName: '',
            priority: '',
            deadline: '',
            comment: '',
            isDone: false
        });

         //タスク詳細設定用モーダルの表示フラグ
        const [showTaskDetailModalFlag, setShowTaskDetailModalFlag] = useState(false);

        //タスク詳細設定用モーダルを表示する
        const showTaskDetailModal = () => {
            setShowTaskDetailModalFlag(true);
        };

        //タスク詳細設定用モーダルを閉じる
        const closeModal = () => {
            reset('taskID', 'taskName', 'priority', 'deadline', 'comment');
            setShowTaskDetailModalFlag(false);
        };

        //入力された内容や選ばれた内容を保持
        const handleOnChange = (e) => {
            setData(e.target.name, e.target.value);
        };

        return (
            <>
                <div className="flex justify-between">
                    <p className='text-4xl mt-4'>{props.taskListIdAndTitle[1]}</p>
                    <SecondaryButton 
                        className='mt-4 border-solid border-2 border-blue-500'
                        onClick={()=>showTaskDetailModal()}
                    >
                        <p className='text-xl text-blue-700 mt-1'>＋</p>
                        <p className='text-xl text-blue-700 mt-1'>タスクを追加</p>
                    </SecondaryButton>
                </div>

                <Modal show={showTaskDetailModalFlag} onClose={closeModal}>
                    <div className='mx-20 my-10'>
                        <form>
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
                                    <option value="0">高</option>
                                    <option value="1">中</option>
                                    <option value="2">低</option>
                                    <option value="3">なし</option>
                                </select>
                            </div>

                            <div className="flex justify-left items-center mt-10 mb-20">
                                <InputLabel  htmlFor="deadline" value="期限" className="text-xl mr-10"/>
                                <input 
                                    name="deadline" 
                                    type="date" 
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
                                    <span className='text-lg m-auto leading-10'>タスクを登録</span>
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
    const UnsetTaskList = () => {
        return (
            <>
                {props.taskListFront.length === 0 ?
                    (<p className='text-2xl py-4'>タスクリストを作成してください</p>)
                    :(<p className='text-2xl py-4'>タスクリストを選択してください</p>)
                }
            </>
        );
    };


    return (
        <div>
            {props.taskListIdAndTitle ? (<ClickedTaskList/>) : (<UnsetTaskList/>)}
        </div>
    );
}