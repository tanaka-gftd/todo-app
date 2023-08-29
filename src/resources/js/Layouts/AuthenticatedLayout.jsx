import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';
import { usePage, useForm } from '@inertiajs/react';
import ButtonWithoutButtonTag from '@/Components/ButtonWithoutButtonTag';
import { useEffect, useState, createContext} from 'react';

//タスクの検索結果を渡すためのコンテキスト
export const SearchedTaskContext = createContext();

export default function Authenticated({ auth, header, children }) {
    const { url } = usePage();

    const dropDawnTextStyle = 'underline underline-offset-8 decoration-blue-400 text-xl text-blue-700 hover:text-gray-700 hover:decoration-gray-400'

    //タスク検索フォーム用
    const { data, setData, post, processing, reset } = useForm({
        taskSearch:'',
    });

    //タスク検索フォームに入力された内容を保持
    const handleOnChange = (e) => {
        setData('taskSearch', e.target.value);
    };

    /* 
        DBからタスクのデータを貰っているのはDashboardコンポーネント。
        Dashboardコンポーネントは本コンポーネントの子コンポーネントになるので、
        レンダリング時に、childrenプロパティを介してDashboardコンポーネントから、タスクのデータを貰う。
        また、Dashboardコンポーネントが保有しているタスクのデータが更新されたら、
        本コンポーネントが持つタスクのデータも更新する。

        かなり強引な手法と思われる。
        本来なら、useContextやreduxで、全てのコンポーネントでタスクのデータを共有するのが正しいやり方。
    */
    const [taskFromChildren, setTaskFromChildren] = useState([]);

    if(url === '/api/tasklist'){
        useEffect(()=>{
            if(children[2].props.tasks.length===0){
                console.log('タスクが登録されていません')
            } else {
                setTaskFromChildren(children[2].props.tasks);
            }
        },[children[2].props.tasks]);
    };

    //検索文字列がタスク名に含まれているタスクのデータを保存
    const [searchedTask, setSearchedTask] = useState([]);

    //入力された文字をもとに、タスク名を検索して保存
    const tmp = [];
    const taskSearch = () => taskFromChildren.map((value) => {
        if(data.taskSearch!=='' && value.task_name.includes(data.taskSearch)){
            tmp.push(value);
        };
        setSearchedTask([...tmp]);
    });

    //Enterキー(macならreturnキー)押下でも、検索出来るようにした
    const pressEnter = (e) => {
        if(e.key==='Enter'){
            taskSearch();
        };
    };

    
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-black">
                <div className="flex justify-between px-32 py-10 items-center">
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <span className="text-7xl text-white" style={{fontFamily:'Rammetto One'}}>My TODO</span>
                    </div>
                    <div 
                        className={
                            url === '/api/tasklist' ? 'bg-white flex relative rounded-lg w-1/4' : 'hidden'
                        }
                    >
                        <div 
                            className='z-10 absolute top-3 left-3 cursor-pointer' 
                            onClick={()=>taskSearch()}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="1.5em" 
                                viewBox="0 0 512 512"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </div>
                        <div className='w-full'>
                            <TextInput
                                placeholder="タスク名を検索"
                                className="rounded-lg border-none pl-12 text-2xl leading-8 w-full"
                                onChange={handleOnChange}
                                id="taskSearch"
                                type="text"
                                name="taskSearch"
                                onKeyPress={pressEnter}
                            />
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex rounded-md items-center">
                                        <button
                                            type="button"
                                            className="inline-flex items-center  border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-black hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 bg-black"
                                        >
                                            <span className="text-4xl text-white mr-5">{auth.user.name}さん</span>
                                        </button>
                                        <button type="button" className='bg-white rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 512 512">
                                                <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')} className={url === '/api/tasklist' ? dropDawnTextStyle : 'hidden'}>
                                        <p className='text-lg text-blue-700'>アカウント</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('tasklist.view')} className={url === '/profile' ? dropDawnTextStyle : 'hidden'}>
                                        <p className='text-lg text-blue-700'>ダッシュボード</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <ButtonWithoutButtonTag className='bg-red-600 w-full justify-center'>
                                            <p className='text-lg'>ログアウト</p>
                                        </ButtonWithoutButtonTag>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>
                <SearchedTaskContext.Provider value={searchedTask}>
                    {children}
                </SearchedTaskContext.Provider>
            </main>
        </div>
    );
}
