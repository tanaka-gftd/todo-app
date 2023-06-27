import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TaskPageLeftSide() {

    //タスクリストをリスト表示するために、個々のリストタイトルを配列で保持
    const [listTitleArray, setListTitleArray] = useState([]);

    //タスク追加用モーダルの表示フラグ
    const [showTaskModalFlag, setShowTaskModalFlag] = useState(false);

    //リストの要素を作成する関数
    const taskList = (listTitle, index) => {
        return (
            <div className='py-4' key={index}>{listTitle}</div>    
        )
    };

    //タスク追加モーダルを表示する
    const openTaskModal = ()=> {
        setShowTaskModalFlag(true);
    };

    //タスクリストに、新しい要素を追加(仮)
    const addTaskList = () => {
        closeModal();
        setListTitleArray([...listTitleArray, 'text'])
    };

    //タスク追加モーダルを閉じる
    const closeModal = () => {
        setShowTaskModalFlag(false);
    };


    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p className='py-4'>すべて</p>
                <p className='py-4'>今日</p>
                <p className='py-4'>次の7日間</p>
            </div>

            <div>
                <ul>
                    <li>
                        {listTitleArray.map((value, index) => taskList(value, index))}
                    </li>
                </ul>
                <SecondaryButton 
                    className='mt-4 mb-8 border-solid border-2 border-blue-500'
                    onClick={()=>openTaskModal()}
                >
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>

            <Modal show={showTaskModalFlag}>
                <div className='mx-20 mt-10'>
                    <form className="p-6">
                        <div className="">
                            <InputLabel htmlFor="text" value="text" className="sr-only" />
                            <TextInput
                                id="text"
                                type="text"
                                name="text"
                                className="text-2xl w-full leading-5 py-4"
                                isFocused
                                placeholder="リスト名"
                            />
                        </div>

                        <div className="my-10 flex justify-between">
                            <SecondaryButton className="w-48" onClick={closeModal}>
                                <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                            </SecondaryButton>
                            <PrimaryButton type='button' className="w-48" onClick={addTaskList}>
                                <span className='text-lg m-auto leading-10'>リストを作成</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <div>
                <p className='py-4'>タグ1</p>
                <p className='py-4'>タグ2</p>
            </div>
        </div>
    )
}