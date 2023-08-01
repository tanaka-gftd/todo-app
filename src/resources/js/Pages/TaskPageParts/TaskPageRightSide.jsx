export default function TaskPageRightSide(props) {

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
                        return (
                            <div key={index}>
                                <p className='text-4xl mt-4'>タスク詳細</p>
                                <p className="text-2xl mt-12">タスク名</p>
                                <p className="text-3xl mt-2">{value.task_name}</p>
                                <p className="text-2xl mt-12">タスクのコメント</p>
                                <p className="text-3xl mt-2">{value.comment}</p>
                                <p className="text-2xl mt-12">タスクの期限</p>
                                <p className="text-3xl mt-2">{value.deadline}</p>
                                <p className="text-2xl mt-12">タスクの優先度</p>
                                <PriorityColor num={value.priority}/>
                            </div>
                        );
                    }
                })
            }
        </>
    )
}