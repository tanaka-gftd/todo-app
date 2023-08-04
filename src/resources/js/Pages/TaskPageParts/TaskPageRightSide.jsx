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


    //タスクの期限の警告表示用
    //引数として、期限日の23:59:59を持つDateオブジェクトと、タスク完了済みかどうかの真偽値を受け取る
    const Deadline = ({date, isDone}) => {

        //今日の日付(JST)を取得し、UTCに修正
        let now = new Date();
        now.setHours(now.getHours() - 9);

        //期限までのミリ秒を求める
        let diff = date.getTime() - now.getTime();

        //期限終了は、期限日の23時59分59秒なので
        let count = (1000*60*60*23) + (1000*60*59) + (1000*59);

        //1日をミリ秒で換算
        let millisecondDay = 1000*60*60*24;

        //タスク完了済みの場合
        if(isDone){
            return (<p className="text-xl mt-2 text-green-500">このタスクは完了しています。</p>)
        };

        //期限が過ぎた、期限が今日、期限が明日、それ以外、の４パターンで表示する警告を切り替える
        //(switch構文ではレンダリング出来ない？ので、elseifで対応)
        if(diff < 0){
            return (<p className="text-xl mt-2 text-red-500">タスクの期限を過ぎています！!</p>)
        } else if(diff <= count){
            return (<p className="text-xl mt-2 text-red-500">タスクの期限は今日までです！</p>)
        } else if(diff <= count + millisecondDay) {
            return (<p className="text-xl mt-2 text-yellow-500">タスクの期限は明日までです！</p>)
        } else {
            return null;
        };
    };


    return (
        <>
            {!props.clickedTaskId ? 
                (<p className='text-xl'>成したタスクを選択すると、ここに詳細が表示されます</p>) 
                : 
                props.tasks.map((value, index) => {
                    //右エリアに表示するタスクは、中央エリアでクリックされたタスクのIDと一致しているものだけとする
                    //タスクIDは一意なので、表示されるタスクは一つだけになる(はず)
                    if(value.task_id === props.clickedTaskId){

                        /* 
                            以下３点の理由より、タスク期限の日時がズレる
                            •inputタグのdateで送信される日付は、UTC時間での日付。
                            •DBからのデータ取り出し時に、プロジェクトのタイムゾーンに自動で修正される。
                            •本プロジェクトのタイムゾーンはJST。

                            なので、タイムゾーンの違いによる時刻自動修正でずれた時刻を、再度修正する必要がある。
                            また、タスク期限は、inputタグのdateで送信した日が終わるまでにする。
                        */
                        let date = new Date(value.deadline);
                        date.setHours(date.getHours() - 9);
                        date.setHours(23);
                        date.setMinutes(59);
                        date.setSeconds(59);

                        return (
                            <div key={index}>
                                <div>
                                    <p className='text-4xl mt-4'>タスク詳細</p>
                                    <p className="text-2xl mt-12">タスク名</p>
                                    <p className="text-3xl mt-2">{value.task_name}</p>
                                    <p className="text-2xl mt-12">タスクのコメント</p>
                                    <p className="text-3xl mt-2">{value.comment}</p>
                                    <p className="text-2xl mt-12">タスクの期限</p>
                                    <p className="text-3xl mt-2">{date.toLocaleDateString()}</p>
                                    <Deadline date={date}  isDone={value.is_done}/>
                                    <p className="text-2xl mt-12">タスクの優先度</p>
                                    <PriorityColor num={value.priority}/>
                                </div>
                                <div className='flex justify-between px-10'>
                                    <form className='mt-20 my-10' onSubmit={submitDelete}>
                                        <DangerButton className="w-48" disabled={processing}>
                                            <span className='text-lg m-auto leading-10'>タスクを削除</span>
                                        </DangerButton>
                                    </form>
                                    <form className='mt-20 my-10' onSubmit={submitDone} hidden={value.is_done}>
                                        <PrimaryButton className="w-48" disabled={processing}>
                                            <span className='text-lg m-auto leading-10'>タスク完了</span>
                                        </PrimaryButton>
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