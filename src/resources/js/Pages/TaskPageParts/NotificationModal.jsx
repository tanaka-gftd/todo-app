import Modal from "@/Components/Modal";


//タスクの期限通知用モーダル
export default function NotificationModal(props) {

    //タスクの期限通知のために、タスクIDを保管する配列
    const over = [];  //期限過ぎ
    const justBefore = [];  //期限直前
    const soon = [];  //そろそろ期限

    //タスク期限チェック
    props.tasks.map((value) => {
        const deadline = new Date(value.deadline);  //期限日時のDateオブジェクト
        const now = new Date();  //現在のDateオブジェクト
        const diff = deadline.getTime() - now.getTime();  //現在から期限までのミリ秒を求める
        const millisecondDay = 1000*60*60*24;  //1日をミリ秒で換算
        
        if(!value.is_done){  //未完了のタスクのみチェック
            switch (true) {
                case diff < 0:  //期限過ぎ
                    over.push(value);
                break;
                case diff <= millisecondDay*1/2:  //期限まで残り12時間以下
                    justBefore.push(value)
                break;
                case diff <= millisecondDay:  //期限まで残り24時間以下
                    soon.push(value);
                break;
                default:
                break;
            };
        };
    });

    //期限が過ぎたタスクや期限が迫っているタスクがないなら、通知モーダルを表示しないようにする
    if((over.length === 0)&&(justBefore.length === 0)&&(soon.length === 0)){
        props.setShowNotificationModalFlag(false);
    };

    //タスク期限通知用モーダルを閉じる
    const closeModal = () => {
        props.setShowNotificationModalFlag(false);
    };

    return (
        <Modal show={props.showNotificationModalFlag} addStyle={'h-3/6'} onClose={closeModal}>
            <div className='mx-20 my-10'>
                <button 
                    type="button"
                    onClick={()=>closeModal()} 
                    className="cursor-pointer absolute top-5 right-5 text-4xl outline-none"
                >
                    ×
                </button>
                <div className="text-2xl">
                    <p className="mb-8 text-2xl">タスクの期限についての通知があります</p>
                    <div style={{display: over.length === 0 ? 'none' : ''}}>
                        <p className='mt-4'>期限を過ぎたタスク</p>
                        <ul className='border-b-2 border-neutral-400'>
                            {over.map((value, index)=>{
                                return (
                                    <li key={index} className='mt-2'>
                                        <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                        <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                        <p className="text-xl ml-10">期限：{value.deadline} </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div style={{display: justBefore.length === 0 ? 'none' : ''}}>
                        <p className='mt-4'>期限直前のタスク（期限まで12時間以下）</p>
                        <ul className='border-b-2 border-neutral-400'>
                            {justBefore.map((value, index)=>{
                                return (
                                    <li key={index} className='mt-2'>
                                        <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                        <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                        <p className="text-xl ml-10">期限：{value.deadline} </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div style={{display: soon.length === 0 ? 'none' : ''}}>
                        <p className='mt-4'>そろそろ期限のタスク（期限まで24時間以下）</p>
                        <ul className='border-b-2 border-neutral-400'>
                            {soon.map((value, index)=>{
                                return (
                                    <li key={index} className='mt-2'>
                                        <p className="text-xl ml-4">リスト名：{value.task_list_title}</p>
                                        <p className="text-xl ml-10">タスク名：{value.task_name} </p>
                                        <p className="text-xl ml-10">期限：{value.deadline} </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Modal>
    )
}