import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';


export default function TaskPageLeftSide(props) {

    //タスクリスト名設定用モーダルの表示フラグ
    const [showTaskListModalFlag, setShowTaskListModalFlag] = useState(false);

    //タスクリストの新規作成のフォーム用
    const { setData, post, processing, reset } = useForm({
        newTaskListTitle:''
    });

    //タスクリスト名設定用モーダルを表示する
    const openTaskListModal = ()=> {
        setShowTaskListModalFlag(true);
    };

    //タスクリスト名設定用モーダルを閉じる
    const closeModal = () => {
        reset('newTaskListTitle');
        setShowTaskListModalFlag(false);
    };

    //モーダルウィンドウ内のフォームに入力された文字列を保持する
    const handleOnChange = (e) => {
        setData('newTaskListTitle', e.target.value);
    };

    //バックエンドに新しく作成したタスクリストの名前を送信
    const submit = (e) => {
        e.preventDefault();
        post(route('tasklist.register'), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => {
                closeModal();
                props.setIsLoading(false);  //ダッシュボード画面に切り替え
            } 
        });
    };


    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p className='py-4'>すべて</p>
                <p className='py-4'>今日</p>
                <p className='py-4'>次の7日間</p>
            </div>

            <ul className='mt-28'>
                {props.taskLists.map((value, index) => { /*タスクリストの名前を表示していく*/
                    return (
                        <li 
                            onClick={()=>{
                                props.setClickedTaskListId(value.id)
                                props.setClickedTaskListTitle(value.task_list_title)
                            }} 
                            key={index} 
                            style={{fontWeight: props.clickedTaskId === value.id ? 'bold' : 'normal'}}
                            className='my-8 cursor-pointer'
                        >
                            {value.task_list_title}
                        </li>
                    );
                })}
            </ul>
            
            <div>
                <SecondaryButton 
                    className='mt-4 mb-8 border-solid border-2 border-blue-500'
                    onClick={()=>openTaskListModal()}
                >
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>

            <Modal show={showTaskListModalFlag} onClose={closeModal}>
                <div className='mx-20 mt-10'>
                    <form className="p-6" onSubmit={submit}>
                        <div className="">
                            <InputLabel htmlFor="newTaskListTitle" value="newTaskListTitle" className="sr-only" />
                            <TextInput
                                id="newTaskListTitle"
                                type="text"
                                name="newTaskListTitle"
                                className="text-2xl w-full leading-5 py-4"
                                isFocused
                                placeholder="新規のリスト名"
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                        <div className="my-10 flex justify-between">
                            <SecondaryButton className="w-48" onClick={closeModal}>
                                <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                            </SecondaryButton>
                            <PrimaryButton className="w-48" disabled={processing}>
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