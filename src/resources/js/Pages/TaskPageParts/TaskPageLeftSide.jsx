import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TaskPageLeftSide(props) {

    //タスクリスト名設定用モーダルの表示フラグ
    const [showTaskListModalFlag, setShowTaskListModalFlag] = useState(false);

    //新しいタスクリストの名前用
    const [newTaskListTitle, setNewTaskListTitle] = useState('');

    //多重クリック防止用(inProcessingがtrueで処理中を表す → 処理中はクリック禁止)
    const [inProcessing, setInProcessing] = useState(false);

    //タスクリスト名設定用モーダルを表示する
    const openTaskModal = ()=> {
        setShowTaskListModalFlag(true);
    };

    //タスクリスト名設定用モーダルを閉じる
    const closeModal = () => {
        setNewTaskListTitle('');  //newTaskListTitleに格納された文字列をリセット
        setShowTaskListModalFlag(false);
    };

    //モーダルウィンドウ内のフォームに入力された文字列を保持する
    const handleOnChange = (e) => {
        setNewTaskListTitle(e.target.value);
    };

    //バックエンドに新しく作成したタスクリストの名前を送信
    const submit = async (e) => {
        setInProcessing(true); //わずかな時間でも多重クリックできてしまうので、多重クリック防止処理を先に行う
        e.preventDefault();
        try {
            //DBへ登録（inertia.jsではpost送信をawaitできない？ようなので、代わりにaxiosでawaitする）
            await axios.post('/api/tasklist/create', { NewTaskListTitle : newTaskListTitle });
        } catch(error) {
            console.error('データを登録できませんでした', error);
        } finally {
            closeModal();
            setInProcessing(false);
            props.getTaskList();
        };
    };


    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p className='py-4'>すべて</p>
                <p className='py-4'>今日</p>
                <p className='py-4'>次の7日間</p>
            </div>

            <ul className='mt-28'>
                {props.taskListFront.map((idAndTitle, index) => {
                    //タスクリストの名前を表示していく
                    return (
                        <li onClick={()=>props.clickTaskList(idAndTitle)} 
                            key={index} 
                            style={{fontWeight: props.clickedTaskId === idAndTitle[0] ? 'bold' : 'normal'}}
                            className='my-8 cursor-pointer'
                        >
                            {idAndTitle[1]}
                        </li>
                    );
                })}
            </ul>
            
            <div>
                <SecondaryButton 
                    className='mt-4 mb-8 border-solid border-2 border-blue-500'
                    onClick={()=>openTaskModal()}
                >
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>

            <Modal show={showTaskListModalFlag} onClose={closeModal}>
                <div className='mx-20 mt-10'>
                    <form className="p-6" onSubmit={submit}>
                        <div className="">
                            <InputLabel htmlFor="text" value="text" className="sr-only" />
                            <TextInput
                                id="text"
                                type="text"
                                name="text"
                                className="text-2xl w-full leading-5 py-4"
                                isFocused
                                placeholder="リスト名"
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                        <div className="my-10 flex justify-between">
                            <SecondaryButton className="w-48" onClick={closeModal}>
                                <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                            </SecondaryButton>
                            <PrimaryButton className="w-48" disabled={inProcessing}>
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
    );
}