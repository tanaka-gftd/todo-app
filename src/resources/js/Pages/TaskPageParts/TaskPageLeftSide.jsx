import { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function TaskPageLeftSide(props) {


    //タスクリスト名設定用モーダルの表示フラグ
    const [showTaskModalFlag, setShowTaskModalFlag] = useState(false);

    //モーダルウィンドウ内のタスクリストの名前入力フォーム用
    const {data, setData, post, processing, errors, reset} = useForm({
        taskListTitle: '',
    });

    //タスクリスト名設定用モーダルを表示する
    const openTaskModal = ()=> {
        setShowTaskModalFlag(true);
    };

    //タスクリスト名設定用モーダルを閉じる
    const closeModal = () => {
        reset('taskListTitle');  //taskListTitleに格納された文字列をリセット
        setShowTaskModalFlag(false);
    };

    //DBから情報を抽出するために、現在のユーザーID取得
    let userId = usePage().props.auth.user.id;

    //タスクリストの名前を格納した配列(useStateでうまくいかなかったので、pushで要素を増やす形にした)
    const taskList = [];

    //DBから、ユーザIDを条件にタスクリストの名前を取ってきて、フロント側で保存する
    const  getTaskList =  async () => {
        try {
            //axiosで、バックエンドのDBからレコードを持ってくる
            const {data} =  await axios.get(`/api/tasklist/${userId}`)
            //DBから取り出したレコードから、タスクリストの名前を配列に追加していく
            data.forEach((task) => {taskList.push(task.title)});
            props.setIsLoading(false);
        } catch (error){
            console.error('データを取り出せませんでした', error);
        } finally {
            props.setIsLoading(false);
        };
    };

    //作成されたタスクリストを表示する関数(作成中)
    /* const createTaskList = (listTitle, index) => {
        return (
            <div className='py-4' key={index}>{listTitle}</div>    
        )
    }; */

    //DBからデータを取ってくるのは初回レンダリング時と、モーダルウィンドウ開閉時
    useEffect(() => {
        getTaskList();
    },[]);

    //モーダルウィンドウ内のフォームに入力された文字列を、useFormのsetDataメソッドでtaskListTitleに格納
    const handleOnChange = (e) => {
        setData('taskListTitle', e.target.value);
    };

    //バックエンドに、新しく作成したタスクリストの名前を送信
    const submit = (e) => {
        e.preventDefault();
        post(route('tasklist.register'));  //DBへ登録
        closeModal();
    };


    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p className='py-4'>すべて</p>
                <p className='py-4'>今日</p>
                <p className='py-4'>次の7日間</p>
            </div>

            <div>
                <SecondaryButton 
                    className='mt-4 mb-8 border-solid border-2 border-blue-500'
                    onClick={()=>openTaskModal()}
                >
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>

            <Modal show={showTaskModalFlag} onClose={closeModal}>
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
    )
}