import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskPageLeftSide from './TaskPageParts/TaskPageLeftSide';
import TaskPageRightSide from './TaskPageParts/TaskPageRightSide';
import TaskPageCenter from './TaskPageParts/TaskPageCenter';
import { useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard(props) {

    //ローディング画面表示用
    const [isLoading, setIsLoading] = useState(false);

    //フロント側でタスクリストの名前を表示する用
    const [taskListFront, setTaskListFront] = useState([]);

    //DBから抽出したレコードの保持用
    /* 
        以下の理由により、console.logで見れるのは、更新前のデータになる。
            •useStateのset関数は非同期で処理されておりコードの上から順に更新が行われていない
            •React の仕様で state は次のレンダリングされるタイミングまで反映されない
        （参考）  https://zenn.dev/takuty/articles/c032310a6643ac 
        
        コンソールでの表示と異なり、実際にはデータは更新済みとなるはずなので、問題ない。
        （state変更の直後に、stateの値をもとに加工するのは控えた方がいいかもしれない）
    */
    const [record, setRecord] = useState([]);

    //クリックしたタスクリストの保管時用
    const [taskIdAndTitle, setTaskIdAndTitle] = useState();

     //クリックしたタスクリストのタスクID保管時用
    const [clickedTaskId, setClickedTaskId] = useState();

    //DBから情報を抽出するために、現在のユーザーID取得
    let userId = usePage().props.auth.user.id;

    //DBから、ユーザIDを条件にタスクリストの名前を取ってきて、フロント側で保存する
    const  getTaskList =  async () => {
        setIsLoading(true);
        try {
            //axiosで、バックエンドのDBからレコードを持ってくる(レスポンスが返るのをawaitで待つ)
            const response =  await axios.get(`/api/tasklist/${userId}`);

            //バックエンドからのレスポンスのうち、DBのレコード部分だけ取り出して保持
            const tmp = response.data.map((entry) => entry);
            setRecord([...tmp]);  //変数recordにDBから抽出したレコード(型は配列)をセット

            //DBから取り出したレコードから、[タスクリストのID, タスクリストの名前]を要素とする二重配列を作成する
            const taskListFromDB = response.data.map((entry) => {
                return  [entry.id, entry.title]
            });
            setTaskListFront([...taskListFromDB]);
        } catch (error){
            console.error('データを取り出せませんでした', error);
        } finally {
            setIsLoading(false);
        };
    };

    //初回レンダリング時にDBからデータを取ってくる
    useEffect(() => {
        getTaskList();
    },[]);

    //子コンポーネント内でタスクリストの名前をクリックした時に実行される関数
    //引数として、[タスクリストのID, タスクリストの名前] という配列を受け取り親コンポーネントで保存する
    //クリックされたタスクリストの文字を濃くするために、タスクリストのIDも保存しておく
    /* 
        クリックされたタスクリストのIDも取得しておく理由：
        子コンポーネント側で、タスクリストIDとクリックされたタスクリストIDを比較して文字を濃くするのだが、
        タスクリストの名前をクリックしていない時点では、taskIdAndTitle（[タスクリストのID, タスクリストの名前]という配列）は未定義のため、
        taskIdAndTitle[0]はエラーになってしまう。(未定義なのでインデックスでの値の取得ができない)
        clickedTaskId（タスクリストのIDのみ保存）なら、未定義の段階でもundefinedになるだけなので、
        一致しているかどうかの比較が可能になる。
    */
    const clickTaskList = (arr) => {
        setTaskIdAndTitle(arr);
        setClickedTaskId(arr[0]);
    };
    
    //バックエンドとのやり取り中はローディング画面を挿入するようにしたいので、一旦タスクページ全体を変数に格納
    const MainAria = () => {
        return (
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
            >
                <Head title="タスクページ" />
    
                <div className="py-12">
                    <div className="max-w-8xl mx-auto px-8 flex justify-between">
                        <div className="p-8 bg-white shadow w-4/12">
                            <TaskPageLeftSide 
                                taskListFront={taskListFront}
                                getTaskList={getTaskList}
                                clickTaskList={clickTaskList}
                                taskIdAndTitle={taskIdAndTitle}
                                clickedTaskId={clickedTaskId}
                            />
                        </div>
    
                        <div className="p-8 mx-8 bg-red-100 shadow w-4/12">
                            <TaskPageCenter
                                taskIdAndTitle={taskIdAndTitle}
                                taskListFront={taskListFront}
                            />
                        </div>
    
                        <div className="p-8 bg-white shadow w-4/12">
                            <TaskPageRightSide/>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    };

    //バックエンドとのやりとり中かどうかで、表示する画面を切り替える(ここで返されるのがDashBoardコンポーネント)
    return (
        <>
            {isLoading ? (<Loading/>):(<MainAria/>)} 
        </>
    );
}