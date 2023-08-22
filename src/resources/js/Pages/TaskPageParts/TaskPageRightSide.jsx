import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';


export default function TaskPageRightSide({tasks, clickedTaskId, setIsLoading}) {

    //タスク完了、タスク削除用
    const { data, post, put, processing } = useForm({
        taskId: clickedTaskId,  //選択されたタスクのID
    });

    //タスクを完了
    const submitDone = (e) => {
        e.preventDefault();
        //taskのIDをURLパラメータとして送信
        put(route('task.done', data.taskId), {
            onStart: () => setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => setIsLoading(false)  //ダッシュボード画面に切り替え
        });
    };

    //タスクを削除
    const submitDelete = (e) => {
        e.preventDefault();
        //taskのIDをURLパラメータとして送信
        post(route('task.delete', data.taskId), {
            onStart: () => setIsLoading(true),  //ローディング画面に切り替え
            onError: (errors) => {console.error(errors)},
            onFinish: () => setIsLoading(false)  //ダッシュボード画面に切り替え
        });
    };


    //優先度表示用
    const PriorityColor = ({num}) => {
        switch(num){
            case 3:
                return (<p className='text-3xl text-green-500 mt-2'>優先度 低</p>)
            case 2:
                return(<p className='text-3xl text-yellow-600 mt-2'>優先度 中</p>)
            case 1:
                return (<p className='text-3xl text-red-500 mt-2'>優先度 高</p>)
            default:
                return (<p className='text-3xl mt-2'>優先度 なし</p>)
        };
    };


    //タスクの期限の警告表示用
    //引数として、期限日時のDateオブジェクトと、タスク完了済みかどうかの真偽値を受け取る
    const Deadline = ({date, isDone}) => {

        //タスク完了済みの場合
        if(isDone){
            return (<p className="text-xl mt-2 text-green-500">このタスクは完了しています。</p>)
        };

        //現在の日時のDateオブジェクトを生成
        const now = new Date();

        //期限までのミリ秒を求める
        const diff = date.getTime() - now.getTime();

        //1日をミリ秒で換算
        const millisecondDay = 1000*60*60*24;

        //期限が過ぎた、期限まで12時間を切った、期限まで24時間を切った、それ以外、４パターンで表示する警告を切り替える
        /* 
            switch文やループにおける、break,return,continueの違い
                break...switch文やループからの脱出
                return...switch文やループを内包する関数からの脱出
                continue...ループを中断し、次の繰り返しからループを再開する(switch文では使用不可？)
        
            本関数コンポーネント(Deadlineコンポーネント)は、分岐条件をもとにJSXを返して終了なので、
            returnでJSXを返して終わらせる。
            (breakでは返り値を返せないので、今回の処理では使えない)
        */
        switch(true){
            case diff < 0:
                return (<p className="text-xl mt-2 text-red-500">タスクの期限を過ぎています！!</p>)
            case diff <= millisecondDay*1/2:
                return (<p className="text-xl mt-2 text-red-500">タスクの期限が迫っています！</p>)
            case diff <= millisecondDay:
                return (<p className="text-xl mt-2 text-yellow-600">そろそろタスクの期限です</p>)
            default:
                return
        };
    };


    //タスク詳細エリアのタグアイコン表示用コンポーネント
    //表示するタグ名を、子コンポーネントとして挟み込んでいる
    const TagIcon = ({children}) => {
        return(
            <div className='flex items-center'>
                <p className='mr-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                </p>
                <p className='text-2xl'>{children}</p>
            </div>
        )
    };


    return (
        <>
            {!clickedTaskId ? 
                (<p className='text-xl py-4'>作成したタスクを選択すると、ここに詳細が表示されます</p>) 
                : 
                tasks.map((value, index) => {
                    //右エリアに表示するタスクは、中央エリアでクリックされたタスクのIDと一致しているものだけとする
                    //タスクIDは一意なので、表示されるタスクは一つだけになる(はず)
                    if(value.task_id === clickedTaskId){

                        //期限の日時を持つDateオブジェクトを生成
                        const date = new Date(value.deadline);

                        return (
                            <div key={index}>
                                <div>
                                    <p className='text-4xl mt-4'>タスク詳細</p>
                                    <p className="text-2xl mt-12">タスク名</p>
                                    <p className="text-3xl mt-2">{value.task_name}</p>
                                    <p className="text-2xl mt-12">タスクのコメント</p>
                                    <p className="text-3xl mt-2">{value.comment}</p>
                                    <p className="text-2xl mt-12">タグ</p>
                                    <div className='mt-1'>
                                        {value.tag_1? 
                                            <TagIcon>{value.tag_1}</TagIcon>
                                            :
                                            <p className='text-2xl'>設定無し</p>
                                        }
                                    </div>
                                    <div className='mt-1'>
                                        {value.tag_2? <TagIcon>{value.tag_2}</TagIcon> : null}
                                    </div>
                                    <p className="text-2xl mt-12">タスクの期限</p>
                                    <p className="text-3xl mt-2">{date.toLocaleString()}</p>
                                    <Deadline date={date} isDone={value.is_done}/>
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