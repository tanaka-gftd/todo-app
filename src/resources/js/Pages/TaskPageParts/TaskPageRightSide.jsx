import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';


export default function TaskPageRightSide(props) {

    //タスク完了、タスク削除用
    const { data, post, put, processing } = useForm({
        taskId: props.clickedTaskId,  //選択されたタスクのID
    });

    //タスクを完了
    const submitDone = (e) => {
        e.preventDefault();
        //taskのIDをURLパラメータとして送信
        put(route('task.done', data.taskId), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => props.setIsLoading(false)  //ダッシュボード画面に切り替え
        });
    };

    //タスクを削除
    const submitDelete = (e) => {
        e.preventDefault();
        //taskのIDをURLパラメータとして送信
        post(route('task.delete', data.taskId), {
            onStart: () =>props.setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => props.setIsLoading(false)  //ダッシュボード画面に切り替え
        });
    };


    //優先度表示用
    const PriorityColor = ({num}) => {
        if(num === 3){
            return (<p className='text-3xl text-green-500 mt-2'>優先度 低</p>)
        } else if(num === 2){
            return (<p className='text-3xl text-yellow-500 mt-2'>優先度 中</p>)
        } else if(num === 1){
            return (<p className='text-3xl text-red-500 mt-2'>優先度 高</p>)
        } else {
            return (<p className='text-3xl mt-2'>優先度 なし</p>)
        }
    };


    return (
        <>
            {!props.clickedTaskId ? 
                (<p className='text-xl'>作成したタスクを選択すると、ここに詳細が表示されます</p>) 
                : 
                props.tasks.map((value, index) => {
                    //右エリアに表示するタスクは、中央エリアでクリックされたタスクのIDと一致しているものだけとする
                    //タスクIDは一意なので、表示されるタスクは一つだけになる(はず)
                    if(value.task_id === props.clickedTaskId){

                        /* 
                            以下2点の理由より、タスク期限の日時がズレる
                                •inputタグのdateで送信できる日付はUTC。
                                •本プロジェクトのタイムゾーンはJST。

                            (例)
                            inputタグのdateで、2023年8月29日(UTC)を送信
                            ↓
                            DB側では送信された2023年8月29日を、2023-08-29で保管し、時刻部分は内部で午前0時00分00秒と保持。
                            ↓
                            DBからフロントにデータを持ってくる時は、プロジェクトのタイムゾーン(JST)に合わせて、自動で9時間足され、
                            2023年8月29日午前9時となる。
                            ↓
                            期限が過ぎたかどうかのチェックに問題が生じる

                            また、タスクの期限は、指定した期日が終わるまでにしたいので、ここも加工する必要がある。

                            これらの加工は、DBからの抽出時にコントローラ側で行う方法もあるが、
                            フロントでの加工の方が分かりやすいので、フロントで実施
                        */
                        let newDeadline = new Date(value.deadline);

                        //タイムゾーンの違いによる時刻自動修正でずれた時刻を、再修正
                        //タスク期限は、inputタグのdateで送信じた日が終わるまでにする。
                        newDeadline.setHours(newDeadline.getHours() - 9);
                        newDeadline.setHours(23);
                        newDeadline.setMinutes(59);
                        newDeadline.setSeconds(59);

                        return (
                            <div key={index}>
                                <div>
                                    <p className='text-4xl mt-4'>タスク詳細</p>
                                    <p className="text-2xl mt-12">タスク名</p>
                                    <p className="text-3xl mt-2">{value.task_name}</p>
                                    <p className="text-2xl mt-12">タスクのコメント</p>
                                    <p className="text-3xl mt-2">{value.comment}</p>
                                    <p className="text-2xl mt-12">タスクの期限</p>
                                    <p className="text-3xl mt-2">{newDeadline.toLocaleDateString()}</p>
                                    <p className="text-2xl mt-12">タスクの優先度</p>
                                    <PriorityColor num={value.priority}/>
                                </div>
                                <div className='flex justify-between px-10'>
                                    <form className='mt-20 my-10' onSubmit={submitDone}>
                                        <PrimaryButton className="w-48" disabled={processing}>
                                            <span className='text-lg m-auto leading-10'>タスク完了</span>
                                        </PrimaryButton>
                                    </form>
                                    <form className='mt-20 my-10' onSubmit={submitDelete}>
                                        <DangerButton className="w-48" disabled={processing}>
                                            <span className='text-lg m-auto leading-10'>タスクを削除</span>
                                        </DangerButton>
                                    </form>
                                </div>
                            </div>
                        );
                    }
                })
            }
        </>
    )
}