import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';


export default function TaskPageCenter(props) {

    //タスク詳細設定用モーダルの表示フラグ
    const [showTaskDetailModalFlag, setShowTaskDetailModalFlag] = useState(false);

    //タスク詳細設定用モーダルを表示する
    const showTaskDetailModal = () => {
        setShowTaskDetailModalFlag(true);
    };

    //タスク詳細設定用モーダルを閉じる
    const closeModal = () => {
        setShowTaskDetailModalFlag(false);
    };

    const ClickedTaskList = () => {
        return (
            <>
                <div className="flex justify-between">
                    <p className='text-4xl mt-4'>{props.taskIdAndTitle[1]}</p>
                    <SecondaryButton 
                        className='mt-4 border-solid border-2 border-blue-500'
                        onClick={()=>showTaskDetailModal()}
                    >
                        <p className='text-xl text-blue-700 mt-1'>＋</p>
                        <p className='text-xl text-blue-700 mt-1'>タスクを追加</p>
                    </SecondaryButton>
                </div>

                <Modal show={showTaskDetailModalFlag}>
                    <div className='mx-20 my-10'>
                        <form>
                            <InputLabel htmlFor="taskName" value="taskName" className="sr-only" />
                            <TextInput
                                id="taskName"
                                type="text"
                                name="taskName"
                                className="text-2xl w-full leading-5 py-4 my-5"
                                placeholder="タスクを追加"
                            />
                            <InputLabel htmlFor="comment" value="comment" className="sr-only" />
                            <TextInput
                                id="comment"
                                type="text"
                                name="comment"
                                className="text-2xl w-full leading-5 py-4 my-5"
                                placeholder="コメント"
                            />
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
            {props.taskIdAndTitle ? (<ClickedTaskList/>) : (<UnsetTaskList/>)}
        </div>
    );
}