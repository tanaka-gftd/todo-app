import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';


export default function TaskPageLeftSide(props) {

    //タスクリスト名設定用モーダルの表示フラグ
    const [showTaskListModalFlag, setShowTaskListModalFlag] = useState(false);

    //タグ作成用モーダルの表示フラグ
    const [showTagModalFlag, setShowTagModalFlag] = useState(false);

    //タスクリストとタグの新規作成フォーム用
    const { setData, post, processing, reset, data } = useForm({
        newTaskListTitle:'',
        newTag:'',
        deleteTagId:'',
        deleteTagName:''
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

    //タグ作成用モーダルの表示フラグ
    const [showDeleteTagModalFlag, setShowDeleteTagModalFlag] = useState(false);

    //タグ削除用モーダルを表示する
    const openDeleteTagModal = (id, name)=> {
        /* 
            Inertia + Reactで複数のsetDataを連続で行う場合は、
                setData((data) => ({...data, プロパティA:値}));
                setData((data) => ({...data, プロパティB:値}));
                setData((data) => ({...data, プロパティC:値}));
                :
                :
            と記述する。

            もし、
                setData('プロパティ名A', 値);
                setData('プロパティ名B', 値);
                setData('プロパティ名C', 値);
            のような記述をしてしまうと、最後の行のsetDataで指定したプロパティしか更新されないので注意。
        */
        setData((data) => ({...data, deleteTagId: id}));
        setData((data) => ({...data, deleteTagName: name}));
        setShowDeleteTagModalFlag(true);
    };

    //タグ削除用モーダルを閉じる
    const closeDeleteTagModal = () => {
        reset('deleteTagId', 'deleteTagName');
        setShowDeleteTagModalFlag(false);
    };

    //バックエンドに削除するタグを送信
    const submitDeleteTag = (e) => {
        e.preventDefault();
        post(route('tag.delete'), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => {
                closeDeleteTagModal();
                props.setIsLoading(false);  //ダッシュボード画面に切り替え
            } 
        });
    };


    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p 
                    className='py-4 cursor-pointer' 
                    onClick={()=>props.setShowTask(0)}
                    style={{fontWeight: props.showTask === 0 ? 'bold' : 'normal'}}
                >
                    すべてのタスク
                </p>
                <p 
                    className='py-4 cursor-pointer' 
                    onClick={()=>props.setShowTask(1)}
                    style={{fontWeight: props.showTask === 1 ? 'bold' : 'normal'}}
                >
                    今日が期限のタスク
                </p>
                <p 
                    className='py-4 cursor-pointer' 
                    onClick={()=>props.setShowTask(2)}
                    style={{fontWeight: props.showTask === 2 ? 'bold' : 'normal'}}
                >
                    1週間以内に期限がくるタスク
                </p>
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
                            className='my-8 cursor-pointer flex items-center'
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                            </svg>
                            <p className='ml-2'>{value.task_list_title}</p>
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
                    <p className='ml-2 mr-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                        </svg>
                    </p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>

            <ul className='mt-10'>
                {props.tag.map((value, index) => { /*タグを表示していく*/
                    return (
                        <li 
                            key={index} 
                            className='my-8 flex items-center cursor-pointer'
                            onClick={()=>openDeleteTagModal(value.id, value.tag)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                            </svg>
                            <p className='ml-2'>{value.tag}</p>
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
                    <p className='mt-1 ml-2 mr-1'><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </svg>
                    </p>
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
                                maxLength="16"
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
                                maxLength="16"
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

            <Modal show={showDeleteTagModalFlag} onClose={closeDeleteTagModal}>
                <div className='mx-20 mt-10'>
                    <p className='text-2xl'>このタグを削除しますか？</p>
                    <div className='flex mt-4 text-2xl items-center'>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                        </p>
                        <p className='ml-2'>{data.deleteTagName}</p>
                    </div>

                    <div className="my-10 flex justify-between">
                        <form onSubmit={submitDeleteTag}>
                            <DangerButton className="w-48" disabled={processing}>
                                <span className='text-lg m-auto leading-10'>削除する</span>
                            </DangerButton>
                        </form>
                        <SecondaryButton className="w-48" onClick={closeDeleteTagModal}>
                            <span className='text-lg m-auto leading-10 text-blue-700'>キャンセル</span>
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}