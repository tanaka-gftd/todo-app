import SecondaryButton from "@/Components/SecondaryButton";

export default function TaskPageCenter(props) {

    const ClickedTaskList = () => {
        return (
            <div className="flex justify-between">
                <p className='text-4xl mt-4'>{props.taskIdAndTitle[1]}</p>
                <SecondaryButton className='mt-4 border-solid border-2 border-blue-500'>
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>タスクを追加</p>
                </SecondaryButton>
            </div>
        );
    };

    const UnsetTaskList = () => {
        return (
            <>
                {props.taskListFront.length === 0 ?
                    (<p className='text-2xl py-4'>タスクリストを作成してください</p>)
                    :(<p className='text-2xl py-4'>タスクリストを選択してください</p>)
                }
            </>
        );
    };


    return (
        <div>
            {props.taskIdAndTitle ? (<ClickedTaskList/>) : (<UnsetTaskList/>)}
        </div>
    );
}