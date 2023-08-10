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

    //タグ作成用モーダルの表示フラグ
    const [showTagModalFlag, setShowTagModalFlag] = useState(false);

    //タスクリストとタグの新規作成フォーム用
    const { setData, post, processing, reset } = useForm({
        newTaskListTitle:'',
        newTag:''
    });

    //タスクリスト名設定用モーダルを表示する
    const openTaskListModal = ()=> {
        setShowTaskListModalFlag(true);
    };

    //タスクリスト名設定用モーダルを閉じる
    const closeTaskListModal = () => {
        reset('newTaskListTitle');
        setShowTaskListModalFlag(false);
    };

    //モーダルウィンドウ内のフォームに入力された文字列を保持する
    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    //バックエンドに新しく作成したタスクリストの名前を送信
    const submitNewTaskList = (e) => {
        e.preventDefault();
        post(route('tasklist.register'), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => {
                closeTaskListModal();
                props.setIsLoading(false);  //ダッシュボード画面に切り替え
            } 
        });
    };

    //タグ作成用モーダルを表示する
    const openTagModal = ()=> {
        setShowTagModalFlag(true);
    };

    //タグ作成用モーダルを閉じる
    const closeTagModal = () => {
        reset('newTag');
        setShowTagModalFlag(false);
    };

    //バックエンドに新しく作成したタグを送信
    const submitNewTag = (e) => {
        e.preventDefault();
        post(route('tag.register'), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => {
                closeTagModal();
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
                                props.setClickedTaskId(''); //タスクリストを変更したら、リセット
                                props.setClickedTaskListId(value.id)
                                props.setClickedTaskListTitle(value.task_list_title)
                            }} 
                            key={index} 
                            style={{fontWeight: props.clickedTaskListId === value.id ? 'bold' : 'normal'}}
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

            <ul className='mt-10'>
                {props.tag.map((value, index) => { /*タグを表示していく*/
                    return (
                        <li 
                            key={index} 
                            className='my-8'
                        >
                            {value.tag}
                        </li>
                    );
                })}
            </ul>

            <div>
                <SecondaryButton 
                    className='mt-4 mb-8 border-solid border-2 border-blue-500'
                    onClick={()=>openTagModal()}
                >
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>タグを追加</p>
                </SecondaryButton>
            </div>

            <Modal show={showTaskListModalFlag} onClose={closeTaskListModal}>
                <div className='mx-20 mt-10'>
                    <form className="p-6" onSubmit={submitNewTaskList}>
                        <div>
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
                            <SecondaryButton className="w-48" onClick={closeTaskListModal}>
                                <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                            </SecondaryButton>
                            <PrimaryButton className="w-48" disabled={processing}>
                                <span className='text-lg m-auto leading-10'>リストを作成</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal show={showTagModalFlag} onClose={closeTagModal}>
                <div className='mx-20 mt-10'>
                    <form className="p-6" onSubmit={submitNewTag}>
                        <div>
                            <InputLabel htmlFor="newTag" value="newTag" className="sr-only" />
                            <TextInput
                                id="newTag"
                                type="text"
                                name="newTag"
                                className="text-2xl w-full leading-5 py-4"
                                isFocused
                                placeholder="新規のタグ"
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                        <div className="my-10 flex justify-between">
                            <SecondaryButton className="w-48" onClick={closeTagModal}>
                                <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                            </SecondaryButton>
                            <PrimaryButton className="w-48" disabled={processing}>
                                <span className='text-lg m-auto leading-10'>タグを作成</span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}